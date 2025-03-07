import { Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setViewTransactionHistory } from '../../redux/slices/viewTransactionHistorySlice.js';
import Entypo from '@expo/vector-icons/Entypo';

import moment from 'moment';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const AdminViewTransactionHistory = () => {
    const colors = useSelector((state) => state.colors);
    const adminTransactionHistory = useSelector((state) => state.adminTransactionHistory);
    const viewTransactionHistory = useSelector((state) => state.viewTransactionHistory);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(viewTransactionHistory.amount);

    useEffect(() => {
        if (adminTransactionHistory) {
            const individualTransactionHistory = adminTransactionHistory.find(item => item._id === id);
            if (individualTransactionHistory) {
                dispatch(setViewTransactionHistory(individualTransactionHistory));
            }
        }
    }, [adminTransactionHistory])

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Transaction Details'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <Entypo name="user" size={24} color={colors.textPrimary} />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Transaction Date:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(viewTransactionHistory.createdAt).format('MMMM D, YYYY')}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Amount</Text>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{viewTransactionHistory && formattedAmount}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>


                {/* Transaction ID */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Transaction ID</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{viewTransactionHistory._id}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Sender</Text>
                <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{viewTransactionHistory.sender?.firstname + " " + viewTransactionHistory.sender?.lastname}</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{viewTransactionHistory.sender?.accountNumber}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                {/* Receiver */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Receiver</Text>
                <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{viewTransactionHistory.receiver?.firstname + " " + viewTransactionHistory.receiver?.lastname}</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{viewTransactionHistory.receiver?.accountNumber}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.twenty }}></View>

                {/* description */}
                <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Description</Text>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{viewTransactionHistory.description}</Text>

            </ScrollView >
            <Footer />
        </View >
    )
}

export default AdminViewTransactionHistory;