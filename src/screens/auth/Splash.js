import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import { COLORS } from '../../utils/COLORS';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Image resizeMode='contain' style={styles.image} source={require('./../../assets/splash-image.png')} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>You'll Find  Here!</Text>
        <Text style={[styles.title, styles.innerTitle]}>All you need</Text>
        <Text style={styles.title}>Here!</Text>
      </View>

      <Button title='Sign Up' />
      <Pressable hitSlop={10}>
        <Text style={styles.footerText}>Sign In</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  image: {
    width: '100%',
    height: 200
  },
  titleContainer: {
    marginVertical: 54,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center'
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
    marginTop: 30
  }
})

export default Splash;
