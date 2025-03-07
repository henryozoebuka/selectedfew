import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setEvent } from '../../redux/slices/eventSlice.js';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import moment from 'moment';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const Event = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const serverURL = useSelector((state) => state.serverURL);
    const event = useSelector((state) => state.event);
    const events = useSelector((state) => state.events);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [modal, setModal] = useState(false);

    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    // Delete event
    const deleteEvent = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-event`, { data: { event: event._id } })
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                navigation.navigate('events');
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
        if (events) {
            const individualEvent = events.find(item => item._id === id);
            if (individualEvent) {
                dispatch(setEvent(individualEvent));
            }
        }
    }, [events])

    if (modal) {
        return <ConfirmationModal question={'Are you sure that you want to delete this event?'} action={deleteEvent} displayModal={modal} toggle={() => { toggleDeleteModal(); }} />
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Event'} />
            <View style={{ display: 'flex', maxWidth: 500, flexDirection: 'row', width: '90%', justifyContent: 'flex-end', marginTop: SIZES.twenty }}>
                {(user?.role === 'chairman' || user?.role === 'secretary') &&
                    <View style={{ flexDirection: 'row', columnGap: SIZES.twenty }}>
                        <MaterialIcons name="delete" size={SIZES.twentyFive} color={colors.textPrimary} onPress={() => { toggleDeleteModal(); }} />
                        <FontAwesome name="edit" size={SIZES.twentyFive} color={colors.textPrimary} onPress={() => { navigation.navigate('edit-event') }} />
                    </View>
                }
            </View>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <Entypo name="user" size={24} color={colors.textPrimary} />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Posted by:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{event.author?.firstname + " " + event.author?.lastname}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>On:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(event.createdAt).format('MMMM D, YYYY')}</Text>
                        </View>

                        {
                            event && event.updatedAt &&
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Last edited on:  </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(event.updatedAt).format('MMMM D, YYYY')}</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{event && event.title}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary }}>{event && event.body}</Text>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Event;