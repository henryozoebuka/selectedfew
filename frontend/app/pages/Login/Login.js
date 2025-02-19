import { Text, View, Pressable, TextInput } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo';
import { BUTTON, BUTTONTEXT, PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer/Footer.jsx';

const Login = () => {
  const colors = useSelector((state) => state.colors);
  const textInput = useSelector((state) => state.textInput);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
        <View style={{ marginBottom: SIZES.thirty, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Entypo name="lock" size={SIZES.twentyFive} color={colors.textPrimary} />
          <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive }}>SELECTED FEW</Text>
        </View>
        <View style={{ display: 'flex', width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
          <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
            <Text style={{ color: colors.textPrimary, alignSelf: 'center', marginBottom: SIZES.twenty, fontSize: FONT.twenty }}>Login</Text>
            <TextInput style={textInput} placeholder='Enter your email' placeholderTextColor={PLACEHOLDERCOLOR} />
            <TextInput style={textInput} placeholder="Enter your password" placeholderTextColor={PLACEHOLDERCOLOR} secureTextEntry />
            <Pressable style={BUTTON} >
              <Text style={BUTTONTEXT}>Log In</Text>
            </Pressable>
            <Pressable style={{ marginBottom: SIZES.thirty, width: 'auto' }} onPress={() => { navigation.navigate('create-user') }}>
              <Text style={{ color: colors.textPrimary }}>Forgot Password?</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default Login;