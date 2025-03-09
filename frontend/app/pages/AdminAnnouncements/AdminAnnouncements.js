import { Pressable } from 'react-native'; // ✅ Correct import
import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SIZES, FONT } from '../../styles/styles.js';
import { setAnnouncements } from '../../redux/slices/announcementsSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import Checkbox from 'expo-checkbox';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import moment from 'moment';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const AdminAnnouncements = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const announcements = useSelector((state) => state.announcements);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected announcements
    const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);
    const [modal, setModal] = useState(false);

    // Fetch announcements
    const fetchAnnouncements = async () => {
        try {
            dispatch(setLoadingInfo('Fetching announcements.'));
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/announcements`);
            if (response && response.status === 200) {
                dispatch(setAnnouncements(response.data));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Delete announcements
    const deletedAnnouncements = async () => {
        try {
            dispatch(setLoadingInfo('Deleting announcement(s)'));
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-announcements`, {data: {announcements: selectedAnnouncements}});
        if (response && response.status === 200) {
            setSelectedAnnouncements([]);
            const currentAnnouncements = announcements.filter(prev => !selectedAnnouncements.includes(prev._id));
            dispatch(setAnnouncements(currentAnnouncements));
            dispatch(setSuccess(response.data.message));
            setModal(false);
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
        fetchAnnouncements();
    }, []);

    

    // Toggle selection
    const toggleSelection = (id) => {
        if (selectedAnnouncements.includes(id)) {
            setSelectedAnnouncements(selectedAnnouncements.filter(item => item !== id));
        } else {
            setSelectedAnnouncements([...selectedAnnouncements, id]);
        }
    };

    // Toggle delete modal
    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    if (modal) {
        return <ConfirmationModal displayModal={() => {modal();} } question={'Are you sure that you want to delete these announcements?'} toggle={() => {toggleDeleteModal();}} action={() => { deletedAnnouncements();}}/>
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Manage Announcements'} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', width: '90%', marginTop: SIZES.twenty}}>
                <SecondButton title={'Add Announcement'} bold={'bold'} action={() => { navigation.navigate('add-announcement'); }} />
                <Pressable disabled={selectedAnnouncements.length ? false : true} onPress={() => { toggleDeleteModal(); }}>
                    <MaterialIcons name="delete" size={SIZES.thirty} color={selectedAnnouncements.length ? colors.textPrimary : colors.lightBackgroundColor} />
                </Pressable>
            </View>

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {announcements && announcements.length ? (
                        [...announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((announcement, index) => (
                            <View key={announcement._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                <Checkbox
                                    value={selectedAnnouncements.includes(announcement._id)}
                                    onValueChange={() => toggleSelection(announcement._id)}
                                />
                                    <AnnouncementCard title={announcement.title} body={announcement.body} postDate={moment(announcement.createdAt).format('MMMM D, YYYY')} action={() => { navigation.navigate('announcement', { id: announcement._id })}}/>
                            </View>
                        ))
                    ) : (
                        <Text>Null</Text>
                    )}
                </View>
            </ScrollView>

            <Footer />
        </View>
    );
};

export default AdminAnnouncements;