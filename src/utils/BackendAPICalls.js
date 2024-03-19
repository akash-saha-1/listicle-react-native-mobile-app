import {Alert} from 'react-native';
import {request} from './Request';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signup = async values => {
  try {
    const response = await request({
      url: '/user/register',
      method: 'post',
      data: values,
    });

    if (response?.status === 200) {
      Alert.alert(
        `You have successfully registered with email: ${values?.email}`,
      );
      const {email, password} = values;
      let loginResponse = login({email, password});
      console.log(`loginResponse: ${loginResponse}`);
      return loginResponse;
    } else {
      Alert.alert(
        'Something went wrong while registration! Please try again later.',
      );
    }
  } catch (error) {
    console.error('error :>> ', error?.response);
    Alert.alert(`${error}`);
  }
};

export const login = async values => {
  try {
    const response = await request({
      url: '/user/login',
      method: 'post',
      data: values,
    });

    if (response?.data?.token) {
      await AsyncStorage.setItem('auth_token', response?.data?.token);
      return response?.data?.token;
    } else {
      Alert.alert('Something went wrong while login! Please try again later.');
    }
  } catch (error) {
    console.error('error :>> ', error?.response);
    Alert.alert(`${error}`);
  }
};

export const getProfile = async values => {
  try {
    const response = await request({
      url: '/user/profile',
      method: 'get',
    });

    if (response?.data) {
      //console.log(`response.data: `, response?.data);
      return response?.data;
    } else {
      Alert.alert(
        'Something went wrong while getProfile! Please try again later.',
      );
    }
  } catch (error) {
    console.error('error getProfile :>> ', error?.response);
    Alert.alert(`${error}`);
  }
};

export const updateProfile = async data => {
  try {
    const response = await request({
      url: '/user/profile',
      method: 'patch',
      data,
    });

    if (response) {
      const profile = await getProfile();
      return profile;
    } else {
      Alert.alert(
        'Something went wrong while updateProfile! Please try again later.',
      );
    }
  } catch (error) {
    console.error('error updateProfile :>> ', error?.response);
    Alert.alert(`${error}`);
  }
};

export const getServices = async values => {
  try {
    const response = await request({
      url: '/services',
      method: 'get',
    });

    if (response?.data) {
      //console.log(`response.data: `, response?.data);
      return response?.data;
    } else {
      Alert.alert(
        'Something went wrong while getServices! Please try again later.',
      );
    }
  } catch (error) {
    console.error('error getServices :>> ', error?.response);
    Alert.alert(`${error}`);
  }
};

export const updateService = async (id, data) => {
  try {
    const response = await request({
      url: '/services',
      method: 'patch',
      data: {
        servicesId: id,
        ...data,
      },
    });

    if (response?.data) {
      const services = await getServices();
      return services;
    } else {
      Alert.alert(
        'Something went wrong while updateService! Please try again later.',
      );
    }
  } catch (error) {
    console.error('error updateService :>> ', error?.response);
    Alert.alert(`${error}`);
  }
};

export const addService = async data => {
  try {
    const formData = new FormData();
    const objKeys = Object.keys(data);
    objKeys?.forEach(key => formData.append(key, data[key]));

    const response = await request({
      url: '/services',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    });

    if (response) {
      const services = await getServices();
      return services;
    } else {
      Alert.alert(
        'Something went wrong while addService! Please try again later.',
      );
    }
  } catch (error) {
    console.error('error addService :>> ', error);
    Alert.alert(`${error}`);
  }
};

export const deleteService = async id => {
  try {
    const response = await request({
      url: '/services',
      method: 'delete',
      data: {
        servicesId: id,
      },
    });

    if (response?.data) {
      const services = await getServices();
      return services;
    } else {
      Alert.alert(
        'Something went wrong while deleteService! Please try again later.',
      );
    }
  } catch (error) {
    console.error('error deleteService :>> ', error?.response);
    Alert.alert(`${error}`);
  }
};
