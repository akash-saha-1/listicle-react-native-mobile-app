import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Input from '../../components/Input';
import CheckBox from '../../components/CheckBox';
import { COLORS } from '../../utils/COLORS';
import Button from '../../components/Button';
import Seperator from '../../components/Seperator';
import GoogleLogin from '../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = ({navigation}) => {
    const [checked, setChecked] = useState(false);

    const onSignIn = () => {
        navigation.navigate('SignIn');
    }

    const onBackPress = () => {
        navigation.goBack();
    }

  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
            <AuthHeader title='Sign Up' onBackPress={onBackPress} />

            <Input label={'Name'} placeholder={'John Doe'}/>
            <Input label={'E-mail'} placeholder={'example@gmail.com'}/>
            <Input isPassword label={'Password'} placeholder={'********'}/>

            <View style={styles.agreeRow}>
                <CheckBox checked={checked} onCheck={()=>setChecked(!checked)} />
                <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
            </View>

            <Button style={styles.button} title={'Sign Up'} />
            <Seperator text='Or sign up with' />

            <GoogleLogin />

            <Text style={styles.footerText}>
                Already have an account? 
                <Text onPress={onSignIn} style={styles.footerLink}> Sign In</Text>
            </Text>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 24,
    },
    agreeRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreeText: {
        color: COLORS.blue,
        marginHorizontal: 14
    },
    agreeTextBold: {
        fontWeight: 'bold'
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

export default SignUp
