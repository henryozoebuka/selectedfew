import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login/Login.js';
import CreateUser from './pages/CreateUser/CreateUser.js';
import Header from './components/Header/Header.jsx';
import Info from './pages/Info/Info.js';
import Announcement from './pages/Announcement/Announcement.js';
import User from './pages/User/User.js';
import AdminUser from './pages/AdminUser/AdminUser.js';
import Users from './pages/Users/Users.js';
import Announcements from './pages/Announcements/Announcements.js';
import AddAnnouncement from './pages/AddAnnouncement/AddAnnouncement.js';
import AddPayment from './pages/AddPayment/AddPayment.js';
import AdminPayments from './pages/AdminPayments/AdminPayments.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Payments from './pages/Payments/Payments.js';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.js';
import ConfirmOTP from './pages/ConfirmOTP/ConfirmOTP.js';
import Event from './pages/Event/Event.js';
import AddEvent from './pages/AddEvent/AddEvent.js';
import EditEvent from './pages/EditEvent/EditEvent.js';
import Events from './pages/Events/Events.js';
import AdminTransactionHistory from './pages/AdminTransactionHistory/AdminTransactionHistory.js';
import TransactionHistory from './pages/TransactionHistory/TransactionHistory.js';
import Minutes from './pages/Minutes/Minutes.js';
import AddMinutes from './pages/AddMinutes/AddMinutes.js';
import EditMinutes from './pages/EditMinutes/EditMinutes.js';
import MinutesArchive from './pages/MinutesArchive/MinutesArchive.js';
import ChangePassword from './pages/ChangePassword/ChangePassword.js';
import EditUser from './pages/EditUser/EditUser.js';
import EditAnnouncement from './pages/EditAnnouncement/EditAnnouncement.js';
import AdminAnnouncements from './pages/AdminAnnouncements/AdminAnnouncements.js';
import AdminEvents from './pages/AdminEvents/AdminEvents.js';
import AdminMinutesArchive from './pages/AdminMinutesArchive/AdminMinutesArchive.js';
import AdminEditUser from './pages/AdminEditUser/AdminEditUser.js';
import Payment from './pages/Payment/Payment.js';
import TransferFund from './pages/TransferFund/TransferFund.js';
import RequestPaymentApproval from './pages/RequestPaymentApproval/RequestPaymentApproval.js';
import PaymentApprovals from './pages/PaymentApprovals/PaymentApprovals.js';
import AdminPaymentApprovals from './pages/AdminPaymentApprovals/AdminPaymentApprovals.js';
import AdminPaymentApproval from './pages/AdminPaymentApproval/AdminPaymentApproval.js';
import Constitution from './pages/Constitution/Constitution.js';
import EditConstitution from './pages/EditConstitution/EditConstitution.js';
import AddConstitution from './pages/AddConstitution/AddConstitution.js';
import ClubAccountTransfer from './pages/ClubAccountTransfer/ClubAccountTransfer.js';
import ClubAccountTransfers from './pages/ClubAccountTransfers/ClubAccountTransfers.js';
import AdminPayment from './pages/AdminPayment/AdminPayment.js';
import ApproveClubTransfer from './pages/ApproveClubTransfer/ApproveClubTransfer.js';
import ViewTransactionHistory from './pages/ViewTransactionHistory/ViewTransactionHistory.js';
import AdminViewTransactionHistory from './pages/AdminViewTransactionHistory/AdminViewTransactionHistory.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import PaymentApproval from './pages/PaymentApproval/PaymentApproval.js';


const Stack = createStackNavigator();

