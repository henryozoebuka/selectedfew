import { Pressable, Text, View, ActivityIndicator, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { toggleMenu } from '../../redux/slices/menuSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { FONT, SIZES } from '../../styles/styles.js';
import Menu from '../Menu/Menu.jsx';
import LightDarkSwitch from '../LightDarkSwitch/LightDarkSwitch.jsx';
import { setUser } from '../../redux/slices/userSlice.js';

const Header = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const menu = useSelector((state) => state.menu);
    const loading = useSelector((state) => state.loading);
    const success = useSelector((state) => state.success);
    const failure = useSelector((state) => state.failure);
    // const menuItems = [ 'admin-events', 'admin-announcements', 'admin-minutes-archive', 'test', 'login', 'add-announcement', 'announcements', 'create-user', 'add-event', 'events', 'minutes-archive', 'add-minutes', 'admin-transaction-history', 'transaction-history', 'user', 'admin-user', 'users', 'info',];
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { height: screenHeight, width: screenWidth } = useWindowDimensions();

    return (
        <View style={{ backgroundColor: colors.menuBackgroundColor, minHeight: SIZES.fifty, borderBottomColor: colors.textPrimary, borderBottomWidth: .5 }}>
            <View style={{ alignSelf: 'center', width: '90%', marginTop: SIZES.ten, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <LightDarkSwitch />
                {user && user.firstname &&
                    <View style={{ flexDirection: 'row', columnGap: SIZES.fifty, alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable onPress={() => { dispatch(setUser({})); navigation.navigate('login') }}>
                            <Text style={{ color: colors.textPrimary }}>Logout</Text>
                        </Pressable>

                        {menu ? <AntDesign name="close" size={SIZES.thirty} color={colors.menuIconColor} onPress={() => { dispatch(toggleMenu()) }} /> : <Feather name="menu" size={SIZES.thirty} color={colors.menuIconColor} onPress={() => { dispatch(toggleMenu()); }} />}
                    </View>
                }
            </View>
            {
                menu && <Menu />
            }
            {
                success ?
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.success, height: screenHeight, width: screenWidth }}>
                        <Text style={{ color: colors.textPrimary, fontWeight: 'bold', fontSize: SIZES.twenty, flexWrap: 'wrap', width: '90%', textAlign: 'center' }}>{success}</Text>
                    </View> :
                    null
            }

            {
                failure ?
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.failure, height: screenHeight, width: screenWidth }}>
                        <Text style={{ color: colors.textPrimary, fontWeight: 'bold', fontSize: SIZES.twenty, flexWrap: 'wrap', width: '90%', textAlign: 'center' }}>{failure}</Text>
                    </View> :
                    null
            }

            {
                loading ?
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', height: screenHeight, width: screenWidth }}>
                        <Text style={{ color: colors.textPrimary }}>Please wait...</Text>
                        <ActivityIndicator color={'green'} size={SIZES.fifty} />
                    </View> :
                    null
            }
        </View>
    )
}

export default Header;