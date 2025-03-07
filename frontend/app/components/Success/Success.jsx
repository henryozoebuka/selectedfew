import { Text, View } from 'react-native';
import React from 'react'
import { useSelector } from 'react-redux';

const Success = ({content}) => {
    const colors = useSelector((state) => state.colors);
  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.success}}>
      <Text style={{color: colors.textPrimary}}>{content}</Text>
    </View>
  )
}

export default Success;