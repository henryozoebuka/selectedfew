import { Pressable, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles';

const Button = ({ title, action }) => {
    const button = useSelector((state) => state.button );
    const colors = useSelector((state) => state.colors );

    return (
        <Pressable onPress={action} style={button}>
            <Text style={{color: colors.buttonColor, marginHorizontal: SIZES.five}}>{title}</Text>
        </Pressable>
    )
}

export default Button;