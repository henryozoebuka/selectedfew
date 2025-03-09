import { Pressable, Text, Image, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles';
import Entypo from '@expo/vector-icons/Entypo';

const MemberCard = ({image, memberName, role, action}) => {
    const colors = useSelector((state) => state.colors);
    return (
        <Pressable onPress={action} style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten, borderWidth: SIZES.one, borderColor: colors.textPrimary }}>
            <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                {image ? <Image source={image} style={{ height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" /> : <View style={{height: SIZES.seventy, width: SIZES.seventy, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, justifyContent: 'center', alignItems: 'center'}}><Entypo name="user" size={SIZES.fifty} color={colors.textPrimary} /></View>}
                
                <View style={{ flex: 1, flexDirection: 'row', columnGap: SIZES.ten }}>
                    <View>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, width: '100%' }}>{memberName}</Text>
                    <Text style={{ color: colors.textPrimary, textTransform: 'capitalize' }}>{role}</Text>
                    </View>                    
                </View>
            </View>
        </Pressable>
    )
}

export default MemberCard;