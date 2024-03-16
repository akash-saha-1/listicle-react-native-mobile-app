import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const CheckBox = ({checked, onCheck}) => {

  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={onCheck}>
        {checked && (
            <View style={styles.innerContainer}>
                <Image style={styles.checkIcon} source={require('./../assets/tick-mark.png')} />
            </View>
        )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.greyBorder,
        borderWidth: 1,
        borderRadius: 4,
        width: 22,
        height: 22,
    },
    innerContainer: {
        backgroundColor: COLORS.greyBorder,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }, 
    checkIcon: {
        width: 12,
        height: 9
    }
});

export default React.memo(CheckBox);
