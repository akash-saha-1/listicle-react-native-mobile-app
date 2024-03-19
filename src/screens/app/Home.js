import React, { useContext, useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { categories } from '../../data/categories';
import CategoryBox from '../../components/CategoryBox';
import { products } from '../../data/products';
import ProductHomeItem from '../../components/ProductHomeItem';
import { ServicesContext } from '../../../App';
//import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}) => {
    const {services, setServices} = useContext(ServicesContext);
    const [selectedCategory, setSelectedCategory] = useState();
    const [keyword, setKeyword] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(services);

    useEffect(()=> {
        let tempFilteredProducts = [];
        if(selectedCategory && !keyword) {
            tempFilteredProducts = services?.filter((product) => String(product.category) === String(selectedCategory));
        } else if(!selectedCategory && keyword) {
            tempFilteredProducts = services?.filter((product) => product.title?.toLowerCase()?.includes(keyword?.toLowerCase()));
        } else if(selectedCategory && keyword) {
            tempFilteredProducts = services?.filter((product) => String(product.category) === String(selectedCategory) && product.title?.toLowerCase()?.includes(keyword?.toLowerCase()));
        } else {
            tempFilteredProducts = services;
        }
        setFilteredProducts(tempFilteredProducts?.filter((product) => product?.image?.path && product?.title && product?.price));
    }, [selectedCategory, keyword, services]);

    //console.log('selectedCategory: ', selectedCategory);
    const renderCategoryItem = ({item, index}) => {
        //console.log('item -> ', item);
        return (
            <CategoryBox title={item?.title} image={item?.image} isFirst={index === 0} onPress={()=>setSelectedCategory(item?.id)} isSelected={item?.id === selectedCategory} />
        )
    }

    const renderProductItem = ({item, index}) => {
        const onProductPress = (product) => {
            navigation.navigate('ProductDetails', {product});
        }

        return (
            <ProductHomeItem onPress={() => onProductPress(item)} {...item} />
        )
    }

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Header keyword={keyword} setKeyword={setKeyword} showSearch={true} title={'Find All You Need'} />
            
            <FlatList showsHorizontalScrollIndicator={false} style={styles.list} horizontal data={categories} renderItem={renderCategoryItem} keyExtractor={(item, index) => String(index)} />
            {/* {console.log(`filteredProducts: `, filteredProducts)} */}
            <FlatList numColumns={2} style={styles.productList} data={filteredProducts} renderItem={renderProductItem} keyExtractor={(item, index) => String(index)} ListFooterComponent={<View style={{height: 200}} />} />
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    list: {
        paddingVertical: 24
    },
    productList: {
        paddingHorizontal: 8
    }
});

export default React.memo(Home)
