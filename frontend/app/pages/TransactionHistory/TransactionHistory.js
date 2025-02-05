import { Text, View, ScrollView } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation } from '@react-navigation/native';
import TransactionHistoryCard from '../../components/TransactionHistoryCard/TransactionHistoryCard.jsx';

const TransactionHistory = () => {
    const colors = useSelector((state) => state.colors);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.thirty }}>Transaction History</Text>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <TransactionHistoryCard title={'User transaction'} body={'The body of the transaction is this. The body of the transaction is this.'} />
                    <TransactionHistoryCard title={'User transaction'} body={'The body of the transaction is this. The body of the transaction is this.'} />
                    <TransactionHistoryCard title={'User transaction'} body={'The body of the transaction is this. The body of the transaction is this.'} />
                    <TransactionHistoryCard title={'User transaction'} body={'The body of the transaction is this. The body of the transaction is this.'} />
                    <TransactionHistoryCard title={'User transaction'} body={'The body of the transaction is this. The body of the transaction is this.'} />
                    <TransactionHistoryCard title={'User transaction'} body={'The body of the transaction is this. The body of the transaction is this.'} />
                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default TransactionHistory;