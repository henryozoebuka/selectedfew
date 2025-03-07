import { Text, View, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PLACEHOLDERCOLOR, SIZES, BUTTONTEXT, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';

const CreateUser = () => {
  const serverURL = useSelector((state) => state.serverURL);
  const colors = useSelector((state) => state.colors);
  const loading = useSelector((state) => state.loading);
  const textInput = useSelector((state) => state.textInput);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const [gender, setGender] = useState('');
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phoneNumber: '',
    gender: '',
  });

  // Handle text input changes
  const handleChange = (value, name) => {
    setData(prevData => ({ ...prevData, [name]: value.trim() }));
  };

  // Handle gender selection
  const handleGender = (value) => {
    setData(prevData => ({ ...prevData, gender: value }));
  };
  
  //handle submit
  const handleSubmit = async () => {
    if (!serverURL) {
      console.error('Server URL is missing');
      return;
    }
    
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${serverURL}/create-user`, data);
      if (response && response.status === 200) {
        dispatch(setSuccess(response.data.message));
        setTimeout(() => {
          dispatch(setSuccess(''));
        }, 3000);
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        dispatch(setFailure(error.response.data.message));
        setTimeout(() => {
          dispatch(setFailure(''));
        }, 5000);
      }
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
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
            <TextInput onChangeText={(value) => { handleChange(value, 'email'); }} style={textInput} keyboardType="email-address" placeholder='Enter your email' placeholderTextColor={PLACEHOLDERCOLOR} />
            <TextInput onChangeText={(value) => { handleChange(value, 'phoneNumber'); }} style={textInput} keyboardType="phone-pad" placeholder="Enter user phone number" placeholderTextColor={PLACEHOLDERCOLOR} />
            <View style={{ marginBottom: SIZES.fifteen }}>
              <Text style={{ color: colors.textSecondary, fontSize: FONT.twenty, marginBottom: 5 }}>Gender</Text>
              <Pressable onPress={() => { handleGender('male'); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: SIZES.one }}>
                  <View style={{ backgroundColor: data.gender === 'male' ? 'black' : '', height: 10, width: 10, borderRadius: 10 }} ></View>
                </View>
                <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen }}>Male</Text>
              </Pressable>
              <Pressable onPress={() => { handleGender('female'); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: SIZES.one }}>
                  <View style={{ backgroundColor: data.gender === 'female' ? 'black' : '', height: 10, width: 10, alignSelf: 'center', borderRadius: 10 }} ></View>
                </View>
                <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen }}>Female</Text>
              </Pressable>
            </View>
            <Button title={'Submit'} action={() => {handleSubmit()}} />
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