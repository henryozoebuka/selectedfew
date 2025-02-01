import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const menuItems = ['announcement', 'event', 'login', 'create-user', 'info',];
    const navigation = useNavigation();
  return (
    <View style={{display: 'flex', flexDirection: 'row', gap: 5}}>
        {
            menuItems && menuItems.length ? menuItems.map((item, index) => (
                <Pressable key={index} onPress={() => {navigation.navigate(item)}}>
                    <Text>{item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
                </Pressable>
            )) : null
        }
    </View>
  )
}

export default Header;