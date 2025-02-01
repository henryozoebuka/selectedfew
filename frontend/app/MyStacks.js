import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login/Login.js';
import CreateUser from './pages/CreateUser/CreateUser.js';
import Header from './components/Header/Header.jsx';
import Info from './pages/Info/Info.js';
import Announcement from './pages/Announcement/Announcement.js';
import Event from './pages/Event/Event.js';

const Stack = createStackNavigator();

const MyStacks = () => {
    return (
        <Stack.Navigator initialRouteName="login">
            <Stack.Screen name="login" component={Login} options={{ header: () => <Header /> }} />
            <Stack.Screen name="create-user" component={CreateUser} options={{ header: () => <Header /> }} />
            <Stack.Screen name="info" component={Info} options={{ header: () => <Header /> }} />
            <Stack.Screen name="announcement" component={Announcement} options={{ header: () => <Header /> }} />
            <Stack.Screen name="event" component={Event} options={{ header: () => <Header /> }} />
        </Stack.Navigator>
    );
}

export default MyStacks;