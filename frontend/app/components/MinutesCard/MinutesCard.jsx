import { Pressable, Text, Image, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles';

const MinutesCard = ({ title, body, action, postDate }) => {
    const colors = useSelector((state) => state.colors);
    return (
        <Pressable onPress={action} style={{ flex: 1, backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten, borderWidth: SIZES.one, borderColor: colors.textPrimary }}>
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, fontWeight: 'bold' }}>{title.length > 25 ? title.slice(0, 25) + '...' : title}</Text>
                    <Text style={{ color: colors.textPrimary, flexWrap: 'wrap', width: '90%' }}>{body.length > 50 ? body.slice(0, 50) + '...' : body}</Text>
                    <View style={{ flexDirection: 'row', columnGap: SIZES.five, alignItems: 'baseline' }}>
                        <Text style={{ color: colors.textPrimary, fontWeight: 'bold', fontSize: SIZES.twelve }}>Posted On:</Text>
                        <Text style={{ color: colors.textPrimary }}>{postDate}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default MinutesCard;