import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FONT, PLACEHOLDERCOLOR, SIZES } from '../../styles/styles';
import Button from '../../components/Button/Button.jsx';
import { useNavigation } from '@react-navigation/native';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const EditConstitution = () => {

    const colors = useSelector((state) => state.colors);
    const constitution = useSelector((state) => state.constitution);
    const user = useSelector((state) => state.user);
    const serverURL = useSelector((state) => state.serverURL);
    const textInput = useSelector((state) => state.textInput);
    const [data, setData] = useState({
        constitutionId: '',
        author: '',
        title: '',
        body: '',
        published: null,
    })


    const dispatch = useDispatch();
    const navigation = useNavigation();

    //handle change
    const handleChange = (value, name) => {
        setData(prev => ({
            ...prev,
            [name]: name === 'published' ? value === 'true' || value === true : value
        }));
    };

    // Handle published selection
    const handlePublished = (value) => {
        setData(prevData => ({ ...prevData, published: value }));
    };

    const handleSubmit = async () => {
        try {
            dispatch(setLoadingInfo('Updating constitution.'));
            dispatch(setLoading(true));
            const response = await axios.patch(`${serverURL}/edit-constitution/${user._id}`, data);
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
            constitutionId: constitution._id || '',
            author: constitution.author || '',
            title: constitution.title || '',
            body: constitution.body || '',
            published: constitution.published ?? null,
        });
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView style={{ width: '90%', alignSelf: 'center', marginTop: SIZES.twenty }}>
                <Text style={{ fontWeight: 'bold', color: colors.textPrimary, marginBottom: SIZES.ten, fontSize: FONT.twenty }} >Edit Constitution</Text>
                <TextInput style={textInput} placeholder='Enter constitution title' placeholderTextColor={PLACEHOLDERCOLOR} value={data.title || ''} onChangeText={(value) => { handleChange(value, 'title') }} />
                <TextInput multiline={true} numberOfLines={50} style={[textInput, { textAlignVertical: 'top', minHeight: SIZES.twoHundred, marginTop: SIZES.twenty }]} placeholder='Type constitution here...' placeholderTextColor={PLACEHOLDERCOLOR} value={data.body || ''} onChangeText={(value) => { handleChange(value, 'body') }} />
                <View style={{ marginBottom: SIZES.twenty }}>
                    <Text style={{ color: colors.textSecondary, fontSize: FONT.fifteen, marginBottom: SIZES.ten }}>Select a publish status:</Text>
                    
                </View>
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
                <Button title={'Update'} action={handleSubmit} />
            </ScrollView>
        </View>
    )
}

export default EditConstitution;