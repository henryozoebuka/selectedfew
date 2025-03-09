import { Text, View, TextInput, ScrollView } from 'react-native';
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


const TransferFund = () => {
    const serverURL = useSelector((state) => state.serverURL);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const colors = useSelector((state) => state.colors);
    const textInput = useSelector((state) => state.textInput);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [receiver, setReceiver] = useState({ firstname: '', lastname: '' });
    const [data, setData] = useState({
        sender: user._id,
        accountNumber: '',
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
            dispatch(setLoadingInfo('Transferring fund.'));
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/transfer-fund`, data);
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                fetchAccountBalance();
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

    const fetchReceiver = async () => {
        try {
            dispatch(setLoadingInfo("Confirming receiver's account."));
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/fetch-receiver`, { accountNumber: data.accountNumber });
            if (response && response.status === 200) {
                setReceiver({ firstname: response.data.data.firstname, lastname: response.data.data.lastname });
            }

        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setReceiver({ firstname: '', lastname: '' })
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }

            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    //fetch user
    const fetchAccountBalance = async () => {
        try {
            const response = await axios.get(`${serverURL}/user`, { params: { id: user._id } });
            if (response && response.status === 200) {
                dispatch(setUser({ ...user, accountBalance: response.data }));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }
        }
    }

    useEffect(() => {
        if (data.accountNumber.length > 3) {
            const delay = setTimeout(() => {
                fetchReceiver();
            }, 1000);
            return () => clearTimeout(delay); // Cleanup function to reset the timer if the user types again
        }
    }, [data.accountNumber]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: '100%' }} style={{ flex: 1, width: '100%', marginBottom: SIZES.fifty }}>
            <View style={{ marginBottom: SIZES.thirty, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <PageTitle name={'Transfer Fund'} />
                </View>
                <View style={{ width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, }}>
                        <TextInput
                            onChangeText={(value) => handleChange(value, "accountNumber")}
                            style={textInput}
                            keyboardType="numeric" // Ensures only numbers are entered
                            placeholder="Enter beneficiary account number"
                            placeholderTextColor={PLACEHOLDERCOLOR}
                        />

                        {
                            data.accountNumber.length > 3 && receiver && <View style={{ flexDirection: 'row', columnGap: SIZES.five, marginBottom: SIZES.ten }}>
                                <Text style={{ color: colors.textPrimary, fontWeight: 'bold' }}>Transfer to:</Text>
                                <Text style={{ color: colors.textPrimary }}>{receiver.firstname + " " + receiver.lastname}</Text>
                            </View>
                        }

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
                        <TextInput multiline={true} numberOfLines={SIZES.fifty} style={[textInput, { textAlignVertical: 'top', height: SIZES.oneHundred, marginTop: SIZES.twenty }]} placeholder='Type description here...' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'description') }} />

                        <Button title={'Submit'} action={() => { handleSubmit() }} />
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}

export default TransferFund;