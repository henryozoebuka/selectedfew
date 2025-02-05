import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login/Login.js';
import CreateUser from './pages/CreateUser/CreateUser.js';
import Header from './components/Header/Header.jsx';
import Info from './pages/Info/Info.js';
import Announcement from './pages/Announcement/Announcement.js';
import Event from './pages/Event/Event.js';
import User from './pages/User/User.js';
import AdminUser from './pages/AdminUser/AdminUser.js';
import Users from './pages/Users/Users.js';
import Announcements from './pages/Announcements/Announcements.js';
import AddAnnouncement from './pages/AddAnnouncement/AddAnnouncement.js';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.js';
import ConfirmOTP from './pages/ConfirmOTP/ConfirmOTP.js';
import AddEvent from './pages/AddEvent/AddEvent.js';
import Events from './pages/Events/Events.js';
import AdminTransactionHistory from './pages/AdminTransactionHistory/AdminTransactionHistory.js';
import TransactionHistory from './pages/TransactionHistory/TransactionHistory.js';
import Minutes from './pages/Minutes/Minutes.js';
import AddMinutes from './pages/AddMinutes/AddMinutes.js';
import MinutesArchives from './pages/MinutesArchives/MinutesArchives.js';

const Stack = createStackNavigator();

const MyStacks = () => {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={Login} options={{ header: () => <Header /> }} />
            <Stack.Screen name="create-user" component={CreateUser} options={{ header: () => <Header /> }} />
            <Stack.Screen name="info" component={Info} options={{ header: () => <Header /> }} />
            <Stack.Screen name="forgot-password" component={ForgotPassword} options={{ header: () => <Header /> }} />
            <Stack.Screen name="confirm-otp" component={ConfirmOTP} options={{ header: () => <Header /> }} />
            <Stack.Screen name="announcement" component={Announcement} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-announcement" component={AddAnnouncement} options={{ header: () => <Header /> }} />
            <Stack.Screen name="announcements" component={Announcements} options={{ header: () => <Header /> }} />
            <Stack.Screen name="event" component={Event} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-event" component={AddEvent} options={{ header: () => <Header /> }} />
            <Stack.Screen name="events" component={Events} options={{ header: () => <Header /> }} />
            <Stack.Screen name="minutes" component={Minutes} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-minutes" component={AddMinutes} options={{ header: () => <Header /> }} />
            <Stack.Screen name="minutes-archives" component={MinutesArchives} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-transaction-history" component={AdminTransactionHistory} options={{ header: () => <Header /> }} />
            <Stack.Screen name="transaction-history" component={TransactionHistory} options={{ header: () => <Header /> }} />
            <Stack.Screen name="user" component={User} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-user" component={AdminUser} options={{ header: () => <Header /> }} />
            <Stack.Screen name="users" component={Users} options={{ header: () => <Header /> }} />
        </Stack.Navigator>
    );
}

export default MyStacks;