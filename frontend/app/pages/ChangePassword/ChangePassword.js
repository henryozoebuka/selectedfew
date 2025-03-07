import { Text, View, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';

const ChangePassword = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const textInput = useSelector((state) => state.textInput);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const route = useRoute();
    const { id } = route.params || {};
    if (!id) {
        dispatch(setFailure("Invalid user ID"));
        setTimeout(() => {
            dispatch(setFailure(""));
        }, 5000);
        return;
    }
    
    const [data, setData] = useState({
        id: id,
        password: '',
        confirmPassword: '',
    });

    //handle change
    const handleChange = (value, name) => {
        setData({ ...data, [name]: value });
    }

    //handle submit
    const handleSubmit = async () => {
        if (data.password !== data.confirmPassword) {
            dispatch(setFailure('Password mismatch. Please passwords must match to continue.'));
            setTimeout(() => {
                dispatch(setFailure(''));
            }, 5000);
            return;
        }

        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/change-password`, data);
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                setTimeout(() => {
                    dispatch(setSuccess(''));
                    navigation.navigate('login');
                }, 3000);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 500);
            }
            console.error(error)
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
                        <Text style={{ color: colors.textPrimary, alignSelf: 'center', marginBottom: SIZES.twenty, fontSize: FONT.twenty }}>Change Password</Text>
                        <TextInput style={textInput} placeholder='Enter new password' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'password') }} secureTextEntry />
                        <TextInput style={textInput} placeholder="Confirm new password" placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'confirmPassword') }} secureTextEntry />
                        <Button title={'Change Password'} action={() => { handleSubmit() }} />
                        <SecondButton title={'login'} action={() => { navigation.navigate('login'); }} />
                    </View>
                </View>
            </View>
            <Footer />
        </View>
    )
}

export default ChangePassword;