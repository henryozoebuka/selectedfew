import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { setDarkMode, setLightMode } from '../../redux/slices/colorsSlice.js';
import { setTextInputLight, setTextInputDark } from '../../redux/slices/textInputSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
    const textInput = useSelector((state) => state.textInput);
    const dispatch = useDispatch();
    const menuItems = ['announcement', 'event', 'login', 'create-user', 'info',];
    const navigation = useNavigation();

    // light color mode
    const lightMode = () => {
        dispatch(setLightMode());
        dispatch(setTextInputLight());
    }

    //dark color mode
    const darkMode = () => {
        dispatch(setDarkMode());
        dispatch(setTextInputDark());
    }

  return (
    <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
        {
            menuItems && menuItems.length ? menuItems.map((item, index) => (
                <Pressable key={index} onPress={() => {navigation.navigate(item)}}>
                    <Text>{item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
                </Pressable>
            )) : null
        }
        <View>
            <Pressable onPress={() => {lightMode();}}>
                <Text>Light Mode</Text>
            </Pressable>
            <Pressable onPress={() => {darkMode();}}>
                <Text>Dark Mode</Text>
            </Pressable>
        </View>
    </View>
  )
}

export default Header;