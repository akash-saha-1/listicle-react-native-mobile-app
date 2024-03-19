import React, {useContext, useState} from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/Header';
import ListItem from '../../components/ListItem';
import {COLORS} from '../../utils/COLORS';
import EditableBox from '../../components/EditableBox';
import Button from '../../components/Button';
import {ProfileContext} from '../../../App';
import {updateProfile} from '../../utils/BackendAPICalls';

const Settings = ({navigation}) => {
  const [editing, setEditing] = useState(false);
  const {profile, setProfile} = useContext(ProfileContext);
  const [values, setValues] = useState({
    _id: profile?._id,
    fullName: profile?.fullName,
    email: profile?.email,
  });

  const onItemPress = () => {
    Linking.openURL('https://reactnative.dev/docs/getting-started');
  };

  const onEditPress = () => {
    setEditing(!editing);
  };

  const onSave = async () => {
    const updatedProfile = await updateProfile(values);
    setProfile(updatedProfile);
    setEditing(false);
  };

  const onChange = (key, value) => {
    setValues(prevState => ({...prevState, [key]: value}));
  };

  return (
    <SafeAreaView>
      <Header
        showBack={true}
        onBackPress={() => navigation.goBack()}
        title="Settings"
      />
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Pressable onPress={onEditPress}>
            <Image
              style={styles.icon}
              source={require('./../../assets/edit-icon.png')}
            />
          </Pressable>
        </View>

        <EditableBox
          label="fullName"
          onChangeText={val => onChange('fullName', val)}
          value={values.fullName}
          editable={editing}
        />
        <EditableBox
          label="Email"
          onChangeText={val => onChange('email', val)}
          value={values.email}
          editable={editing}
        />
        {editing && (
          <Button style={styles.button} title="Save" onPress={onSave} />
        )}

        <Text style={[styles.sectionTitle, {marginTop: 40}]}>Help Center</Text>
        <ListItem style={styles.item} title="FAQ" onPress={onItemPress} />
        <ListItem
          style={styles.item}
          title="Contact Us"
          onPress={onItemPress}
        />
        <ListItem
          style={styles.item}
          title="Privacy & Terms"
          onPress={onItemPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.greyBorder,
  },
  item: {
    marginVertical: 8,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 24,
    height: 24,
  },
  button: {
    marginTop: 16,
    paddingVertical: 12,
  },
});

export default React.memo(Settings);
