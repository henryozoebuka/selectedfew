import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setPayment } from '../../redux/slices/paymentSlice.js';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import Button from '../../components/Button/Button.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const Payment = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const userPayments = useSelector((state) => state.userPayments);
    const serverURL = useSelector((state) => state.serverURL);
    const payment = useSelector((state) => state.payment);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const [modal, setModal] = useState();

    //make payment
    const makePayment = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.patch(`${serverURL}/make-payment`, { paymentId: id, userId: user._id });
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                setTimeout(() => {
                    dispatch(setSuccess(''));
                    navigation.navigate('payments');
                }, 3000);
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

    const toggleModal = () => {
        setModal(!modal);
    }


    useEffect(() => {
        if (userPayments) {
            const individualPayment = userPayments.find(item => item._id === id);
            if (individualPayment) {
                dispatch(setPayment(individualPayment));
            }

        }
    }, [userPayments])

    if (modal) {
        return <ConfirmationModal displayModal={() => { modal(); }} question={'Are you sure you want to make this payment?'} toggle={() => { toggleModal(); }} action={() => { makePayment(); }} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Payment Details'} />
            <View style={{ display: 'flex', maxWidth: 500, flexDirection: 'row', width: '90%', justifyContent: 'flex-end', marginTop: SIZES.twenty }}>
                <View style={{ flexDirection: 'row', columnGap: SIZES.twenty }}></View>
            </View>
            <View style={{ flexDirection: 'row', columnGap: SIZES.twenty, width: '90%' }}>
                <Button title={'Make this payment'} action={() => { toggleModal(); }} />
            </View>
            <Text style={{ color: colors.textPrimary, fontSize: SIZES.thirty }}>₦{payment.amount}</Text>

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <Entypo name="user" size={24} color={colors.textPrimary} />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Posted by:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{payment.createdBy?.firstname + " " + payment.createdBy?.lastname}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>On:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(payment.createdAt).format('MMMM D, YYYY')}</Text>
                        </View>

                        {
                            payment && payment.updatedAt &&
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Last edited on:  </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(payment.updatedAt).format('MMMM D, YYYY')}</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{payment && payment.title}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary }}>{payment && payment.description}</Text>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Payment;