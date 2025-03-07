import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PLACEHOLDERCOLOR, SIZES, FONT } from '../../styles/styles';
import Button from '../../components/Button/Button.jsx';
import { useNavigation } from '@react-navigation/native';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';

const AddAnnouncement = () => {

    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const serverURL = useSelector((state) => state.serverURL);
    const textInput = useSelector((state) => state.textInput);
    const [data, setData] = useState({
        author: user._id,
        title: '',
        body: '',
        published: false,
    })

    const dispatch = useDispatch();
    const navigation = useNavigation();

    //handle change
    const handleChange = (value, name) => {
        setData(prev => ({ ...prev, [name]: value }));
    }

    // Handle published selection
    const handlePublished = (value) => {
        setData(prevData => ({ ...prevData, published: value }));
    };

    const handleSubmit = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.post(`${serverURL}/create-announcement`, data);
            if (response && response.status === 201) {
                dispatch(setSuccess(response.data.message));
                setTimeout(() => {
                    dispatch(setSuccess(''));
                    navigation.navigate('admin-announcements');
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

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView style={{ width: '90%', alignSelf: 'center', marginTop: SIZES.twenty, height: '100%' }}>
                <Text style={{ fontWeight: 'bold', color: colors.textPrimary }} >Post Announcement</Text>
                <TextInput style={textInput} placeholder='Enter announcement title' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'title') }} />
                <TextInput multiline={true} numberOfLines={50} style={[textInput, { textAlignVertical: 'top', minHeight: SIZES.twoHundred, marginTop: SIZES.twenty }]} placeholder='Type announcement here...' placeholderTextColor={PLACEHOLDERCOLOR} onChangeText={(value) => { handleChange(value, 'body') }} />
                <View style={{ marginBottom: SIZES.fifteen }}>
                    <Text style={{ color: colors.textSecondary, fontSize: FONT.twenty, marginBottom: 5 }}>Published Status</Text>
                    <Pressable onPress={() => { handlePublished(true); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: SIZES.one }}>
                            <View style={{ backgroundColor: data.published === true ? '#000000' : '', height: 10, width: 10, borderRadius: 10 }} ></View>
                        </View>
                        <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen, }}>Published</Text>
                    </Pressable>
                    <Pressable onPress={() => { handlePublished(false); }} style={{ display: 'flex', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#ffffff', height: 15, width: 15, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: SIZES.one }}>
                            <View style={{ backgroundColor: data.published === false ? '#000000' : '', height: 10, width: 10, alignSelf: 'center', borderRadius: 10 }} ></View>
                        </View>
                        <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen }}>Unpublished</Text>
                    </Pressable>
                </View>
                <Button title={'Post'} action={handleSubmit} />
            </ScrollView>
        </View>
    )
}

export default AddAnnouncement;