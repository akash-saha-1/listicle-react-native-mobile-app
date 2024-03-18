import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Splash from './src/screens/auth/Splash';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SignUp from './src/screens/auth/SignUp';
import Config from 'react-native-config';
import SignIn from './src/screens/auth/SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from './src/utils/COLORS';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/app/Home';
import Profile from './src/screens/app/Profile';
import Favorites from './src/screens/app/Favorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductDetails from './src/screens/app/ProductDetails';
import Settings from './src/screens/app/Settings';
import CreateListing from './src/screens/app/CreateListing';
import MyListings from './src/screens/app/MyListings';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  const isSignedIn = false;
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['profile'],
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      forceCodeForRefreshToken: true,
    });  
  }, [])

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: COLORS.white
    },
  };


  const ProfileStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="CreateListing" component={CreateListing} />
        <Stack.Screen name="MyListings" component={MyListings} />
      </Stack.Navigator>
    )
  }

  const Tabs = () => {
    return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
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
            borderTopColor: COLORS.lightGrey
          }
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Favorites" component={Favorites} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} />
      </Tab.Navigator>
    )
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={isDarkMode ? DarkTheme : MyTheme}>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          {isSignedIn ? (
            <>
              <Stack.Screen name="Tabs" component={Tabs} />
              <Stack.Screen name="ProductDetails" component={ProductDetails} />
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
});

export default App;
