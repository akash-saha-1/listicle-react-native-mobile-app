import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const Input = ({label, placeholder, isPassword}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const onEyePress = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
            <TextInput secureTextEntry={isPassword && !isPasswordVisible} placeholder={placeholder} style={styles.input}/>

            {isPassword && (
                <Pressable onPress={onEyePress}>
                    <Image style={styles.eye} source={isPasswordVisible ? require('./../assets/eye-close.png') : require('./../assets/eye-open.png')} />
                </Pressable>
            )}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 20
    },
    label: {
        marginBottom: 8,
        color: COLORS.blue,
        fontSize: 16,
        fontWeight: '500'
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: COLORS.greyBorder,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {       
        paddingHorizontal: 16,
        paddingVertical: 16,
        flex: 1
    },
    eye: {
        width: 24,
        height: 24,
        marginHorizontal: 16
    }
});

export default Input
