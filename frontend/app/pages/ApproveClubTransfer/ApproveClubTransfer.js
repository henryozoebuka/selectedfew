import { Text, View, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setClubTransfer } from '../../redux/slices/clubTransferSlice.js';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const ApproveClubTransfer = () => {
    const colors = useSelector((state) => state.colors);
    const textInput = useSelector((state) => state.textInput);
    const serverURL = useSelector((state) => state.serverURL);
    const user = useSelector((state) => state.user);
    const clubTransfer = useSelector((state) => state.clubTransfer);
    const clubTransfers = useSelector((state) => state.clubTransfers);


    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { id } = route.params;
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(clubTransfer.amount);

    const [data, setData] = useState({
        amount: clubTransfer?.amount,
        description: clubTransfer?.description || '',
        comment: '',
        initiatedBy: clubTransfer?.initiatedBy?._id || '',
        transactionId: clubTransfer?._id || '',
        approvedBy: user?._id || ''
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
    }

    // Approve club transfer
    const approveClubTransfer = async () => {
        try {
            dispatch(setLoadingInfo('Approving transfer'));
            dispatch(setLoading(true));
            const response = await axios.patch(`${serverURL}/approve-club-transfer`, data);
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                dispatch(setClubTransfer({ ...clubTransfer, approved: true }));
                setApproveModal(false);
                setTimeout(() => {
                    navigation.navigate('club-account-transfers');
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

    // Reject club transfer
    const rejectClubTransfer = async () => {
        try {
            dispatch(setLoadingInfo('Rejecting transfer'));
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/reject-club-transfer`, data);
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                navigation.navigate('club-account-transfers');
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


    useEffect(() => {
        if (clubTransfer && clubTransfer.initiatedBy) {
            setData((prevData) => ({
                ...prevData,
                approvedBy: user._id, // Now senderId is set safely
            }));
        }
    }, [clubTransfer]);

    useEffect(() => {
        if (clubTransfers) {
            const individualClubTransfer = clubTransfers.find(item => item._id === id);
            if (individualClubTransfer) {
                dispatch(setClubTransfer(individualClubTransfer));
            }
        }
    }, [clubTransfers])

    if (approveModal) {
        return <ConfirmationModal question={'Are you sure that you want to approve this tranfer?'} action={() => { approveClubTransfer() }} displayModal={approveModal} toggle={() => { toggleApproveModal(); }} />
    }

    if (rejectModal) {
        return <ConfirmationModal question={'Are you sure that you want to reject this transfer?'} action={() => { rejectClubTransfer() }} displayModal={rejectModal} toggle={() => { toggleRejectModal(); }} />
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {
                clubTransfer.approved ? <PageTitle name={'Club Transfer Details'} /> : <PageTitle name={'Manage Club Transfer'} />
            }
            <View style={{ display: 'flex', maxWidth: 500, flexDirection: 'row', width: '90%', justifyContent: 'flex-end', marginTop: SIZES.twenty }}>

                {clubTransfer && clubTransfer.approved ?
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
                !clubTransfer.approved && <View style={{ width: '90%', alignSelf: 'center', marginTop: SIZES.ten }}>
                    <TextInput style={textInput} placeholder='Enter your comment' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => handleChange('comment', value)} />
                </View>
            }

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                
                
                {/* details */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Amount</Text>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{clubTransfer && formattedAmount}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>


                {/* Transaction ID */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Transaction ID</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{clubTransfer._id}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Initiated By</Text>
                <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{clubTransfer.initiatedBy?.firstname + " " + clubTransfer.initiatedBy?.lastname}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Initiated On</Text>
                <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{moment(clubTransfer.createdAt).format('MMMM D, YYYY')}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                {/* description */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Description</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{clubTransfer.description}</Text>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default ApproveClubTransfer;