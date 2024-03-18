import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { COLORS } from '../utils/COLORS';

const EditableBox = ({label, value, onChangeText, style, editable=false}) => {

  return (
    <View style={[styles.container, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput editable={editable} value={value} onChangeText={onChangeText} style={styles.input} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    label: {
        color: COLORS.greyBorder,
        fontSize: 14,
        marginBottom: 6,
    },
    input: {
        color: COLORS.blue,
        fontSize: 14,
        fontWeight: 500
    }
});

export default React.memo(EditableBox);
