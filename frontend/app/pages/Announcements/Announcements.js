import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles.js';
import moment from 'moment';
import { setAnnouncements } from '../../redux/slices/announcementsSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const Announcements = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const announcements = useSelector((state) => state.announcements);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected announcements
    const [selectedAnnouncements, setSelectedAnnouncements] = useState([]);

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


    useEffect(() => {
        fetchAnnouncements();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Announcements'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {announcements && announcements.length ? (
                        [...announcements].filter(prev => prev.published === true).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((announcement, index) => (
                            <View key={announcement._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
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

export default Announcements;