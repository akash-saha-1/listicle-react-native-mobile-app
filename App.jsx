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
import Signin from './src/screens/auth/Signin';

function App() {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  useEffect(()=>{
    GoogleSignin.configure({
      scopes: ['profile'],
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
      forceCodeForRefreshToken: true,
    });  
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <Splash /> */}
      {/* <SignUp /> */}
      <Signin />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default App;
