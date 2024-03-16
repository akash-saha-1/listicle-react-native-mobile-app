import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { COLORS } from '../utils/COLORS';

const GoogleLogin = ({}) => {
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo.userDetails => ', userInfo?.user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.error("error while googe login: ", error);
      }
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={handleGoogleLogin}>
        <Image style={styles.image} source={require('./../assets/google-icon.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.darkGrey,
        borderRadius: 14,
        padding: 16,
        width: '40%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 50
    },
    image: {
        width: 30,
        height: 30
    }
});

export default GoogleLogin;
