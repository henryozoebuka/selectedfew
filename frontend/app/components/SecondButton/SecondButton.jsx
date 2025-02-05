import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles';

const SecondButton = ({ title, action }) => {
    ;const colors = useSelector((state) => state.colors)
    return (
        <Pressable onPress={action} style={{marginBottom: SIZES.twenty}}>
            <Text style={{color: colors.textPrimary}}>{title}</Text>
        </Pressable>
    )
}

export default SecondButton;