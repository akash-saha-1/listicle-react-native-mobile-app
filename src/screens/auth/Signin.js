import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AuthHeader from '../../components/AuthHeader';
import Input from '../../components/Input';
import {COLORS} from '../../utils/COLORS';
import Button from '../../components/Button';
import Seperator from '../../components/Seperator';
import GoogleLogin from '../../components/GoogleLogin';
import {SafeAreaView} from 'react-native-safe-area-context';
import {login} from '../../utils/BackendAPICalls';
import {UserContext} from '../../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const [values, setValues] = useState({
    email: 'realcricketgame20@gmail.com',
    password: '12345',
  });
  const [loading, setLoading] = useState(false);
  const {user, setUser} = useContext(UserContext);

  const onChangeText = (key, value) => {
    setValues({...values, [key]: value});
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!values?.email || !values?.password) {
        return Alert.alert('All fields are required!');
      }

      const token = await login(values);
      await AsyncStorage.setItem('auth_token', token);
      setUser({token});
    } catch (error) {
      console.error('error :>> ', error);
      Alert.alert(`${error}`);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <AuthHeader title="Sign In" onBackPress={onBackPress} />

        <Input
          value={values.email}
          onChangeText={val => onChangeText('email', val)}
          label={'E-mail'}
          placeholder={'example@gmail.com'}
        />
        <Input
          isPassword
          value={values.password}
          onChangeText={val => onChangeText('password', val)}
          label={'Password'}
          placeholder={'********'}
        />

        {!loading && (
          <Button style={styles.button} title={'Sign In'} onPress={onSubmit} />
        )}
        {loading && <ActivityIndicator />}

        <Seperator text="Or sign in with" />

        <GoogleLogin />

        <Text style={styles.footerText}>
          Don't have an account?
          <Text onPress={onSignUp} style={styles.footerLink}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

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
    textAlign: 'center',
  },
  footerLink: {
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
});

export default SignIn;
