import { Text, View, Pressable, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MaskedTextInput } from "react-native-mask-text";
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setUsers } from '../../redux/slices/usersSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import Button from '../../components/Button/Button.jsx';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';
import SelectMembersModal from '../../components/SelectMembersModal/SelectMembersModal.jsx';
import Octicons from '@expo/vector-icons/Octicons';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';


const CreatePayment = () => {
    const serverURL = useSelector((state) => state.serverURL);
    const users = useSelector((state) => state.users);
    const user = useSelector((state) => state.user);
    const colors = useSelector((state) => state.colors);
    const textInput = useSelector((state) => state.textInput);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [data, setData] = useState({
        createdBy: user._id,
        users: selectedUsers,
        title: '',
        dueDate: '',
        amount: '',
    });

    const onChange = (event, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
            setData(prevData => ({ ...prevData, dueDate: selectedDate }));
        }
        setShow(false);
    };


    // Handle text input changes
    const handleChange = (value, name) => {
        setData(prevData => ({
            ...prevData,
            [name]: name === "amount" ? Number(value) : value, // Convert amount to a number
        }));
    };


    const selectAllMembers = () => {
        const allUserIds = users.map(user => user._id);
        setSelectedUsers(allUserIds);
        setData(prevData => ({ ...prevData, users: allUserIds }));
    };


    //handle submit
    const handleSubmit = async () => {
        if (!serverURL) {
            console.error('Server URL is missing');
            return;
        }

        try {
            dispatch(setLoadingInfo('Adding payment.'));
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/create-payment`, data);
            if (response && response.status === 201) {
                dispatch(setSuccess(response.data.message));
                setTimeout(() => {
                    dispatch(setSuccess(''));
                    navigation.navigate('admin-payments');
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

    // Toggle selection
    const toggleSelection = (id) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(item => item !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    //toggle show members
    const toggleShowMembers = () => {
        setShowMembers(!showMembers)
    }

    const fetchusers = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/users`);
            if (response && response.status === 200) {
                dispatch(setUsers(response.data));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                dispatch(setFailure(''));
            }
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (users.length === 0) {
            fetchusers();
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ marginBottom: SIZES.twenty }}>
                <PageTitle name={'Add Payment'} />
            </View>
            {
                showMembers && <SelectMembersModal selectAll={selectAllMembers} toggleShowMembers={toggleShowMembers} toggleSelection={toggleSelection} members={users} selectedmembers={selectedUsers} />
            }

            <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', width: '100%' }} style={{ flex: 1, width: '100%', marginBottom: SIZES.fifty }}>
                <View style={{ width: '90%', maxWidth: 500, backgroundColor: colors.lightBackgroundColor, borderRadius: 10 }}>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, }}>
                        <TextInput onChangeText={(value) => { handleChange(value, 'title'); }} style={textInput} placeholder='Enter payment title' placeholderTextColor={PLACEHOLDERCOLOR} />
                        <TextInput multiline={true} numberOfLines={SIZES.fifty} style={[textInput, { textAlignVertical: 'top', height: SIZES.twoHundred, marginTop: SIZES.twenty }]} placeholder='Type description here...' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'description') }} />
                        
                        <MaskedTextInput
                            type="currency"
                            options={{
                                prefix: "₦ ",
                                decimalSeparator: ".",
                                groupSeparator: ",",
                                precision: 0, // No decimals
                            }}
                            value={data.amount}
                            onChangeText={(masked, raw) => {
                                setData(prevData => ({ ...prevData, amount: raw })); // Store raw number
                            }}
                            style={textInput}
                            keyboardType="numeric"
                            placeholder="Enter payment amount"
                            placeholderTextColor={PLACEHOLDERCOLOR}
                        />

                        <Pressable onPress={() => { setShow(true) }} style={{ flexDirection: 'row', columnGap: SIZES.ten, marginBottom: SIZES.ten, borderStyle: 'dotted', borderWidth: SIZES.one, borderColor: colors.textPrimary, borderRadius: SIZES.five, alignItems: 'center', paddingLeft: SIZES.ten }}>
                            <AntDesign name="calendar" size={SIZES.twentyFive} color={colors.textPrimary} />
                            <Text style={{ color: colors.textSecondary, fontSize: FONT.eighteen, marginBottom: SIZES.five }}>Select Due Date</Text>
                        </Pressable>
                        {data && data.dueDate ? <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen, marginBottom: SIZES.five }}>{data.dueDate.toDateString()}</Text> : null}

                        {
                            show && <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
                        }

                        <View style={{ marginBottom: SIZES.fifteen }}>
                            <Pressable onPress={() => { setShowMembers(true) }} style={{ flexDirection: 'row', columnGap: SIZES.ten, marginBottom: SIZES.ten, borderStyle: 'dotted', borderWidth: SIZES.one, borderColor: colors.textPrimary, borderRadius: SIZES.five, alignItems: 'center', paddingLeft: SIZES.ten }}>
                                <Octicons name="people" size={SIZES.twentyFive} color={colors.textPrimary} />
                                <Text style={{ color: colors.textSecondary, fontSize: FONT.eighteen, marginBottom: SIZES.five }}>Select Members</Text>
                            </Pressable>

                            {/* {users && users.length ? (
                                [...users].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((user, index) => (
                                    <View key={user._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>

                                        <Checkbox
                                            value={selectedUsers.includes(user._id)}
                                            onValueChange={() => toggleSelection(user._id)}
                                        />
                                        <Text style={{color: colors.textPrimary}}>{user.firstname + " " + user.lastname}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text>Null</Text>
                            )} */}
                        </View>
                        <Button title={'Submit'} action={() => { handleSubmit() }} />
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>
    )
}

export default CreatePayment;