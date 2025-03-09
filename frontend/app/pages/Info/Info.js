import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import axios from 'axios';
import moment from 'moment';
import Image1 from '../../../assets/images/favicon.png';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation } from '@react-navigation/native';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setAnnouncements } from '../../redux/slices/announcementsSlice.js';
import { setUsers } from '../../redux/slices/usersSlice.js';
import { setMinutesArchive } from '../../redux/slices/minutesArchiveSlice.js';
import { setEvents } from '../../redux/slices/eventsSlice.js';
import MemberCard from '../../components/MemberCard/MemberCard.jsx';
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard.jsx';
import EventCard from '../../components/EventCard/EventCard.jsx';
import MinutesCard from '../../components/MinutesCard/MinutesCard.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const Info = () => {
    const serverURL = useSelector((state) => state.serverURL);
    const colors = useSelector((state) => state.colors);
    const users = useSelector((state) => state.users);
    const announcements = useSelector((state) => state.announcements);
    const events = useSelector((state) => state.events);
    const minutesArchive = useSelector((state) => state.minutesArchive);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    //fetct users
    const fetchUsers = async () => {
        try {
            dispatch(setLoadingInfo('Fetching info.'));
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/users`);
            if (response && response.status === 200) {
                dispatch(setUsers(response.data));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }
            console.error(error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    //fetch announcements
    const fetchAnnouncements = async () => {
        try {
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
            console.error(error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    //fetch events
    const fetchEvents = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/events`);
            if (response && response.status === 200) {
                dispatch(setEvents(response.data));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }
            console.error(error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    //fetch minutes archive
    const fetchMinutesArchive = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/minutes-archive`);
            if (response && response.status === 200) {
                dispatch(setMinutesArchive(response.data));
            }
        } catch (error) {
            if (error?.response?.data?.message) {
                dispatch(setFailure(error.response.data.message));
                setTimeout(() => {
                    dispatch(setFailure(''));
                }, 5000);
            }
            console.error(error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (users.length === 0) {
            fetchUsers();
        }

        if (announcements.length === 0) {
            fetchAnnouncements();
        }

        if (events.length === 0) {
            fetchEvents();
        }

        if (minutesArchive.length === 0) {
            fetchMinutesArchive();
        }
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Info'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                {/* announcements */}
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive, marginBottom: SIZES.five }}>Recent Announcements</Text>
                    {announcements && announcements.length ? (
                        [...announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2).map((announcement, index) => (
                            <View key={announcement._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                <AnnouncementCard title={announcement.title} body={announcement.body} postDate={moment(announcement.createdAt).format('MMMM D, YYYY')} action={() => { navigation.navigate('announcement', { id: announcement._id }) }} />
                            </View>
                        ))
                    ) : (
                        <Text>No Recent Announcements</Text>
                    )}
                </View>

                {/* events */}
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive, marginBottom: SIZES.five }}>Recent Events</Text>
                    {events && events.length ? (
                        [...events].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2).map((event, index) => (
                            <View key={event._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                <EventCard title={event.title} body={event.body} postDate={moment(event.createdAt).format('MMMM D, YYYY')} action={() => { navigation.navigate('event', { id: event._id }) }} />
                            </View>
                        ))
                    ) : (
                        <Text>No Recent Events.</Text>
                    )}
                </View>

                {/* minutes archive */}
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive, marginBottom: SIZES.five }}>Recent Minutes Archive</Text>
                    {minutesArchive && minutesArchive.length ? (
                        [...minutesArchive].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 2).map((minutes, index) => (
                            <View key={minutes._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                    <MinutesCard title={minutes.title} body={minutes.body} postDate={moment(minutes.createdAt).format('MMMM D, YYYY')} action={() => { navigation.navigate('minutes', { id: minutes._id })}}/>
                            </View>
                        ))
                    ) : (
                        <Text>No Recent Minutes</Text>
                    )}
                </View>

                {/* members */}
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.twentyFive }}>Members</Text>
                    {users && users.length ?
                        users.map((user, index) => (
                            <MemberCard key={user._id || index} image={user.photo} memberName={user.firstname + ' ' + user.lastname} role={user.role || 'No role assigned yet'} action={() => {navigation.navigate("admin-user", { id: user._id })}}/>
                        ))
                        : null}
                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Info;