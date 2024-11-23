import { View, Text } from 'react-native'
import React from 'react'
import Login from '../components/Login'
import { Redirect } from 'expo-router'

export default function index() {
let user = true
    
  return (
    <View style={{ flex: 1 }}>
    {user ? <Redirect href={'/home'} /> : <Login />}
  </View>
  )
}