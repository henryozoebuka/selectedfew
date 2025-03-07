import { Pressable, useWindowDimensions, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import NavButton from '../NavButton/NavButton.jsx';
import { SIZES } from '../../styles/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import { toggleMenu } from '../../redux/slices/menuSlice.js';

const Menu = () => {
  const chairmanMenu = [ 'club-account-transfer', 'club-account-transfers', 'constitution', 'request-payment-approval', 'payment-approvals', 'admin-payments', 'transfer-fund', 'payments', 'admin-events', 'admin-announcements', 'admin-minutes-archive', 'announcements', 'create-user', 'events', 'minutes-archive', 'admin-transaction-history', 'transaction-history', 'user', 'users', 'info',];
  const secretaryMenu = [ 'constitution', 'request-payment-approval', 'transfer-fund', 'payments', 'admin-events', 'admin-announcements', 'admin-minutes-archive', 'announcements', 'events', 'minutes-archive', 'transaction-history', 'user', 'info',];
  const treasurerMenu = [ 'club-account-transfer', 'club-account-transfers', 'constitution', 'request-payment-approval', 'payment-approvals', 'admin-payment-approvals', 'admin-payments', 'transfer-fund', 'payments', 'announcements', 'events', 'minutes-archive', 'admin-transaction-history', 'transaction-history', 'user', 'info',];
  const memberMenu = [ 'constitution', 'request-payment-approval', 'payment-approvals', 'transfer-fund', 'payments', 'login', 'announcements', 'events', 'minutes-archive', 'transaction-history', 'user', 'info',];
  const generalMenu = ['login', 'info'];

  const colors = useSelector((state) => state.colors);
  const user = useSelector((state) => state.user);
  const menu = useSelector((state) => state.menu);
  // const menuItems = [ 'club-account-transfer', 'club-account-transfers', 'add-constitution', 'constitution', 'request-payment-approval', 'payment-approvals', 'admin-payment-approvals', 'admin-payments', 'transfer-fund', 'payments', 'admin-events', 'admin-announcements', 'admin-minutes-archive', 'add-payment', 'login', 'add-announcement', 'announcements', 'create-user', 'add-event', 'events', 'minutes-archive', 'add-minutes', 'admin-transaction-history', 'transaction-history', 'user', 'users', 'info',];
  let menuItems = [];
  {user && user.role === 'chairman' ? menuItems = chairmanMenu : user && user.role === 'secretary' ? menuItems = secretaryMenu : user &&  user.role === 'treasurer' ? menuItems = treasurerMenu : user && user.role === 'member' ? menuItems = memberMenu : null}
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const {height: screenHeight, width: screenWidth} = useWindowDimensions();

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: screenHeight, backgroundColor: colors.lightBackgroundColor, marginTop: SIZES.fifty }}>
      <Pressable style={{ width: '100%', alignSelf: 'center', height: '100%'}}>
        <ScrollView>
          <View style={{ flexDirection: 'row', marginBottom: SIZES.twenty, gap: SIZES.ten, width: '90%', alignSelf: 'center', flexWrap: 'wrap', marginTop: SIZES.twenty }}>
            {menu && menuItems && menuItems.length ?
              [...menuItems].sort().map((itemName, index) => {
                let item = itemName;
                if (item === 'user') {
                  item = 'my-profile';
                }
                return (
                  <NavButton key={itemName || index} title={item.replace(/^admin-/, 'manage-').split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} action={() => { dispatch(toggleMenu()); navigation.navigate(itemName) }} />
                );
              }

              )
              : null}
          </View>
        </ScrollView>
      </Pressable>
    </View>
  )
}

export default Menu;