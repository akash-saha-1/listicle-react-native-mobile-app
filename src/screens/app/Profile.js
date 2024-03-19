import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '../../components/Header'
import { COLORS } from '../../utils/COLORS'
import ListItem from '../../components/ListItem'
import Button from '../../components/Button'
import { getProfile } from '../../utils/BackendAPICalls'
import { ProfileContext, ServicesContext } from '../../../App'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = ({navigation}) => {
  const {services, setServices} = useContext(ServicesContext);
  const {profile} = useContext(ProfileContext);
  const myServices = services?.filter((service) => service.owner === profile?._id);
  const [listNumber, setListNumber] = useState(myServices?.length);

  useEffect(() => {
    (async () => {
      const currentpage = await AsyncStorage.getItem('currentPage');
      //console.log(`currentpage: ${currentpage}`);
      if(currentpage) {
        await AsyncStorage.setItem('currentPage', '');
        navigation.navigate(currentpage);
      }
    })();
  }, []);

  const onLogout = () => {

  }

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Profile" showLogout={true} onLogout={onLogout} />
      <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.name}>{profile?.fullName}</Text>
            <Text style={styles.email}>{profile.email}</Text>

            <ListItem title='My Listings' subtitle={`You have ${listNumber} listings`} onPress={()=> navigation.navigate('MyListings')} />
            <ListItem title='Settings' subtitle={`Account, FAQ, Contact`} onPress={()=> navigation.navigate('Settings')} />
          </View>

          <Button style={styles.button} title="Add New Listing" onPress={()=> navigation.navigate('CreateListing')} />
      </View>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
  safe: {
    flex: 1
  },
  container: {
    padding: 24,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 12
  },
  email: {
    fontSize: 14,
    color: COLORS.textGrey,
    marginBottom: 16,
  },
  content: {
    flex: 1
  },
  button: {
    flex: 0
  }
});

export default React.memo(Profile)
