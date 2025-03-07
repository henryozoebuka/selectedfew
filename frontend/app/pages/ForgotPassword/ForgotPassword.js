import { Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import axios from 'axios';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';

const ForgotPassword = () => {
  const colors = useSelector((state) => state.colors);
  const serverURL = useSelector((state) => state.serverURL);
  const textInput = useSelector((state) => state.textInput);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: '',
    phoneNumber: '',
  });

  //handle change
  const handleChange = (value, name) => {
    setData({ ...data, [name]: value });
  }

  //handle submit
  const handleSubmit = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${serverURL}/forgot-password`, data);
      if (response && response.status === 200) {
        navigation.navigate('confirm-otp', { id: response.data.userId });
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        dispatch(setFailure(error.response.data.message));
        setTimeout(() => {
          dispatch(setFailure(''));
        }, 5000);
      }
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
        <View style={{ marginBottom: SIZES.thirty, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Entypo name="lock" size={SIZES.twentyFive} color={colors.textPrimary} />
          <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive }}>SELECTED FEW</Text>
        </View>
        <View style={{ display: 'flex', width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
          <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
            <Text style={{ color: colors.textPrimary, alignSelf: 'center', marginBottom: SIZES.twenty, fontSize: FONT.twenty }}>Forgot Password</Text>
            <TextInput style={textInput} placeholder='Enter your email' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'email') }} />
            <TextInput style={textInput} placeholder='Enter your Phone Number' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'phoneNumber') }} />
            <Button title={'Submit'} action={handleSubmit} />
            <SecondButton title={'Go back to Login'} action={() => { navigation.navigate('login'); }} />
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default ForgotPassword;