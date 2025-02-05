import { Pressable, Text, View } from 'react-native';
import React, { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { setDarkMode, setLightMode } from '../../redux/slices/colorsSlice.js';
import { setTextInputLight, setTextInputDark } from '../../redux/slices/textInputSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkButton, setLightButton } from '../../redux/slices/buttonSlice.js';
import { setDarkButtonText, setLightButtonText } from '../../redux/slices/buttonTextSlice.js';
import { FONT, SIZES } from '../../styles/styles.js';

const Header = () => {
    const colors = useSelector((state) => state.colors);
    const dispatch = useDispatch();
    const menuItems = ['announcement', 'add-announcement', 'announcements', 'forgot-password', 'confirm-otp', 'event', 'add-event', 'events', 'minutes', 'add-minutes', 'minutes-archives', 'admin-transaction-history', 'transaction-history', 'user', 'admin-user', 'users', 'login', 'create-user', 'info',];
    const navigation = useNavigation();
    const [menu, setMenu] = useState(false);

    // light color mode
    const lightMode = () => {
        dispatch(setLightMode());
        dispatch(setTextInputLight());
        dispatch(setLightButton());
        dispatch(setLightButtonText());
    }

    //dark color mode
    const darkMode = () => {
        dispatch(setDarkMode());
        dispatch(setTextInputDark());
        dispatch(setDarkButton());
        dispatch(setDarkButtonText());
    }

    //display menu
    const showMenu = () => {
        setMenu(!menu);
    }

    return (
        <View style={{backgroundColor: colors.menuBackgroundColor}}>
            <View style={{ alignSelf: 'center', width: '90%', marginTop: SIZES.ten, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
               {menu ? <AntDesign name="close" size={SIZES.thirty} color={colors.menuIconColor} onPress={() => { showMenu(); }} /> : <Feather name="menu" size={SIZES.thirty} color={colors.menuIconColor} onPress={() => { showMenu(); }} />} 

            </View>
            {
                menu &&
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', top: SIZES.fourty, left: 0, right: 0, height: 800, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ display: 'flex', gap: 5, minWidth: SIZES.twoHundredAndFifty, backgroundColor: colors.menuBackgroundColor }}>
                        {
                            menuItems && menuItems.length ? menuItems.map((item, index) => (
                                <Pressable style={{marginHorizontal: SIZES.ten}} key={index} onPress={() => { navigation.navigate(item) }}>
                                    <Text style={{fontSize: FONT.twenty, color: colors.textPrimary}}>{item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
                                </Pressable>
                            )) : null
                        }
                        <View>
                            <Pressable onPress={() => { lightMode(); }} style={{ margin: 10, backgroundColor: '#000000' }}>
                                <Text style={{ marginVertical: 10, color: '#ffffff' }}>Light Mode</Text>
                            </Pressable>
                            <Pressable onPress={() => { darkMode(); }} style={{ margin: 10, backgroundColor: '#000000' }}>
                                <Text style={{ marginVertical: 10, color: '#ffffff' }}>Dark Mode</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            }
        </View>
    )
}

export default Header;