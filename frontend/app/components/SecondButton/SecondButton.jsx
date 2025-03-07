import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles';

const SecondButton = ({ title, bold, size, action }) => {
    ;const colors = useSelector((state) => state.colors)
    return (
        <Pressable onPress={action} style={{marginBottom: SIZES.twenty}}>
            <Text style={{color: colors.textPrimary, fontWeight: bold, fontSize: size}}>{title}</Text>
        </Pressable>
    )
}

export default SecondButton;