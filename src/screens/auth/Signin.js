import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Input from '../../components/Input';
import { COLORS } from '../../utils/COLORS';
import Button from '../../components/Button';
import Seperator from '../../components/Seperator';
import GoogleLogin from '../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = ({navigation}) => {

    const onSignUp = () => {
        navigation.navigate('SignUp');
    }

    const onBackPress = () => {
        navigation.goBack();
    }

  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
            <AuthHeader title='Sign In' onBackPress={onBackPress} />

            <Input label={'E-mail'} placeholder={'example@gmail.com'}/>
            <Input isPassword label={'Password'} placeholder={'********'}/>

            <Button style={styles.button} title={'Sign In'} />
            <Seperator text='Or sign in with' />

            <GoogleLogin />

            <Text style={styles.footerText}>
                Don't have an account? 
                <Text onPress={onSignUp} style={styles.footerLink}> Sign Up</Text>
            </Text>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
    },
    button: {
        marginVertical: 20,
    },
    footerText: {
        color: COLORS.blue,
        marginBottom: 50,
        textAlign: 'center'
    }, 
    footerLink: {
        fontWeight: 'bold',
        paddingHorizontal: 20
    }
});

export default SignIn
