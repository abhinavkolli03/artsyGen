import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import React from 'react'

const app = () => {
  return (
    <View style={styles.container}>
      <Text>ArtsyGen!</Text>
      <StatusBar style="auto"/>
      <Link href="/profile" style={{color: 'blue'}}>Go to Profile</Link>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
})