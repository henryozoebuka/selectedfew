import { Text, View, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setPaymentApproval } from '../../redux/slices/paymentApprovalSlice.js';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const AdminPaymentApproval = () => {
    const colors = useSelector((state) => state.colors);
    const textInput = useSelector((state) => state.textInput);
    const serverURL = useSelector((state) => state.serverURL);
    const user = useSelector((state) => state.user);
    const paymentApprovals = useSelector((state) => state.paymentApprovals);
    const paymentApproval = useSelector((state) => state.paymentApproval);
    const route = useRoute();
    const { id } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(paymentApproval.amount);

    useEffect(() => {
        
        if (paymentApprovals) {
    
            const individualPaymentApproval = paymentApprovals.find(item => item._id === id);
            
            
            if (individualPaymentApproval) {
                dispatch(setPaymentApproval(individualPaymentApproval));
            }
        }
    }, [paymentApprovals])
    
    const [data, setData] = useState({
        amount: paymentApproval?.amount || '',
        description: paymentApproval?.description || '',
        comment: '',
        senderId: paymentApproval?.sender?._id || '',
        paymentId: paymentApproval?._id || '',
        treasurerId: user?._id || ''
    })
    

    const [approveModal, setApproveModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);

    const toggleApproveModal = () => {
        setApproveModal(!approveModal);
    }

    const toggleRejectModal = () => {
        setRejectModal(!rejectModal);
    }

    //handle change
    const handleChange = (name, value) => {
        setData({ ...data, [name]: value })
        console.log(data)
    }

    // Approve payment
    const approvePayment = async () => {
        try {
            dispatch(setLoadingInfo('Approving payment.'));
            dispatch(setLoading(true));
            const response = await axios.patch(`${serverURL}/approve-payment`, data);
            console.log(paymentApproval.sender);
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                dispatch(setPaymentApproval({ ...paymentApproval, approved: true }));
                setApproveModal(false);
                setTimeout(() => {
                    navigation.navigate('admin-payment-approvals');
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

    // Reject payment
    const rejectPayment = async () => {
        try {
            dispatch(setLoadingInfo('Rejecting payment'));
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/reject-payment`, data)
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                navigation.navigate('admin-payment-approvals');
                setRejectModal(false);
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

    if (approveModal) {
        return <ConfirmationModal question={'Are you sure that you want to approve this payment?'} action={approvePayment} displayModal={approveModal} toggle={() => { toggleApproveModal(); }} />
    }

    if (rejectModal) {
        return <ConfirmationModal question={'Are you sure that you want to reject this payment?'} action={rejectPayment} displayModal={rejectModal} toggle={() => { toggleRejectModal(); }} />
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Manage Payment Approval'} />
            <View style={{ display: 'flex', maxWidth: 500, flexDirection: 'row', width: '90%', justifyContent: 'flex-end', marginTop: SIZES.twenty }}>
              
                {paymentApproval && paymentApproval.approved ?
                    <View style={{ flexDirection: 'row', columnGap: SIZES.ten }}>
                        <View style={{ backgroundColor: colors.lightGreen, borderRadius: SIZES.five, minWidth: SIZES.eighty, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Approved</Text>
                        </View>
                    </View> :
                    <View style={{ flexDirection: 'row', columnGap: SIZES.ten }}>
                        <Pressable style={{ backgroundColor: colors.lightGreen, color: colors.textPrimary, borderRadius: SIZES.five, minWidth: SIZES.eighty, justifyContent: 'center', alignItems: 'center' }} onPress={() => { toggleApproveModal(); }}>
                            <Text style={{ color: colors.textPrimary, fontWeight: 'bold' }}>Approve</Text>
                        </Pressable>
                        <Pressable style={{ backgroundColor: colors.lightRed, color: colors.textPrimary, borderRadius: SIZES.five, minWidth: SIZES.eighty, justifyContent: 'center', alignItems: 'center' }} onPress={() => { toggleRejectModal(); }}>
                            <Text style={{ color: colors.textPrimary, fontWeight: 'bold' }}>Reject</Text>
                        </Pressable>
                    </View>
                }
            </View>
            {
                !paymentApproval.approved && <View style={{ width: '90%', alignSelf: 'center', marginTop: SIZES.ten }}>
                    <TextInput style={textInput} placeholder='Enter your comment' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => handleChange('comment', value)} />
                </View>
            }

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <Entypo name="user" size={24} color={colors.textPrimary} />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Transaction Date:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(paymentApproval.createdAt).format('MMMM D, YYYY')}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Amount</Text>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{paymentApproval && formattedAmount}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>


                {/* Transaction ID */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Transaction ID</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{paymentApproval._id}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Sender</Text>
                <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{paymentApproval.sender?.firstname + " " + paymentApproval.sender?.lastname}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>


                {/* description */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Description</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{paymentApproval.description}</Text>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default AdminPaymentApproval;