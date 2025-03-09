import { Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SIZES, FONT } from '../../styles/styles.js';
import { setPayments } from '../../redux/slices/paymentsSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import PaymentCard from '../../components/PaymentCard/PaymentCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const AdminPayments = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const payments = useSelector((state) => state.payments);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected announcements
    const [selectedPayments, setSelectedPayments] = useState([]);
    const [modal, setModal] = useState(false);

    // Fetch announcements
    const fetchPayments = async () => {
        try {
            dispatch(setLoadingInfo('Fetching payments.'));
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/payments`);
            if (response && response.status === 200) {
                dispatch(setPayments(response.data))
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

    // Delete announcements
    const deletePayments = async () => {
        try {
            dispatch(setLoadingInfo('Deleting payment(s).'));
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-payments`, { data: { payments: selectedPayments } });
            if (response && response.status === 200) {
                setSelectedPayments([]);
                const currentPayments = payments.filter(prev => !selectedPayments.includes(prev._id));
                dispatch(setPayments(currentPayments));
                dispatch(setSuccess(response.data.message));
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
        fetchPayments();
    }, []);

    // Toggle selection
    const toggleSelection = (id) => {
        if (selectedPayments.includes(id)) {
            setSelectedPayments(selectedPayments.filter(item => item !== id));
        } else {
            setSelectedPayments([...selectedPayments, id]);
        }
    };

    // Toggle delete modal
    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    if (modal) {
        return <ConfirmationModal displayModal={() => { modal(); }} question={'Are you sure that you want to delete these payments?'} toggle={() => { toggleDeleteModal(); }} action={() => {deletePayments();}} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Manage Payments'} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', width: '90%', marginTop: SIZES.twenty}}>
                <SecondButton title={'Add Payment'} bold={'bold'} action={() => { navigation.navigate('add-payment'); }} />
                <Pressable disabled={selectedPayments.length ? false : true} onPress={() => { toggleDeleteModal(); }}>
                    <MaterialIcons name="delete" size={SIZES.thirty} color={selectedPayments.length ? colors.textPrimary : colors.lightBackgroundColor} />
                </Pressable>
            </View>



            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {payments && payments.length ? (
                        [...payments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((payment, index) => (
                            <View key={payment._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>

                                <Checkbox
                                    value={selectedPayments.includes(payment._id)}
                                    onValueChange={() => toggleSelection(payment._id)}
                                />
                                <PaymentCard title={payment.title} amount={payment.amount} createdAt={payment.createdAt}  createdBy={payment.createdBy?.firstname} dueDate={payment.dueDate} action={() => {navigation.navigate('admin-payment', {id: payment._id})}} />
                            </View>
                        ))
                    ) : (
                        <Text>Null</Text>
                    )}
                </View>
            </ScrollView>

            <Footer />
        </View>
    );
};

export default AdminPayments;