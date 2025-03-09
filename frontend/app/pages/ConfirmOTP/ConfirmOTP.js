import { ScrollView, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const ConfirmOTP = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef())); // Create refs for 6 inputs
    const otpValues = useRef(new Array(6).fill('')); // Store OTP values

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute()
    const {id} = route.params;
    const [data, setData] = useState({userId: id, otp: ''});

    useEffect(() => {
        // Focus the first input when the component mounts
        if (inputRefs.current[0]) {
            inputRefs.current[0].current.focus();
        }
    }, []);

    useEffect(() => {
        if (data.otp.length === 6) {
            handleSubmit();
        }
    }, [data.otp]);

    const handleTextChange = (text, index) => {
        otpValues.current[index] = text;
        
        if (text.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].current.focus();
        }
    
        const updatedOtp = otpValues.current.join('');
    
        if (otpValues.current.every(val => val !== '')) {
            setData(prev => ({ ...prev, otp: updatedOtp }));
        }
    };
    
    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && otpValues.current[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1].current.focus(); // Move to previous input
            }
        }
    };

    //handle submit
    const handleSubmit = async () => {
        try {
            dispatch(setLoadingInfo('Processing your OTP.'));
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/confirm-otp`, data);
            if (response && response.status === 200) {
                navigation.navigate('change-password', {id: response.data.userId});
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
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView>
                <Text style={{ color: colors.textPrimary, fontWeight: 'bold', fontSize: SIZES.twenty }}>Forgot Password</Text>
                <View style={{ flexDirection: 'row', columnGap: SIZES.five, alignSelf: 'center', marginVertical: SIZES.twenty }}>
                    {inputRefs.current.map((ref, index) => (
                        <TextInput
                            key={index}
                            ref={ref}
                            style={{
                                width: SIZES.fourty,
                                height: SIZES.fourty,
                                textAlign: 'center',
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                                lineHeight: SIZES.twenty,
                                fontWeight: 'bold',
                                fontSize: SIZES.twenty,
                                color: colors.forgotPasswordColor,
                                backgroundColor: colors.forgotPassword,
                                borderRadius: SIZES.five
                            }}
                            maxLength={1}
                            keyboardType="number-pad"
                            onChangeText={(text) => handleTextChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default ConfirmOTP;