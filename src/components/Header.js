import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../utils/COLORS';
import Input from './Input';

const Header = ({title, onBackPress, keyword, setKeyword, onLogout, showLogout, showSearch, showBack}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {showBack ? (
          <Pressable onPress={onBackPress}>
              <Image style={styles.icon} source={require('./../assets/back.png')} />
          </Pressable>
        ) : showSearch ? (
          <Pressable onPress={()=>setShowSearchInput(!showSearchInput)}>
              <Image style={styles.icon} source={require('./../assets/search.png')} />
          </Pressable>
        ) : <View style={styles.space}/>}
          <Text style={styles.title}>{title}</Text>

          {showLogout ? (
            <Pressable onPress={onLogout}>
                <Image style={styles.icon} source={require('./../assets/logout.png')} />
            </Pressable>
          ) : <View style={styles.space}/>}
      </View>

      {showSearchInput && (<Input value={keyword} onChangeText={setKeyword} placeholder={'type your Keyword...'} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
  },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
      width: 24,
      height: 24
    },
    space: {
      width: 24,
      height: 24
    }
});

export default React.memo(Header);
