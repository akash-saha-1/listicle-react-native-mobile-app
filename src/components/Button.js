import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils/COLORS';

const Button = ({title, onPress, style, disabled = false}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      hitSlop={2}
      activeOpacity={0.6}
      style={[styles.container, disabled ? {opacity: 0.4} : {}, style]}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    width: '100%',
  },
  title: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default React.memo(Button);
