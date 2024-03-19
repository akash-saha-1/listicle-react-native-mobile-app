import React, { useContext } from 'react'
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { products } from '../../data/products'
import FavoriteItem from '../../components/FavoriteItem'
import Header from '../../components/Header'
import { ServicesContext } from '../../../App'
import { updateService } from '../../utils/BackendAPICalls'

const Favorites = ({navigation}) => {
  const {services, setServices} = useContext(ServicesContext);
  const likedServices = services?.filter(ser => ser.liked);

  const renderFavoriteItem = ({item, index}) => {
    const onProducPress = () => {
      navigation.navigate('ProductDetails', {product: item});
    }

    const onRemove = async () => {
      const updatedService = await updateService(item?._id, {liked: false});
      setServices(updatedService);
    }

    const onIconPress = () => {
      Alert.alert('Are you sure you want to remove this item from your favorites?', '', [{text: 'Yes', onPress: onRemove}, {text: 'Cancel'}]);
    }

    return (
      <FavoriteItem onPress={onProducPress} {...item} onIconPress={onIconPress} />
    )
  }

  return (
    <SafeAreaView>
        <View style={styles.container}>
          <Header title={'Favorites'} />
          <FlatList ListEmptyComponent={(<Text style={{textAlign: 'center', marginTop: 30}}>You do not have any favorites yet</Text>)} style={styles.productList} data={likedServices} renderItem={renderFavoriteItem} keyExtractor={(item, index) => String(item?._id)} ListFooterComponent={<View style={{height: 200}} />} />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 8,
  },
  productList: {
    marginTop: 20
  }
});

export default React.memo(Favorites)
