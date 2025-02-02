import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SIZES } from '../../styles/styles';
import { useSelector } from 'react-redux';


const Footer = () => {
  const colors = useSelector((state) => state.colors);
  return (
    <View style={{width: '100%',position: 'absolute', bottom: 0, left: 0, backgroundColor: colors.lightBackgroundColor}}>
      <View style={{width: '90%', maxWidth: 500, marginVertical: SIZES.five, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
      <Ionicons name="home" size={24} color={colors.textPrimary} />
      <AntDesign name="search1" size={24} color={colors.textPrimary} />
      <AntDesign name="user" size={24} color={colors.textPrimary} />
      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({})