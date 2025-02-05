import { Pressable, View } from 'react-native';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles';
import { useDispatch } from 'react-redux';
import { setDarkMode, setLightMode } from '../../redux/slices/colorsSlice.js';
import { setTextInputLight, setTextInputDark } from '../../redux/slices/textInputSlice.js';
import { setDarkButton, setLightButton } from '../../redux/slices/buttonSlice.js';
import { setDarkButtonText, setLightButtonText } from '../../redux/slices/buttonTextSlice.js';

const SwitchButton = () => {
    const colors = useSelector((state) => state.colors);
    const dispatch = useDispatch();

    const toggleSwitchButton = () => {
      if (colors.dark === 0) {
        darkMode();
      } else {
        lightMode();
      }
  };
  

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
        
  return (
    <Pressable onPress={() => {toggleSwitchButton();}}>
      <View style={{ height: SIZES.ten, width: SIZES.thirtyFive, borderRadius: 100, backgroundColor: colors.dark === 1 ? 'lightblue': colors.switchButtonBackgroundColor}}>
        <View style={{height: SIZES.twenty, width: SIZES.twenty, borderRadius: 100, backgroundColor: colors.dark === 1 ? 'blue': colors.textPrimary, position: 'absolute', top: -5, right: colors.dark === 1 ? 0: ''}}></View>
      </View>
    </Pressable>
  )
}

export default SwitchButton;