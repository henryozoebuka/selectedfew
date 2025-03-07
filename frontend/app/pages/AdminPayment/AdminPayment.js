import { Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setPayment } from '../../redux/slices/paymentSlice.js';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import moment from 'moment';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const AdminPayment = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const serverURL = useSelector((state) => state.serverURL);
    const payment = useSelector((state) => state.payment);
    const payments = useSelector((state) => state.payments);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(payment.amount);

    const [modal, setModal] = useState(false);

    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    // Delete payment
    const deletePayment = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-payment/${payment._id}`)
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                navigation.navigate('admin-payments');
                setModal(false);
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
    useEffect(() => {
        if (payments) {
            const individualPayment = payments.find(item => item._id === id);
            if (individualPayment) {
                dispatch(setPayment(individualPayment));
            }
        }
    }, [payments])

    if (modal) {
        return <ConfirmationModal question={'Are you sure that you want to delete this payment?'} action={deletePayment} displayModal={modal} toggle={() => { toggleDeleteModal(); }} />
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Manage Payment'} />
            <View style={{ display: 'flex', maxWidth: 500, flexDirection: 'row', width: '90%', justifyContent: 'flex-end', marginTop: SIZES.twenty }}>
                {(user?.role === 'chairman' || user?.role === 'treasurer') &&
                    <View style={{ flexDirection: 'row', columnGap: SIZES.twenty }}>
                        <MaterialIcons name="delete" size={SIZES.twentyFive} color={colors.textPrimary} onPress={() => { toggleDeleteModal(); }} />
                    </View>
                }
            </View>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Created On:  </Text>
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
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Amount</Text>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{payment && formattedAmount}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>
        {/* Transaction ID */}
        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Transaction ID</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{payment._id}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Created By</Text>
                <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{payment.createdBy?.firstname + " " + payment.createdBy?.lastname}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                {/* description */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Description</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{payment.description}</Text>
        
            </ScrollView >
    <Footer />
        </View >
    )
}

export default AdminPayment;