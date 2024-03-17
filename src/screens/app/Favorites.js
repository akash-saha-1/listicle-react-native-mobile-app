import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { products } from '../../data/products'
import FavoriteItem from '../../components/FavoriteItem'
import Header from '../../components/Header'

const Favorites = ({navigation}) => {
  const renderFavoriteItem = ({item, index}) => {
    const onProducPress = () => {
      navigation.navigate('ProductDetails', {product: item});
    }

    return (
      <FavoriteItem onPress={onProducPress} {...item} />
    )
  }

  return (
    <SafeAreaView>
        <View style={styles.container}>
          <Header title={'Favorites'} />
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
  }
});

export default React.memo(Favorites)
