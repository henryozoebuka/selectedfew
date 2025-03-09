import { Text, View, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';
import { setUser } from '../../redux/slices/userSlice.js';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsLoggedIn } from '../../redux/slices/isLoggedInSlice.js';


const Login = () => {
  const colors = useSelector((state) => state.colors);
  const serverURL = useSelector((state) => state.serverURL);
  const textInput = useSelector((state) => state.textInput);
  const user = useSelector((state) => state.user);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  //handle change
  const handleChange = (value, name) => {
    setData({ ...data, [name]: value.trim() });
  }

  //handle submit
  const handleSubmit = async () => {
    try {
      dispatch(setLoadingInfo('Logging in.'));
      dispatch(setLoading(true));
      const response = await axios.post(`${serverURL}/login`, data);
      if (response) {
        if (response.status === 202) {
          dispatch(setSuccess(response.data.message));
          setTimeout(() => {
            dispatch(setSuccess(''));
            navigation.navigate('change-password', { id: response.data.userId });
          }, 3000);
        }

        if (response.status === 200) {
          await AsyncStorage.setItem('@token', response.data.token);
          dispatch(setUser(response.data.user));
          dispatch(setSuccess(response.data.message));
          setTimeout(() => {
            dispatch(setSuccess(''));
            navigation.navigate('user');
            dispatch(setIsLoggedIn());
          }, 3000);
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        dispatch(setFailure(error.response.data.message));
        setTimeout(() => {
          dispatch(setFailure(''));
        }, 5000);
      }
      console.error(error)
    } finally {
      dispatch(setLoading(false));
    }
  }

//   useEffect(() => {
//     if (isLoggedIn || user.firstname) {
//         navigation.navigate('info');
//     }
// }, [isLoggedIn, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
        <View style={{ marginBottom: SIZES.thirty, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
          <Entypo name="lock" size={SIZES.twentyFive} color={colors.textPrimary} />
          <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive }}>SELECTED FEW CLUB</Text>
        </View>
        <View style={{ display: 'flex', width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
          <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
            <Text style={{ color: colors.textPrimary, alignSelf: 'center', marginBottom: SIZES.twenty, fontSize: FONT.twenty }}>Login</Text>
            <TextInput style={textInput} placeholder='Enter your email' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'email') }} />
            <TextInput style={textInput} placeholder="Enter your password" placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'password') }} secureTextEntry />
            <Button title={'Log In'} action={() => { handleSubmit(); }} />
            <View style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row' }}>
              <SecondButton title={'Forgot Password?'} action={() => { navigation.navigate('forgot-password'); }} />
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  )
}

export default Login;