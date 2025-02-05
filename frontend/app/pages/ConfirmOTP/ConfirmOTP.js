import { ScrollView, Text, TextInput, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles.js';

const ConfirmOTP = () => {
    const colors = useSelector((state) => state.colors);
    const inputRefs = useRef(Array(6).fill(null).map(() => React.createRef())); // Create refs for 6 inputs
    const otpValues = useRef(new Array(6).fill('')); // Store OTP values

    useEffect(() => {
        // Focus the first input when the component mounts
        if (inputRefs.current[0]) {
            inputRefs.current[0].current.focus();
        }
    }, []);

    const handleTextChange = (text, index) => {
        otpValues.current[index] = text; // Store value
        if (text.length === 1 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].current.focus(); // Move to next input
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === "Backspace" && otpValues.current[index] === '') {
            if (index > 0) {
                inputRefs.current[index - 1].current.focus(); // Move to previous input
            }
        }
    };

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