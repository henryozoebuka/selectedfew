import { Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import {setTransactionHistory} from '../../redux/slices/transactionHistorySlice.js'
import {setLoading} from '../../redux/slices/loadingSlice.js'
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation } from '@react-navigation/native';
import TransactionHistoryCard from '../../components/TransactionHistoryCard/TransactionHistoryCard.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const TransactionHistory = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const serverURL = useSelector((state) => state.serverURL);
    const transactionHistory = useSelector((state) => state.transactionHistory);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const fetchTransactionHistory = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/fetch-user-transaction-history`, {params: {id: user._id}});
            if (response && response.status === 200) {
                dispatch(setTransactionHistory(response.data));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }
            console.error(error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        fetchTransactionHistory();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Transaction History'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {
                        transactionHistory && transactionHistory.length ? [...transactionHistory].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item, index) => (
                            <TransactionHistoryCard key={item._id || index} sender={item.sender.firstname + " " + item.sender.lastname} receiver={item.receiver.firstname + " " + item.receiver.lastname} amount={item.amount} action={() => {navigation.navigate('view-transaction-history', {id: item._id})}}/>
                        )) : null
                    }
                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default TransactionHistory;