const MyStacks = () => {
    const user = useSelector((state) => state.user);

    
    return (
        <Stack.Navigator initialRouteName="login">
                    <Stack.Screen name="login" component={Login} options={{ header: () => <Header /> }} />
                    <Stack.Screen name="forgot-password" component={ForgotPassword} options={{ header: () => <Header /> }} />
            {user && (
                <>
            <Stack.Screen name="create-user" component={CreateUser} options={{ header: () => <Header /> }} />
            <Stack.Screen name="info" component={Info} options={{ header: () => <Header /> }} />
            <Stack.Screen name="confirm-otp" component={ConfirmOTP} options={{ header: () => <Header /> }} />
            <Stack.Screen name="announcement" component={Announcement} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-announcement" component={AddAnnouncement} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-payment" component={AdminPayment} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-payments" component={AdminPayments} options={{ header: () => <Header /> }} />
            <Stack.Screen name="payment" component={Payment} options={{ header: () => <Header /> }} />
            <Stack.Screen name="payments" component={Payments} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-payment" component={AddPayment} options={{ header: () => <Header /> }} />
            <Stack.Screen name="edit-announcement" component={EditAnnouncement} options={{ header: () => <Header /> }} />
            <Stack.Screen name="announcements" component={Announcements} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-announcements" component={AdminAnnouncements} options={{ header: () => <Header /> }} />
            <Stack.Screen name="event" component={Event} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-event" component={AddEvent} options={{ header: () => <Header /> }} />
            <Stack.Screen name="edit-event" component={EditEvent} options={{ header: () => <Header /> }} />
            <Stack.Screen name="events" component={Events} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-events" component={AdminEvents} options={{ header: () => <Header /> }} />
            <Stack.Screen name="minutes" component={Minutes} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-minutes" component={AddMinutes} options={{ header: () => <Header /> }} />
            <Stack.Screen name="edit-minutes" component={EditMinutes} options={{ header: () => <Header /> }} />
            <Stack.Screen name="minutes-archive" component={MinutesArchive} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-minutes-archive" component={AdminMinutesArchive} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-transaction-history" component={AdminTransactionHistory} options={{ header: () => <Header /> }} />
            <Stack.Screen name="transaction-history" component={TransactionHistory} options={{ header: () => <Header /> }} />
            <Stack.Screen name="user" component={User} options={{ header: () => <Header /> }} />
            <Stack.Screen name="edit-user" component={EditUser} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-edit-user" component={AdminEditUser} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-user" component={AdminUser} options={{ header: () => <Header /> }} />
            <Stack.Screen name="users" component={Users} options={{ header: () => <Header /> }} />
            <Stack.Screen name="change-password" component={ChangePassword} options={{ header: () => <Header /> }} />
            <Stack.Screen name="transfer-fund" component={TransferFund} options={{ header: () => <Header /> }} />
            <Stack.Screen name="request-payment-approval" component={RequestPaymentApproval} options={{ header: () => <Header /> }} />
            <Stack.Screen name="payment-approval" component={PaymentApproval} options={{ header: () => <Header /> }} />
            <Stack.Screen name="payment-approvals" component={PaymentApprovals} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-payment-approvals" component={AdminPaymentApprovals} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-payment-approval" component={AdminPaymentApproval} options={{ header: () => <Header /> }} />
            <Stack.Screen name="add-constitution" component={AddConstitution} options={{ header: () => <Header /> }} />
            <Stack.Screen name="constitution" component={Constitution} options={{ header: () => <Header /> }} />
            <Stack.Screen name="edit-constitution" component={EditConstitution} options={{ header: () => <Header /> }} />
            <Stack.Screen name="club-account-transfer" component={ClubAccountTransfer} options={{ header: () => <Header /> }} />
            <Stack.Screen name="club-account-transfers" component={ClubAccountTransfers} options={{ header: () => <Header /> }} />
            <Stack.Screen name="approve-club-transfer" component={ApproveClubTransfer} options={{ header: () => <Header /> }} />
            <Stack.Screen name="view-transaction-history" component={ViewTransactionHistory} options={{ header: () => <Header /> }} />
            <Stack.Screen name="admin-view-transaction-history" component={AdminViewTransactionHistory} options={{ header: () => <Header /> }} />
            </>
        )}
        </Stack.Navigator>
    );
}

export default MyStacks;