import React, {useContext} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {products} from '../../data/products';
import FavoriteItem from '../../components/FavoriteItem';
import Header from '../../components/Header';
import {ProfileContext, ServicesContext} from '../../../App';
import {deleteService} from '../../utils/BackendAPICalls';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyListings = ({navigation}) => {
  const {services, setServices} = useContext(ServicesContext);
  const {profile} = useContext(ProfileContext);
  const myServices = services?.filter(
    service => service.owner === profile?._id,
  );

  const renderFavoriteItem = ({item, index}) => {
    const onProducPress = () => {
      navigation.navigate('ProductDetails', {product: item});
    };

    const deleteItem = async () => {
      const updatedService = await deleteService(item?._id);
      await AsyncStorage.setItem('currentPage', 'MyListings');
      setServices(updatedService);
    };

    return (
      <FavoriteItem
        icon={require('./../../assets/delete.png')}
        iconStyle={styles.iconStyle}
        onPress={onProducPress}
        {...item}
        onIconPress={deleteItem}
      />
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header
          title={'My Listings'}
          showBack={true}
          onBackPress={() => navigation.goBack()}
        />

        <FlatList
          style={styles.productList}
          data={myServices}
          renderItem={renderFavoriteItem}
          keyExtractor={(item, index) => String(item?._id)}
          ListFooterComponent={<View style={{height: 200}} />}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 30}}>
              You do not have any listing yet
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  productList: {
    marginTop: 20,
  },
  iconStyle: {
    height: 20,
    width: 14,
  },
});

export default React.memo(MyListings);
