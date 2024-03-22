import React, {createContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Splash from './src/screens/auth/Splash';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SignUp from './src/screens/auth/SignUp';
import Config from 'react-native-config';
import SignIn from './src/screens/auth/SignIn';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from './src/utils/COLORS';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './src/screens/app/Home';
import Profile from './src/screens/app/Profile';
import Favorites from './src/screens/app/Favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductDetails from './src/screens/app/ProductDetails';
import Settings from './src/screens/app/Settings';
import CreateListing from './src/screens/app/CreateListing';
import MyListings from './src/screens/app/MyListings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addTokenToAxios} from './src/utils/Request';
import {getProfile, getServices} from './src/utils/BackendAPICalls';
import notifee, {
  EventType,
  useNotification,
} from '@notifee/react-native';
import DeepLinking from 'react-native-deep-linking';
import NavigationService from './NavigationService';

export const UserContext = createContext({});
export const ProfileContext = createContext({});
export const ServicesContext = createContext([]);

function App() {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});
  const [services, setServices] = useState([]);
  const [deepLinkingUrl, setDeepLinkingUrl] = useState('');
  const [initialRoutes, setInitialRoutes] = useState(['Splash', 'ProfileStack', 'Settings']);
  //console.log(`user from app.js: `, user);

  //const navigation = useNavigation();

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const isSignedIn = false;
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    (async () => {
      let token = await AsyncStorage.getItem('auth_token');
      if (token?.length > 1) {
        setUser({token});
        setInitialRoutes(['Tabs', 'ProfileStack', '']);
      }
    })();
  }, []);

  async function checkInitialNotificationStatus() {
    //console.log(`1`);
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(`2`);
        // Do what you want here. I'm setting state so that my Home Screen knows where to navigate to.
    }
  }

  useEffect(() => {

    // Check to see if we got here via an InitialNotification
    checkInitialNotificationStatus();

    // Use this to listen to notification presses when the app is in the foreground.
    return notifee.onForegroundEvent(({ type, detail }) => {
      //console.log(`3`);
      if (type == EventType.ACTION_PRESS || type == EventType.PRESS) {
        console.log(`4`);
        console.log(`detail: `, detail);
        // navigation wont work HermesInternal. need to state global context state and use common function from every screen to go that component.
        // useNavigation().navigate('Signup');
              // You can navigate here or set state, asyncStorage, etc.
              // In iOS, this fires in addition to the initial notification so you'll want to setup something here to handle that. 
          }
      });
  });

  useEffect(() => {
    DeepLinking.addScheme('example://');
    const handleUrl = ({ url }) => {
      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          DeepLinking.evaluateUrl(url);
        }
      });
    };

    Linking.addEventListener('url', handleUrl);
 
    DeepLinking.addRoute('/test', (response) => {
      setDeepLinkingUrl('SignUp');
    });
 
    DeepLinking.addRoute('/test/:id', (response) => {
      setDeepLinkingUrl('Settings');
    });

    //If your app was launched from an external url registered to your app you can access and handle it from any component you want with
      var url = Linking.getInitialURL().then((url) => {
        if (url) {
          Linking.openURL(url);
        }
      }).catch(err => console.error('An error occurred', err));

    // example: <Button
    //   onPress={() => Linking.openURL('example://test')}
    //   title="Open example://test"
    // />
  }, []);

  useEffect(() => {
    const getProfileData = async () => {
      const data = await getProfile();
      //console.log(`data: `, data);
      setProfile(data);
    };

    const getUserServicesData = async () => {
      const data = await getServices();
      //console.log(`data: `, data);
      setServices(data);
    };

    if (user?.token) {
      addTokenToAxios(user?.token);
      getProfileData();
      getUserServicesData();
    }
  }, [user]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile'],
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.white,
    },
  };

  const ProfileStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={initialRoutes[2]}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CreateListing" component={CreateListing} />
        <Stack.Screen name="MyListings" component={MyListings} />
      </Stack.Navigator>
    );
  };

  const Tabs = () => {
    return (
      <Tab.Navigator
        initialRouteName={initialRoutes[1]}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopColor: COLORS.lightGrey,
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} />
      </Tab.Navigator>
    );
  };

  return (
    <SafeAreaProvider>
      <UserContext.Provider value={{user, setUser}}>
        <ProfileContext.Provider value={{profile, setProfile}}>
          <ServicesContext.Provider value={{services, setServices}}>
            <NavigationContainer theme={isDarkMode ? DarkTheme : MyTheme} ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}>
              <Stack.Navigator
                initialRouteName={initialRoutes[0]}
                screenOptions={{headerShown: false}}>
                {user?.token?.length > 1 ? (
                  <>
                    <Stack.Screen name="Tabs" component={Tabs} />
                    <Stack.Screen
                      name="ProductDetails"
                      component={ProductDetails}
                    />
                  </>
                ) : (
                  <>
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </ServicesContext.Provider>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
