import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
          <Text>Profile</Text>
      </ScrollView>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
  container: {
      padding: 24,
  },
});

export default React.memo(Profile)
