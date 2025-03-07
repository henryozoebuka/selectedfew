import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles';

const TransactionHistoryCard = ({ sender, receiver, amount, action }) => {
    const colors = useSelector((state) => state.colors);
    return (
        <Pressable onPress={action} style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, marginBottom: SIZES.ten }}>Sender: {sender}</Text>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, marginBottom: SIZES.ten }}>Receiver: {receiver}</Text>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, marginBottom: SIZES.ten }}>₦{amount}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default TransactionHistoryCard;