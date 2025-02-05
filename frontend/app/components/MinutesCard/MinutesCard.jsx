import { Pressable, Text, Image, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles';

const MinutesCard = ({title, body, image, imageAlt, action}) => {
    const colors = useSelector((state) => state.colors);
    return (
        <Pressable onPress={action} style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                <View style={{ flex: 1}}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, fontWeight: 'bold', marginBottom: SIZES.ten }}>{title.length > 25 ? title.slice(0, 25) + '...' : title}</Text>
                    <Text style={{ color: colors.textPrimary, flexWrap: 'wrap' }}>{body.length > 50 ? body.slice(0, 50) + '...' : body}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default MinutesCard;