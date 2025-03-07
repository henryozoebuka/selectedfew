import { Pressable, Text, Image, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles';
import moment from 'moment';
const PaymentCard = ({ title, paidStatus, createdBy, createdAt, dueDate, amount, action}) => {
    const colors = useSelector((state) => state.colors);
    return (
        <Pressable style={{ flex: 1, backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten, borderWidth: SIZES.one, borderColor: colors.textPrimary }} onPress={action}>
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten, marginBottom: SIZES.ten }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, fontWeight: 'bold'}}>{title.length > 25 ? title.slice(0, 25) + '...' : title}</Text>
                    <View style={{ flexDirection: 'row', columnGap: SIZES.five, alignItems: 'baseline' }}>
                        <Text style={{ fontWeight: 'bold', color: colors.textPrimary, fontSize: SIZES.twelve }}>Amount:</Text>
                        <Text style={{ color: colors.textPrimary }}>{amount}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', columnGap: SIZES.five, alignItems: 'baseline' }}>
                        <Text style={{ fontWeight: 'bold', color: colors.textPrimary, fontSize: SIZES.twelve }}>Transaction Date:</Text>
                        <Text style={{ color: colors.textPrimary }}>{moment(createdAt).format('MMMM D, YYYY')}</Text>
                    </View>
                    
                    {
                        paidStatus &&
                        <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                            <View style={{ minWidth: SIZES.seventy, paddingHorizontal: SIZES.five, backgroundColor: paidStatus === 'Paid' ? colors.lightGreen : colors.lightRed, borderRadius: SIZES.five }}>
                                <Text>{paidStatus}</Text>
                            </View>
                        </View>
                    }

                </View>
            </View>
        </Pressable>
    )
}

export default PaymentCard;