import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setMinutes } from '../../redux/slices/minutesSlice.js';
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

const Minutes = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const serverURL = useSelector((state) => state.serverURL);
    const minutes = useSelector((state) => state.minutes);
    const minutesArchive = useSelector((state) => state.minutesArchive);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params;

    const [modal, setModal] = useState(false);

    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    // Delete minutes
    const deleteMinutes = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-minutes`, { data: { minutes: minutes._id } })
            if (response && response.status === 200) {
                dispatch(setSuccess(response.data.message));
                navigation.navigate('minutes-archive');
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
        if (minutesArchive) {
            const individualMinutes = minutesArchive.find(item => item._id === id);
            if (individualMinutes) {
                dispatch(setMinutes(individualMinutes));
            }
        }
    }, [minutesArchive])

    if (modal) {
        return <ConfirmationModal question={'Are you sure that you want to delete this minutes?'} action={deleteMinutes} displayModal={modal} toggle={() => { toggleDeleteModal(); }} />
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Minutes'} />
            
            <View style={{ display: 'flex', maxWidth: 500, flexDirection: 'row', width: '90%', justifyContent: 'flex-end', marginTop: SIZES.twenty }}>
                {(user?.role === 'chairman' || user?.role === 'secretary') &&
                    <View style={{ flexDirection: 'row', columnGap: SIZES.twenty }}>
                        <MaterialIcons name="delete" size={SIZES.twentyFive} color={colors.textPrimary} onPress={() => { toggleDeleteModal(); }} />
                        <FontAwesome name="edit" size={SIZES.twentyFive} color={colors.textPrimary} onPress={() => { navigation.navigate('edit-minutes') }} />
                    </View>
                }
            </View>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <Entypo name="user" size={24} color={colors.textPrimary} />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Posted by:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{minutes.author?.firstname + " " + minutes.author?.lastname}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>On:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(minutes.createdAt).format('MMMM D, YYYY')}</Text>
                        </View>

                        {
                            minutes && minutes.updatedAt &&
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Last edited on:  </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(minutes.updatedAt).format('MMMM D, YYYY')}</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{minutes && minutes.title}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary }}>{minutes && minutes.body}</Text>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Minutes;