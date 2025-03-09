import { Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaskedTextInput } from "react-native-mask-text";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';
import { setUser } from '../../redux/slices/userSlice.js';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';


const ClubAccountTransfer = () => {
    const serverURL = useSelector((state) => state.serverURL);
    const user = useSelector((state) => state.user);
    const colors = useSelector((state) => state.colors);
    const textInput = useSelector((state) => state.textInput);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [data, setData] = useState({
        initiatedBy: user._id || '',
        amount: '',
        description: '',
    });

    // Handle text input changes
    const handleChange = (value, name) => {
        setData(prevData => ({
            ...prevData,
            [name]: name === "amount" ? Number(value) : value, // Convert amount to a number
        }));
    };

    //handle submit
    const handleSubmit = async () => {
        if (!serverURL) {
            console.error('Server URL is missing');
            return;
        }

        try {
            dispatch(setLoadingInfo('Requesting transferred fund approval.'));
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/request-admin-transfer-fund-approval`, data);
            if (response && response.status === 201) {
                dispatch(setSuccess(response.data.message));
                setTimeout(() => {
                    dispatch(setSuccess(''));
                    navigation.navigate('user');
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
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: '100%' }} style={{ flex: 1, width: '100%', marginBottom: SIZES.fifty }}>

                <View style={{ marginBottom: SIZES.thirty, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <PageTitle name={'Club Transfer Request'} />
                </View>
                <View style={{ width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: SIZES.twentyFive, }}>

                        <MaskedTextInput
                            type="currency"
                            options={{
                                prefix: "₦ ",
                                decimalSeparator: ".",
                                groupSeparator: ",",
                                precision: 0, // No decimals
                            }}
                            value={data.amount}
                            onChangeText={(masked, raw) => {
                                setData(prevData => ({ ...prevData, amount: raw })); // Store raw number
                            }}
                            style={textInput}
                            keyboardType="numeric"
                            placeholder="Enter transfer amount"
                            placeholderTextColor={PLACEHOLDERCOLOR}
                        />
                        <TextInput multiline={true} numberOfLines={SIZES.fifty} style={[textInput, { textAlignVertical: 'top', height: SIZES.oneHundred, marginTop: SIZES.ten, marginBottom: SIZES.twenty }]} placeholder='Type description here...' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'description') }} />

                        <View style={{ marginBottom: SIZES.twentyFive }}>
                            <Button title={'Submit'} action={() => { handleSubmit() }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}

export default ClubAccountTransfer;