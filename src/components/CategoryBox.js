import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const CategoryBox = ({title, image, onPress, isFirst, isSelected}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, isFirst ? {marginLeft: 16}: {}]}>
        <View style={[styles.imageContainer, isSelected ? {backgroundColor: COLORS.black} : {}]}>
            <Image style={styles.image} source={{uri: image}} />
        </View>
        <Text style={[styles.title, isSelected ? {color: COLORS.blue, fontWeight: '500'} : {}]}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        backgroundColor: COLORS.lightGrey,
        padding: 8, 
        borderRadius: 8,
        marginBottom: 8
    },
    image: {
        width: 24,
        height: 24
    },
    title: {
        color: COLORS.grey
    }
});

export default React.memo(CategoryBox);
