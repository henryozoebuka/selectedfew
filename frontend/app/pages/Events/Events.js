import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import { setEvents } from '../../redux/slices/eventsSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import EventCard from '../../components/EventCard/EventCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const Events = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const events = useSelector((state) => state.events);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected announcements
    const [selectedEvents, setSelectedEvents] = useState([]);
    
    // Fetch announcements
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
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Events'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {events && events.length ? (
                        [...events].filter(prev => prev.published === true).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((event, index) => (
                            <View key={event._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                <EventCard title={event.title} body={event.body} action={() => { navigation.navigate('event', { id: event._id }) }} />
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

export default Events;