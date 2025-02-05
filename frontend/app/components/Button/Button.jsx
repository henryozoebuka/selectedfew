import { Pressable, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const Button = ({ title, action }) => {
    const button = useSelector((state) => state.button );
    const colors = useSelector((state) => state.colors );
    const buttonText = useSelector((state) => state.buttonText);

    return (
        <Pressable onPress={action} style={button}>
            <Text style={buttonText}>{title}</Text>
        </Pressable>
    )
}

export default Button;