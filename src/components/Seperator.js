import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/COLORS';

const Seperator = ({text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.lightGrey,
    flex: 1,
  },
  text: {
    color: COLORS.blue,
    fontWeight: '500',
    marginHorizontal: 8,
  },
});

export default Seperator;
