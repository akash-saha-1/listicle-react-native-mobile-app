import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { products } from '../../data/products'
import FavoriteItem from '../../components/FavoriteItem'
import Header from '../../components/Header'

const MyListings = ({navigation}) => {
  const renderFavoriteItem = ({item, index}) => {
    const onProducPress = () => {
      navigation.navigate('ProductDetails', {product: item});
    }

    return (
      <FavoriteItem icon={require('./../../assets/delete.png')} iconStyle={styles.iconStyle} onPress={onProducPress} {...item} />
    )
  }

  return (
    <SafeAreaView>
        <View style={styles.container}>
          <Header title={'My Listings'} showBack={true} onBackPress={()=> navigation.goBack()} />

          <FlatList style={styles.productList} data={products} renderItem={renderFavoriteItem} keyExtractor={(item, index) => String(index)} ListFooterComponent={<View style={{height: 200}} />} />
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
  },
  iconStyle: {
    height: 20,
    width: 14,
  }
});

export default React.memo(MyListings)
