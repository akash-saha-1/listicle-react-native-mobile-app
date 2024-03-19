import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, Image, KeyboardAvoidingView, Linking, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { COLORS } from '../../utils/COLORS'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Input from '../../components/Input'
import { categories } from '../../data/categories'
import Button from '../../components/Button'
import { ServicesContext } from '../../../App'
import { addService } from '../../utils/BackendAPICalls'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateListing = ({navigation}) => {
  const {services, setServices} = useContext(ServicesContext);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues({});
    setImages([]);
  }, [navigation.isFocused]);


  const uploadNewImage = async () => {
    setLoading(true);
    const result = await launchImageLibrary();
    if(result?.assets?.length > 0) {
      setImages([...images, ...result?.assets]);
    }
    setLoading(false);
  }

  const onDeleteImage = (image) => {
    setImages(images?.filter(img => img?.fileName !== image?.fileName))
  }

  const onChangeText = (key, val) => {
    setValues({...values, [key]: val});
  }

  const onSubmit = async () => {
    setLoading(true);
    const img = images?.length > 0 ? images[0]: null;
    let data = {...values, category: values?.category?.id};
    if(img) {
      data['image'] = {uri: img?.uri, name: img?.fileName, type: img?.type};
    }
    console.log(`multipart form data before sending: `, data);

    const updatedServices = await addService(data);
    await AsyncStorage.setItem('currentPage', 'MyListings');
    setValues({});
    setServices(updatedServices);
    setLoading(false);

    navigation.navigate('MyListings');
  }

  return (
    <SafeAreaView>
      <Header showBack={true} onBackPress={()=> navigation.goBack()} title='Create a new listing' />
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text style={styles.sectionTitle}>Upload Photos</Text>
          <View style={styles.imageRow}>
            <TouchableOpacity disabled={loading} style={styles.uploadContainer} onPress={uploadNewImage}>
              <View style={styles.uploadCircle}>
                <Text style={styles.uploadPlus}>+</Text>
              </View>
            </TouchableOpacity>

            {images.map((image, index) => (
              <View style={styles.imageContainer} key={image?.fileName}>
                <Image style={styles.image} source={{uri: image?.uri}} />
                <Pressable onPress={() => onDeleteImage(image)} hitSlop={10}>
                  <Image style={styles.delete} source={require('./../../assets/cross.png')} />
                </Pressable>
              </View>
            ))}

            {loading && <ActivityIndicator />}
          </View>

          <Input placeholder='Listing Title' label='Title' value={values.title} onChangeText={(v) => onChangeText('title', v)} />
          <Input placeholder='Select the category' label='Category' value={values.category} onChangeText={(v) => onChangeText('category', v)} type='picker' options={categories} />
          <Input placeholder='Enter price in USD' label='Price' value={values.price} onChangeText={(v) => onChangeText('price', v)} keyboardType='numeric' />
          <Input placeholder='Tell us more...' label='Description' value={values.description} onChangeText={(v) => onChangeText('description', v)} multiline style={styles.textarea} />
        </KeyboardAvoidingView>

        {!loading && (<Button title={'Submit'} style={styles.button} onPress={onSubmit} />)}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 24,
  },
  sectionTitle: {
    marginBottom: 14,
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.blue
  },
  image: {
    width: 100,
    height: 100,
  },
  uploadContainer: {
    width: 100,
    height: 100,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderStyle: 'dotted',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  uploadCircle: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  uploadPlus: {
    color: COLORS.white,
    fontSize: 28,
    marginTop: -4,
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    paddingBottom: 16
  },
  imageContainer: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 8,
  },
  delete:{
    width: 24,
    height: 24,
    marginTop: -12,
    marginLeft: -16
  },
  textarea: {
    minHeight: 100,
    paddingTop: 10
  },
  button: {
    marginBottom: 150
  }
});

export default CreateListing
