import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyStacks from './MyStacks'
import { Provider } from 'react-redux'
import store from './redux/store.js'

const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <MyStacks />
      </View>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})