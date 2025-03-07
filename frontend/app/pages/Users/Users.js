import { Text, View, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Image1 from '../../../assets/images/favicon.png';
import Footer from '../../components/Footer/Footer.jsx';
import MemberCard from '../../components/MemberCard/MemberCard.jsx';
import { setUsers } from '../../redux/slices/usersSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const Users = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const users = useSelector((state) => state.users);
    const loading = useSelector((state) => state.loading);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    //delete user
    const deleteUser = async (userId) => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-user/${userId}`);
            if (response && response.status === 200) {
                const newUsers = users.filter(prevUser => prevUser._id !== userId);
                dispatch(setUsers(newUsers));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''))
                }, 5000);
            }
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        //fetch users
        const fetchUsers = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get(`${serverURL}/users`);
                if (response && response.status === 200) {
                    dispatch(setUsers(response.data));
                }
            } catch (error) {
                if (error?.response?.data?.message) {
                    dispatch(setFailure(error.response.data.message));
                    setTimeout(() => {
                        dispatch(setFailure(''))
                    }, 5000);
                }
                console.error(error);
            } finally {
                dispatch(setLoading(false));
            }
        }

        fetchUsers();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Members'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {users && users.length ?
                        users.map((user, index) => (
                            <MemberCard key={user._id || index} image={user.photo || Image1} memberName={user.firstname + ' ' + user.lastname} role={user.role || 'No role assigned yet'} imageAlt={user.firstname} deleteUser={() => { deleteUser(user._id); }} action={() => {navigation.navigate("admin-user", { id: user._id });}} />
                        ))
                        : null}
                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Users;