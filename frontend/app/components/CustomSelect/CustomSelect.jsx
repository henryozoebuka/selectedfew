import { Pressable, ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FONT, SIZES } from '../../styles/styles';
import { useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';

const CustomSelect = ({visible, setVisible, value, setValue, options, toggleVisible, handleSelectChange}) => {

    const colors = useSelector((state) => state.colors)

    
    if (visible) {
        return (
            <View style={{  alignSelf: 'center', width: '100%', height: 'auto', justifyContent: 'center', alignItems: 'center', borderWidth: SIZES.two, borderColor: colors.textPrimary, borderRadius: SIZES.ten, backgroundColor: colors.backgroundColor, marginBottom: SIZES.ten }}>
                    <View style={{   
                     
                        // options.length === 1 ? '5%': 
                        // options.length === 1 ? '10%':
                        // options.length === 1 ? '15%' : 
                        // options.length === 2 ? '20%' : 
                        // options.length === 3 ? '25%' :
                        // options.length === 4 ? '30%' :
                        // options.length === 5 ? '35%' :
                        // options.length === 6 ? '40%' :
                        // options.length === 7 ? '45%' :
                        // options.length === 8 ? '50%' :
                        // options.length === 9 ? '55%' :
                        // options.length === 10 ? '60%' :
                        // options.length === 11 ? '65%': '70%',  
                        width: '90%' }}>
                    
                            {visible ?
                                options && options.length ? [...options].map((option, index) => (
                                    <Pressable key={option || index} onPress={() => { handleSelectChange(option); }}>
                                        <Text style={{ paddingVertical: SIZES.five, fontSize: FONT.twenty, textTransform: 'capitalize', color: colors.textPrimary }} >{option}</Text>
                                        <View style={{ borderBottomWidth: SIZES.one, borderColor: 'gray' }}></View>
                                    </Pressable>
                                )) : null
                                : null}
                        
                
                    </View>
            </View>
        )
    } else {
        return (
            <Pressable style={{ width: '100%', alignSelf: 'center', padding: 10, borderWidth: SIZES.two, borderColor: colors.textPrimary, borderRadius: SIZES.ten, marginBottom: SIZES.ten }} onPress={() => { toggleVisible(); }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: FONT.eighteen, textTransform: 'capitalize', color: colors.textPrimary }}>{value ? 'published' : 'unpublished'}</Text>
                    {console.log(value)}
                    {visible ? <AntDesign name="caretup" size={SIZES.fifteen} color={colors.backgroundColor} /> : <AntDesign name="caretdown" size={SIZES.fifteen} color={colors.textPrimary} />}
                </View>
            </Pressable>
        )
    }

}

export default CustomSelect;