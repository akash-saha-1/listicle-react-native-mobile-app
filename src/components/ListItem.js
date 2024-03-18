import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const ListItem = ({title, subtitle, onPress, style}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const onEyePress = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
            )}
        </View>
        
        <Image style={styles.arrow} source={require('./../assets/right-arrow.png')} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // this is for andoid only, for android this option will only work.
        backgroundColor: COLORS.white,
        marginVertical: 12,
        borderRadius: 5
    },
    title: {
        color: COLORS.blue,
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        color: COLORS.greyBorder,
        fontSize: 14,
        marginTop: 6,
    },
    arrow: {
        width: 12,
        height: 20
    }
});

export default React.memo(ListItem);
