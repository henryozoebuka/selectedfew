import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles';

const AdminTransactionHistoryCard = ({ title, body, action }) => {
    const colors = useSelector((state) => state.colors);
    return (
        <Pressable onPress={action} style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, fontWeight: 'bold', marginBottom: SIZES.ten }}>{title.length > 35 ? title.slice(0, 35) + '...' : title}</Text>
                    <Text style={{ color: colors.textPrimary }}>
                        {body.length > 70 ? body.slice(0, 70) + '...' : body}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default AdminTransactionHistoryCard;