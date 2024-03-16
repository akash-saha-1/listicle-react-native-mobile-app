import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Input from '../../components/Input';
import { COLORS } from '../../utils/COLORS';
import Button from '../../components/Button';
import Seperator from '../../components/Seperator';
import GoogleLogin from '../../components/GoogleLogin';

const Signin = () => {

    const onSignUp = () => {
        
    }

  return (
    <ScrollView style={styles.container}>
        <AuthHeader title='Sign In' />

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

export default Signin
