import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import Image1 from '../../../assets/images/favicon.png';
import Footer from '../../components/Footer/Footer.jsx';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import axios from 'axios';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const AdminUser = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const users = useSelector((state) => state.users);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const route = useRoute();
    const { id } = route.params || {};

    const adminUser = users.find(prevUsers => prevUsers._id === id);

    const [displayModal, setDisplayModal] = useState(false);
    const [file, setFile] = useState(null);
    const [saved, setSaved] = useState(true);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true, // Allow editing the image
                aspect: [1, 1], // Square aspect ratio
                quality: 1, // Highest quality
                // base64: true
            });

            if (result.canceled) {
                return;
            }
            return result.assets[0]; // Contains URI, type, etc.
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };

    const selectedImage = async () => {
        const pickedImage = await pickImage();
        if (pickedImage) {
            setFile(pickedImage); // Store the file in state
            setSaved(false);
        }
    };

    const uploadFile = async () => {
        if (!file || !file.uri) {
            console.error("No file selected");
            dispatch(setFailure("Please select a file before uploading."));
            setTimeout(() => dispatch(setFailure('')), 5000);
            return;
        }
    
        try {
            dispatch(setLoading(true));
    
            const formData = new FormData();
            formData.append("photo", file);
    
            const res = await axios.patch(`${serverURL}/edit-photo/${adminUser._id}`, formData);
    
            if (res.status === 200) {
                setSaved(true);
                dispatch(setUser(res.data.user));
                dispatch(setSuccess(res.data.message));
                setTimeout(() => dispatch(setSuccess('')), 3000);
            }
    
        } catch (error) {
            console.error("Upload failed:", error.response ? error.response.data : error.message);
            dispatch(setFailure(error.response ? error.response.data.message : "Upload failed"));
            setTimeout(() => dispatch(setFailure('')), 5000);
        } finally {
            dispatch(setLoading(false));
        }
    };

    //delete user
    const deleteUser = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-user/${adminUser._id}`)
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                setTimeout(() => {
                    dispatch(setSuccess(''));
                    navigation.navigate('users');
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

    //toggle delete confirmation modal
    const toggleDeleteModal = () => {
        setDisplayModal(!displayModal);
    }

    if (displayModal) {
        return (
            <ConfirmationModal action={() => { deleteUser(); }} displayModal={displayModal} toggle={toggleDeleteModal} question={`Are you sure you want to delete ${adminUser?.firstname}'s account?`} />
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Member Profile'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <Text style={{ alignSelf: 'center', color: colors.textPrimary, fontSize: FONT.thirty }}>Welcome to {adminUser?.firstname.trim()}'s profile!</Text>
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <View style={{marginBottom: SIZES.twenty}}>
                        {file ? <Image source={{ uri: file.uri }} style={{ alignSelf: 'center', height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" /> : <Image source={adminUser.photo ? { uri: user.photo } : Image1} style={{ alignSelf: 'center', height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" />}
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '30%', right: '20%', height: SIZES.fourty, width: SIZES.fourty, borderRadius: SIZES.oneHundred, backgroundColor: '#DADADA' }}>
                            {saved ? <AntDesign name="camerao" size={24} color={colors.textPrimary} onPress={selectedImage} /> : <AntDesign name="save" size={24} color={colors.textPrimary} onPress={() => uploadFile()} />}
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', columnGap: SIZES.ten}}>
                        <SecondButton bold={'bold'} title={'Edit'} action={() => { navigation.navigate('admin-edit-user', { id: adminUser._id }) }} />
                            <View style={{ borderLeftWidth: SIZES.two, height: SIZES.twenty, borderLeftColor: colors.textPrimary }}></View>
                        <SecondButton bold={'bold'} title={'Delete User'} action={() => { toggleDeleteModal(); }} />
                    </View>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Full Name</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{adminUser?.firstname}</Text>
                            <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>{adminUser?.lastname}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>email</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{adminUser.email}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>gender</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, textTransform: 'capitalize' }}>{adminUser.gender ? adminUser.gender: 'No gender set'}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Number of OTP Attempts</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{adminUser.OTPNumberOfAttempts}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Role</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, textTransform: 'capitalize' }}>{adminUser.role}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>phone number</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{adminUser.phoneNumber}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>                
                    
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>balance</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>₦{adminUser.accountBalance.toLocaleString()}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, color: colors.textPrimary, }}>Account Number</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>{adminUser.accountNumber}</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default AdminUser;