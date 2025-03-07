import { Pressable, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles';

const NavButton = ({ title, action }) => {
    const colors = useSelector((state) => state.colors );

    return (
        <Pressable onPress={action} style={{backgroundColor: colors.textPrimary, padding: SIZES.ten, borderRadius: SIZES.five }}>
            <Text style={{color: colors.buttonColor, marginHorizontal: SIZES.five}}>{title}</Text>
        </Pressable>
    )
}

export default NavButton;