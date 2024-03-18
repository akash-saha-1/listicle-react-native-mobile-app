import React, { useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Input from '../../components/Input';
import CheckBox from '../../components/CheckBox';
import { COLORS } from '../../utils/COLORS';
import Button from '../../components/Button';
import Seperator from '../../components/Seperator';
import GoogleLogin from '../../components/GoogleLogin';
import { SafeAreaView } from 'react-native-safe-area-context';
import { request } from '../../utils/Request';

const SignUp = ({navigation}) => {
    const [checked, setChecked] = useState(false);
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);

    const onSignIn = () => {
        navigation.navigate('SignIn');
    }

    const onBackPress = () => {
        navigation.goBack();
    }

    const onChangeText = (key, value) => {
        setValues({...values, [key]: value});
    }

    const onSubmit = async () => {
        setLoading(true);
        try {
            if(!values?.fullName || !values?.email || !values?.password || !values?.confirmPassword) {
                return Alert.alert('All fields are required!');
            }
    
            if(values?.password !== values?.confirmPassword) {
                return Alert.alert('Password do not match! Please enter same password.');
            }
    
            const response = await request({
                url: '/user/register',
                method: 'post',
                data: values,
            });

            console.log('response :>> ', response);
            if(response?.status == 200) {
                Alert.alert(`You have successfully registered with email: ${values?.email}`);
            } else {
                Alert.alert(`Something went wrong while registration! Please try again later.`);
            }
        } catch (error) {
            console.error('error :>> ', error);
            Alert.alert(`${error}`);
        } 
        setLoading(false);
    }

  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
            <AuthHeader title='Sign Up' onBackPress={onBackPress} />

            <Input value={values.fullName} onChangeText={(val) => onChangeText('fullName', val)} label={'Name'} placeholder={'John Doe'}/>
            <Input value={values.email} onChangeText={(val) => onChangeText('email', val)} label={'E-mail'} placeholder={'example@gmail.com'}/>
            <Input isPassword value={values.password} onChangeText={(val) => onChangeText('password', val)} label={'Password'} placeholder={'********'}/>
            <Input isPassword value={values.confirmPassword} onChangeText={(val) => onChangeText('confirmPassword', val)} label={'Confirm Password'} placeholder={'********'}/>

            <View style={styles.agreeRow}>
                <CheckBox checked={checked} onCheck={()=>setChecked(!checked)} />
                <Text style={styles.agreeText}>I agree with <Text style={styles.agreeTextBold}>Terms</Text> & <Text style={styles.agreeTextBold}>Privacy</Text></Text>
            </View>

            {!loading && (<Button disabled={!checked} style={styles.button} title={'Sign Up'} onPress={onSubmit} />)}
            {loading && <ActivityIndicator />}
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
