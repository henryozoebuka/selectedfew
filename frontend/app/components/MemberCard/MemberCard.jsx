import { Pressable, Text, Image, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles';

const MemberCard = ({image, memberName, role, imageAlt, action}) => {
    const colors = useSelector((state) => state.colors);
    return (
        <Pressable onPress={action} style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                <Image source={image} style={{ height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" alt={imageAlt} />
                <View style={{ flex: 1}}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{memberName}</Text>
                    <Text style={{ color: colors.textPrimary }}>{role}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default MemberCard;