import { Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SIZES, FONT } from '../../styles/styles.js';
import { setEvents } from '../../redux/slices/eventsSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import EventCard from '../../components/EventCard/EventCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import moment from 'moment';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const AdminEvents = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const events = useSelector((state) => state.events);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected announcements
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [modal, setModal] = useState(false);

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

    // Delete announcements
    const deletedEvents = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-events`, { data: { events: selectedEvents } });
            if (response && response.status === 200) {
                const currentEvents = events.filter(prev => !selectedEvents.includes(prev._id));
                dispatch(setEvents(currentEvents));
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
        fetchEvents();
    }, []);



    // Toggle selection
    const toggleSelection = (id) => {
        if (selectedEvents.includes(id)) {
            setSelectedEvents(selectedEvents.filter(item => item !== id));
        } else {
            setSelectedEvents([...selectedEvents, id]);
        }
    };

    // Toggle delete modal
    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    if (modal) {
        return <ConfirmationModal displayModal={() => { modal(); }} question={'Are you sure that you want to delete these events?'} toggle={() => { toggleDeleteModal(); }} action={() => { deletedEvents(); }} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Manage Events'} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginTop: SIZES.twenty}}>
                <SecondButton title={'Add Event'} bold={'bold'} action={() => { navigation.navigate('add-event'); }} />
                <Pressable disabled={selectedEvents.length ? false : true} onPress={() => { toggleDeleteModal(); }}>
                    <MaterialIcons name="delete" size={SIZES.thirty} color={selectedEvents.length ? colors.textPrimary : colors.lightBackgroundColor} />
                </Pressable>
            </View>

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {events && events.length ? (
                        [...events].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((event, index) => (
                            <View key={event._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>

                                <Checkbox
                                    value={selectedEvents.includes(event._id)}
                                    onValueChange={() => toggleSelection(event._id)}
                                />

                                <EventCard title={event.title} postDate={moment(event.createdAt).format('MMMM D, YYYY')} body={event.body} action={() => { navigation.navigate('event', { id: event._id }) }} />
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

export default AdminEvents;