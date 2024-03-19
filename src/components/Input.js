import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS} from '../utils/COLORS';

const Input = ({
  label,
  type,
  placeholder,
  isPassword,
  value,
  onChangeText,
  style,
  options,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPickerModalVisible, setIsPickerModalVisible] = useState(false);
  const onEyePress = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {type === 'picker' ? (
        <Pressable
          style={styles.inputContainer}
          onPress={() => setIsPickerModalVisible(true)}>
          {value?.title ? (
            <Text style={[styles.input, style]}>{value?.title}</Text>
          ) : (
            <Text style={[styles.placeholder, style]}>{placeholder}</Text>
          )}

          <Image
            style={styles.arrow}
            source={require('./../assets/down-arrow.png')}
          />
        </Pressable>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={isPassword && !isPasswordVisible}
            placeholder={placeholder}
            style={[styles.input, style]}
            {...props}
          />

          {isPassword && (
            <Pressable onPress={onEyePress}>
              <Image
                style={styles.eye}
                source={
                  isPasswordVisible
                    ? require('./../assets/eye-close.png')
                    : require('./../assets/eye-open.png')
                }
              />
            </Pressable>
          )}
        </View>
      )}

      <Modal transparent visible={isPickerModalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsPickerModalVisible(false)}
          style={styles.modalWrapper}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.headerTitle}>Select Options</Text>

            {options?.map(opt => {
              if (opt?.id) {
                const selected = value?.id === opt?.id;
                return (
                  <Text
                    onPress={() => {
                      onChangeText(opt);
                      setIsPickerModalVisible(false);
                    }}
                    style={[
                      styles.optionsText,
                      selected ? styles.selectedOptions : {},
                    ]}
                    key={opt?.id}>
                    {opt?.title}
                  </Text>
                );
              }
            })}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
  },
  eye: {
    width: 24,
    height: 24,
    marginHorizontal: 16,
  },
  arrow: {
    width: 16,
    height: 12,
    marginHorizontal: 16,
  },
  placeholder: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flex: 1,
    color: COLORS.lightGrey,
  },
  modalWrapper: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalContent: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    padding: 16,
    width: '60%',
  },
  headerTitle: {
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.black,
  },
  optionsText: {
    color: COLORS.black,
    paddingVertical: 4,
    fontSize: 14,
  },
  selectedOptions: {
    color: COLORS.blue,
    fontWeight: 'bold',
  },
});

export default Input;
