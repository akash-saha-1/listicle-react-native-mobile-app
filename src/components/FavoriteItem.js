import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const FavoriteItem = ({title, price, image, onPress, icon, iconStyle}) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.imageContainer}>
            <Image style={styles.image} source={{uri: image}} />
        </View>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
        </View>

        <Image source={icon || require('./../assets/cross.png')} style={[styles.icon, iconStyle]} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 16,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLightGrey
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 20
    },
    title: {
        color: COLORS.textGrey
    },
    price: {
        color: COLORS.black,
        paddingBottom: 8
    },
    content: {
        flex: 1
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 8,
    }
});

export default React.memo(FavoriteItem);
