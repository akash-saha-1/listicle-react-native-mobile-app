import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/COLORS';

const AuthHeader = ({title, onBackPress}) => {
  return (
    <View style={styles.container}>
        <Pressable onPress={onBackPress}>
            <Image style={styles.image} source={require('./../assets/header-back.png')} />
        </Pressable>
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 52
    },
    image: {
        width: 18,
        height: 18
    },
    title: {
        color: COLORS.blue,
        fontSize: 26,
        fontWeight: '500',
        paddingHorizontal: 20,
    }
});

export default AuthHeader
