import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../utils/COLORS';
import Config from 'react-native-config';

const ProductHomeItem = ({title, price, image, onPress}) => {
  //console.log(`Config.API_BASE_URL: ${Config.API_BASE_URL}`);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        {image?.path && (
          <Image
            style={styles.image}
            source={{uri: `${Config.API_BASE_URL}/${image?.path}`}}
          />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>$ {price}</Text>
    </Pressable>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  image: {
    width: (width - 80) / 2,
    height: 200,
    borderRadius: 8,
    backgroundColor: COLORS.lightGrey,
  },
  title: {
    color: COLORS.textGrey,
  },
  price: {
    color: COLORS.black,
    paddingBottom: 8,
  },
});

export default React.memo(ProductHomeItem);
