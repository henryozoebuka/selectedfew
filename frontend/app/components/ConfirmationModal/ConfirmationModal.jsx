import { Text, View } from 'react-native';
import React from 'react';
import Button from '.././Button/Button';
import { SIZES } from '../../styles/styles';
import { useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';

const ConfirmationModal = ({ action, displayModal, toggle, question }) => {
    const colors = useSelector((state) => state.colors);
    return (
        <View style={{ flex: 1, backgroundColor: colors.modalBackgroundColor, display: displayModal ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'center' }}>
            
            <View style={{ width: '90%', maxWidth: SIZES.threeHundred, alignSelf: 'center', display: 'flex', justifyContent: 'space-between',  padding: SIZES.ten, borderRadius: SIZES.ten, backgroundColor: colors.backgroundColor, minHeight: SIZES.oneHundredAndFifty }}>
            <AntDesign name="close" size={SIZES.twenty} color={colors.backgroundColor} style={{alignSelf: 'flex-end', backgroundColor: colors.textPrimary}} onPress={toggle} />
                <View>
                    <Text style={{color: colors.textPrimary}}>{question}</Text>
                </View>
                <Button action={action} title={'Yes'} />
            </View>
        </View>
    )
}

export default ConfirmationModal;