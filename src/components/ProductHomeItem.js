import React from 'react'
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const ProductHomeItem = ({title, price, image, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: image}} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
    </Pressable>
  )
}

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    image: {
        width: (width - 80) / 2,
        height: 200,
        borderRadius: 8
    },
    title: {
        color: COLORS.textGrey
    },
    price: {
        color: COLORS.black,
        paddingBottom: 8
    }
});

export default React.memo(ProductHomeItem);
