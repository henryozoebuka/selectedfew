import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SIZES } from '../../styles/styles';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const Footer = () => {
  const colors = useSelector((state) => state.colors);
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  if (!user.firstname) {
    return null
  }
  return (
    <View style={{ width: '100%', position: 'absolute', bottom: 0, left: 0, backgroundColor: colors.lightBackgroundColor }}>
      <View style={{ width: '80%', maxWidth: 500, marginVertical: SIZES.five, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

        <Pressable onPress={() => { navigation.navigate('info'); }}>
          <AntDesign name="home" size={SIZES.twentyFive} color="black" />
        </Pressable>

        <Pressable onPress={() => { navigation.navigate('user'); }}>
          <AntDesign name="user" size={SIZES.twentyFive} color={colors.textPrimary} />
        </Pressable>

        <Pressable onPress={() => { navigation.navigate('login'); }}>
          <AntDesign name="back" size={SIZES.twentyFive} color={colors.textPrimary} onPress={() => { navigation.goBack() }} />
        </Pressable>

      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({})