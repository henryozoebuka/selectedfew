import { Pressable, View } from 'react-native';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles';
import { useDispatch } from 'react-redux';
import { setDarkMode, setLightMode } from '../../redux/slices/colorsSlice.js';
import { setTextInputLight, setTextInputDark } from '../../redux/slices/textInputSlice.js';
import { setDarkButton, setLightButton } from '../../redux/slices/buttonSlice.js';
import { setDarkButtonText, setLightButtonText } from '../../redux/slices/buttonTextSlice.js';

const LightDarkSwitch = () => {
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
    <Pressable onPress={() => {toggleSwitchButton();}} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {colors.dark === 1 ? <Entypo name="light-up" size={SIZES.twentyFive} color={colors.textPrimary} />: <MaterialIcons name="dark-mode" size={24} color="black" /> }
    </Pressable>
  )
}

export default LightDarkSwitch;