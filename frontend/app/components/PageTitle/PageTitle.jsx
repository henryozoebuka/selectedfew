import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {SIZES} from '../../styles/styles.js';
import { useSelector } from 'react-redux';

const PageTitle = ({name}) => {
    const colors = useSelector((state) => state.colors);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: colors.textPrimary, fontSize: SIZES.twentyFive, fontWeight: 'bold'}}>{name}</Text>
    </View>
  )
}

export default PageTitle

const styles = StyleSheet.create({})