import { Text, View, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useRoute } from '@react-navigation/native';
import { setUserPaymentApproval } from '../../redux/slices/userPaymentApprovalSlice.js';
import Entypo from '@expo/vector-icons/Entypo';
import moment from 'moment';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const PaymentApproval = () => {
    const colors = useSelector((state) => state.colors);
    const userPaymentApprovals = useSelector((state) => state.userPaymentApprovals);
    const userPaymentApproval = useSelector((state) => state.userPaymentApproval);
    const route = useRoute();
    const { id } = route.params;
    const dispatch = useDispatch();
    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(userPaymentApproval.amount);

    useEffect(() => {

        if (userPaymentApprovals) {

            const individualPaymentApproval = userPaymentApprovals.find(item => item._id === id);


            if (individualPaymentApproval) {
                dispatch(setUserPaymentApproval(individualPaymentApproval));
            }
        }
    }, [userPaymentApprovals])


    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Payment Approval Details'} />
            <View style={{ width: '90%', marginTop: SIZES.ten }}>
                {userPaymentApproval && userPaymentApproval.approved ?
                    <View style={{ flexDirection: 'row', columnGap: SIZES.ten, alignSelf: 'flex-end' }}>
                        <View style={{ backgroundColor: colors.lightGreen, borderRadius: SIZES.five, minWidth: SIZES.eighty, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Approved</Text>
                        </View>
                    </View> :
                    <View style={{ flexDirection: 'row', columnGap: SIZES.ten, alignSelf: 'flex-end' }}>
                        <View style={{ backgroundColor: colors.lightRed, borderRadius: SIZES.five, minWidth: SIZES.eighty, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>Not Yet Approved</Text>
                        </View>
                    </View>
                }
            </View>

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <Entypo name="user" size={24} color={colors.textPrimary} />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Transaction Date:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(userPaymentApproval.createdAt).format('MMMM D, YYYY')}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Amount</Text>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{userPaymentApproval && formattedAmount}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>


                {/* Transaction ID */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Transaction ID</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{userPaymentApproval._id}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Sender</Text>
                <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{userPaymentApproval.sender?.firstname + " " + userPaymentApproval.sender?.lastname}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>


                {/* description */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Description</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{userPaymentApproval.description}</Text>

            </ScrollView>
            <Footer />
        </View >
    )
}

export default PaymentApproval;