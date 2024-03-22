/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Button from '../../components/Button';
import {COLORS} from '../../utils/COLORS';
import {SafeAreaView} from 'react-native-safe-area-context';
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidStyle,
} from '@notifee/react-native';

const Splash = ({navigation}) => {
  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onSignIn = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    //Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        //smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        importance: AndroidImportance.HIGH,
        //color: '#E8210C', // red
        color: AndroidColor.RED,
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: 'https://sample-videos.com/img/Sample-png-image-1mb.png',
        },
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
        attachments: [
          {
            // Remote image
            url: 'https://sample-videos.com/img/Sample-png-image-1mb.png',
          },
        ],
      },
    });

    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('./../../assets/splash-image.png')}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>You'll Find Here!</Text>
          <Text style={[styles.title, styles.innerTitle]}>All you need</Text>
          <Text style={styles.title}>Here!</Text>
        </View>

        <Button title="Sign Up" onPress={onSignUp} />
        <Pressable hitSlop={10}>
          <Text style={styles.footerText} onPress={onSignIn}>
            Sign In
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    width: '100%',
    height: 200,
  },
  titleContainer: {
    marginVertical: 54,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  innerTitle: {
    color: COLORS.orange,
    textDecorationLine: 'underline',
  },
  footerText: {
    color: COLORS.blue,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default Splash;
