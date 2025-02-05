import { Text, View, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PLACEHOLDERCOLOR, SIZES, BUTTONTEXT, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer/Footer.jsx';

const CreateUser = () => {
  const colors = useSelector((state) => state.colors);
  const button = useSelector((state) => state.button);
  const textInput = useSelector((state) => state.textInput);
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });

  //set gender
  const handleGender = (value) => {
    setGender(value);
    setData((prevData) => ({ ...prevData, gender: value }));
    console.log(data)
  }

  //handle change
  const handleChange = (value, name) => {
    setData({ ...data, [name]: value });
    console.log(data)
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
        <View style={{ marginBottom: SIZES.thirty, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive }}>SELECTED FEW</Text>
        </View>
        <View style={{ display: 'flex', width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
          <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, }}>
            <Text style={{ color: colors.textPrimary, alignSelf: 'center', marginBottom: SIZES.twenty, fontSize: FONT.twenty }}>Create User</Text>
            <TextInput onChangeText={(value) => { handleChange(value, 'firstname'); }} style={textInput} placeholder='Enter user firstname' placeholderTextColor={PLACEHOLDERCOLOR} />
            <TextInput onChangeText={(value) => { handleChange(value, 'lastname'); }} style={textInput} placeholder='Enter user lastname' placeholderTextColor={PLACEHOLDERCOLOR} />
            <TextInput onChangeText={(value) => { handleChange(value, 'email'); }} style={textInput} placeholder='Enter your email' placeholderTextColor={PLACEHOLDERCOLOR} />
            <TextInput onChangeText={(value) => { handleChange(value, 'phoneNumber'); }} style={textInput} placeholder="Enter user phone number" placeholderTextColor={PLACEHOLDERCOLOR} />
            <View style={{ marginBottom: SIZES.fifteen }}>
              <Text style={{ color: colors.textSecondary, fontSize: FONT.twenty, marginBottom: 5 }}>Gender</Text>
              <Pressable onPress={() => { handleGender('male'); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: gender === 'male' ? 'black' : '', height: 10, width: 10, borderRadius: 10 }} ></View>
                </View>
                <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen }}>Male</Text>
              </Pressable>
              <Pressable onPress={() => { handleGender('female'); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ backgroundColor: gender === 'female' ? 'black' : '', height: 10, width: 10, alignSelf: 'center', borderRadius: 10 }} ></View>
                </View>
                <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen }}>Female</Text>
              </Pressable>
            </View>
            <Pressable style={button} >
              <Text style={BUTTONTEXT}>Submit</Text>
            </Pressable>
            <Pressable style={{ marginBottom: SIZES.thirty }} onPress={() => { navigation.navigate('login') }}>
              <Text style={{ color: colors.textPrimary }}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default CreateUser;