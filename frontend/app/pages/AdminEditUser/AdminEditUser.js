import { Text, View, Pressable, TextInput, ScrollView, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import { useRoute } from '@react-navigation/native';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const AdminEditUser = () => {
    const serverURL = useSelector((state) => state.serverURL);
    const colors = useSelector((state) => state.colors);
    const textInput = useSelector((state) => state.textInput);
    const users = useSelector((state) => state.users);
    const route = useRoute();
    const { id } = route.params || {};
    const {height: screenHeight} = useWindowDimensions();

    const adminUser = users.find(prevUsers => prevUsers._id === id);
    const dispatch = useDispatch();


    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        gender: '',
        role: '',
        status: '',
    });

    // Handle text input changes
    const handleChange = (value, name) => {
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle gender selection
    const handleGender = (value) => {
        setData(prevData => ({ ...prevData, gender: value }));
    };

    //handle submit
    const handleSubmit = async () => {
        if (!serverURL) {
            console.error('Server URL is missing');
            return;
        }

        try {
            dispatch(setLoadingInfo('Updating user information.'));
            dispatch(setLoading(true));
            const response = await axios.patch(`${serverURL}/edit-user/${adminUser._id}`, data);
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                setTimeout(() => {
                    dispatch(setSuccess(''));
                }, 3000);
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        setData({
            firstname: adminUser.firstname || '',
            lastname: adminUser.lastname || '',
            email: adminUser.email || '',
            phoneNumber: adminUser.phoneNumber || '',
            gender: adminUser.gender || '',
            role: adminUser.role || '',
            status: adminUser.status || '',
        })
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginTop: SIZES.sixty, marginBottom: SIZES.twenty }}>
            <PageTitle name={'Edit Member Profile'} />
            </View>
            <View style={{ width: '90%', marginBottom: SIZES.eighty }}>
                <ScrollView>
                    <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginBottom: SIZES.twenty }}>

                        <View style={{ display: 'flex', width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
                            <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, }}>
                                <Text style={{ color: colors.textPrimary, alignSelf: 'center', marginBottom: SIZES.twenty, fontSize: FONT.twenty }}>Edit {adminUser.firstname.trim()}'s Profile</Text>
                                <Text style={{ fontSize: FONT.twelve, color: colors.textPrimary }}>Firstname</Text>
                                <TextInput value={data.firstname || ''} onChangeText={(value) => { handleChange(value, 'firstname'); }} style={textInput} placeholder='Enter user firstname' placeholderTextColor={PLACEHOLDERCOLOR} />

                                <Text style={{ fontSize: FONT.twelve, color: colors.textPrimary }}>Lastname</Text>
                                <TextInput value={data.lastname || ''} onChangeText={(value) => { handleChange(value, 'lastname'); }} style={textInput} placeholder='Enter user lastname' placeholderTextColor={PLACEHOLDERCOLOR} />
                                <Text style={{ fontSize: FONT.twelve, color: colors.textPrimary }}>Email</Text>
                                <TextInput value={data.email || ''} onChangeText={(value) => { handleChange(value, 'email'); }} style={textInput} keyboardType="email-address" placeholder='Enter your email' placeholderTextColor={PLACEHOLDERCOLOR} />
                                <Text style={{ fontSize: FONT.twelve, color: colors.textPrimary }}>Phone Number</Text>
                                <TextInput value={data.phoneNumber || ''} onChangeText={(value) => { handleChange(value, 'phoneNumber'); }} style={textInput} keyboardType="phone-pad" placeholder="Enter user phone number" placeholderTextColor={PLACEHOLDERCOLOR} />
                                <View style={{ marginBottom: SIZES.fifteen }}>
                                    <Text style={{ color: colors.textSecondary, fontSize: FONT.twenty, marginBottom: 5 }}>Gender</Text>
                                    <Pressable onPress={() => { handleGender('male'); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: data.gender === 'male' ? 'black' : '', height: 10, width: 10, borderRadius: 10 }} ></View>
                                        </View>
                                        <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen, }}>Male</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { handleGender('female'); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: data.gender === 'female' ? 'black' : '', height: 10, width: 10, alignSelf: 'center', borderRadius: 10 }} ></View>
                                        </View>
                                        <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen }}>Female</Text>
                                    </Pressable>
                                </View>
                                <View style={{ marginBottom: SIZES.twenty }}>
                                    <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen, marginBottom: SIZES.ten }}>Select a role:</Text>
                                    <View style={{ borderWidth: SIZES.one, borderColor: colors.textPrimary, borderRadius: SIZES.ten }}>
                                        <RNPickerSelect style={{ inputAndroid: { color: colors.textPrimary }, inputIOS: { color: colors.textPrimary } }}
                                            value={data.role}
                                            onValueChange={(value) => handleChange(value, 'role')}
                                            items={[
                                                { label: 'Super Admin', value: 'super admin' },
                                                { label: 'Admin', value: 'admin' },
                                                { label: 'Chairman', value: 'chairman' },
                                                { label: 'Secretary', value: 'secretary' },
                                                { label: 'Treasurer', value: 'treasurer' },
                                                { label: 'member', value: 'member' },
                                            ]}
                                            placeholder={{ label: "Select a role...", value: null }}

                                        />
                                    </View>
                                </View>

                                {/* Change user status */}
                                <View style={{ marginBottom: SIZES.twenty }}>
                                    <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen, marginBottom: SIZES.ten }}>Select a role:</Text>
                                    <View style={{ borderWidth: SIZES.one, borderColor: colors.textPrimary, borderRadius: SIZES.ten }}>
                                        <RNPickerSelect style={{ inputAndroid: { color: colors.textPrimary }, inputIOS: { color: colors.textPrimary } }}
                                            value={data.status}
                                            onValueChange={(value) => handleChange(value, 'status')}
                                            items={[
                                                { label: 'Active', value: 'active' },
                                                { label: 'Inactive', value: 'inactive' },
                                            ]}
                                            placeholder={{ label: "Select a status...", value: null }}

                                        />
                                    </View>
                                </View>

                                <Button title={'Update'} action={() => { handleSubmit() }} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Footer />
        </View>
    )
}

export default AdminEditUser;