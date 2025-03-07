import { Pressable } from 'react-native';
import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import { setUserPayments } from '../../redux/slices/userPaymentsSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import PaymentCard from '../../components/PaymentCard/PaymentCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const Payments = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user)
    const serverURL = useSelector((state) => state.serverURL);
    const userPayments = useSelector((state) => state.userPayments);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Fetch announcements
    const fetchPayments = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/user-payments/${user._id}`);
            if (response && response.status === 200) {
                dispatch(setUserPayments(response.data));
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
    };

    useEffect(() => {
        fetchPayments();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Payments'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {userPayments && userPayments.length ? (
                        [...userPayments]
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                            .map((payment, index) => {
                                const userPayment = payment.users.find(u => u.userId && u.userId._id === user?._id);
                                const paidStatus = userPayment ? (userPayment.paid ? 'Paid' : 'Not Paid') : 'Not Paid';

                                return (
                                    <View key={payment._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                        <PaymentCard
                                            title={payment.title}
                                            paidStatus={paidStatus}
                                            amount={payment.amount}
                                            createdAt={payment.createdAt}
                                            createdBy={payment.createdBy}
                                            dueDate={payment.dueDate}
                                            action={() => { navigation.navigate('payment', { id: payment._id }) }}
                                        />
                                    </View>
                                );
                            })
                    ) : (
                        <Text>Null</Text>
                    )}
                </View>


            </ScrollView>

            <Footer />
        </View>
    );
};

export default Payments;