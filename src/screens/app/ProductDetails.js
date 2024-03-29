import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../utils/COLORS';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import Config from 'react-native-config';
import {updateService} from '../../utils/BackendAPICalls';
import {ServicesContext} from '../../../App';

const {width} = Dimensions.get('window');

const ProductDetails = ({navigation, route}) => {
  const productId = route?.params?.product?._id;
  const {services, setServices} = useContext(ServicesContext);
  const product = services?.find(service => service?._id === productId);

  const onBackPress = () => {
    navigation.goBack();
  };

  const onContact = () => {
    // make a phone call
    const phone = '8240447188';
    Linking.openURL(`tel:${phone}`);

    // send a email
    const email = 'a@b.com';
    Linking.openURL(`mailto:${email}`);
  };

  const onBookmark = async () => {
    const servicesData = await updateService(product?._id, {liked: true});
    setServices(servicesData);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {product?.images?.length > 1 ? (
          <ImageCarousel images={product?.images} />
        ) : (
          <Image
            style={styles.image}
            source={{uri: `${Config.API_BASE_URL}/${product?.image?.path}`}}
          />
        )}

        {/* Here If I place Pressable above main image in code lines, then it is going below of image and also elevation is not working, hence, need to put after image so that it comes top of main image */}
        <Pressable onPress={onBackPress} style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={require('./../../assets/back-icon.png')}
          />
        </Pressable>

        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>$ {product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={onBookmark} style={styles.bookmarkContainer}>
          <Image
            style={styles.bookmarkIcon}
            source={
              product?.liked
                ? require('./../../assets/bookmark-filled.png')
                : require('./../../assets/bookmark.png')
            }
          />
        </Pressable>
        <Button
          onPress={onContact}
          title={'Contact Seller'}
          style={{width: width * 0.675}}
        />
      </View>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    //padding: 16,
  },
  image: {
    width: '100%',
    height: height * 0.45,
    backgroundColor: COLORS.lightGrey,
  },
  content: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: -20,
    paddingHorizontal: 24,
  },
  title: {
    marginTop: 40,
    fontSize: 24,
    fontWeight: '500',
  },
  price: {
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    color: COLORS.textGrey,
    //fontWeight: '300',
    marginVertical: 8,
  },
  footer: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bookmarkContainer: {
    backgroundColor: COLORS.lightGrey,
    padding: 16,
    borderRadius: 8,
    marginRight: 20,
  },
  bookmarkIcon: {
    width: 16,
    height: 20,
  },
  backContainer: {
    backgroundColor: COLORS.white,
    padding: 14,
    margin: 16,
    borderRadius: 8,
    position: 'absolute',
  },
  backIcon: {
    width: 12,
    height: 24,
  },
});

export default ProductDetails;
