import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
          <Text>Settings</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 24,
  },
});

export default React.memo(Settings)
