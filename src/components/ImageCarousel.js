import React, { useState } from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const {width, height} = Dimensions.get('window');

const ImageCarousel = ({images, style}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderImage = ({item}) => {
    return (<Image style={styles.image} source={{uri: item}}/>);
  }

  const handleScrollEnd = (event) => {
    const horizontalOffset = event.nativeEvent.contentOffset.x;
    setActiveIndex(Math.round(horizontalOffset / width));
  }

  return (
    <View>
      <FlatList horizontal pagingEnabled style={styles.list} data={images} renderItem={renderImage} keyExtractor={(item, index) => String(index)} onMomentumScrollEnd={handleScrollEnd} />

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View key={index} style={[styles.paginationLine, index === activeIndex ? styles.activeLine: {}]} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
      width: width,
      height: height * 0.45,
    },
    list: {

    },
    pagination: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 40,
      alignSelf: 'center',
    },
    paginationLine: {
      height: 4,
      width: 20,
      borderRadius: 10,
      backgroundColor: COLORS.white,
      marginHorizontal: 1,
    },
    activeLine: {
      backgroundColor: COLORS.black,
      width: 30
    }
});

export default React.memo(ImageCarousel)
