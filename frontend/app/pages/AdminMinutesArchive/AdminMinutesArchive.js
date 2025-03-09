import { Pressable } from 'react-native';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SIZES, FONT } from '../../styles/styles.js';
import { setMinutesArchive } from '../../redux/slices/minutesArchiveSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import MinutesCard from '../../components/MinutesCard/MinutesCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setSuccess } from '../../redux/slices/successSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import Checkbox from 'expo-checkbox';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import moment from 'moment';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const AdminMinutesArchive = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const minutesArchive = useSelector((state) => state.minutesArchive);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected minutes archive
    const [selectedMinutesArchive, setSelectedMinutesArchive] = useState([]);
    const [modal, setModal] = useState(false);

    // Fetch minutes archive
    const fetchMinutesArchive = async () => {
        try {
            dispatch(setLoadingInfo('Fetching minutes archive.'));
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
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Delete announcements
    const deletedMinutesArchive = async () => {
        try {
            dispatch(setLoadingInfo('Deleting minutes archive'));
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-minutes-archive`, {data: {minutesArchive: selectedMinutesArchive}});
        if (response && response.status === 200) {
            setSelectedMinutesArchive([]);
            const currentMinutesArchive = minutesArchive.filter(prev => !selectedMinutesArchive.includes(prev._id));
            dispatch(setMinutesArchive(currentMinutesArchive));
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
        fetchMinutesArchive();
    }, []);

    

    // Toggle selection
    const toggleSelection = (id) => {
        if (selectedMinutesArchive.includes(id)) {
            setSelectedMinutesArchive(selectedMinutesArchive.filter(item => item !== id));
        } else {
            setSelectedMinutesArchive([...selectedMinutesArchive, id]);
        }
    };

    // Toggle delete modal
    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    if (modal) {
        return <ConfirmationModal displayModal={() => {modal();} } question={'Are you sure that you want to delete these minutes records?'} toggle={() => {toggleDeleteModal();}} action={() => { deletedMinutesArchive();}}/>
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Manage Minutes Archive'} />
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', width: '90%', marginTop: SIZES.twenty}}>
                <SecondButton title={'Add Minutes'} bold={'bold'} action={() => { navigation.navigate('add-minutes'); }} />
                <Pressable disabled={selectedMinutesArchive.length ? false : true} onPress={() => { toggleDeleteModal(); }}>
                    <MaterialIcons name="delete" size={SIZES.thirty} color={selectedMinutesArchive.length ? colors.textPrimary : colors.lightBackgroundColor} />
                </Pressable>
            </View>

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {minutesArchive && minutesArchive.length ? (
                        [...minutesArchive].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((minutes, index) => (
                            <View key={minutes._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                <Checkbox
                                    value={selectedMinutesArchive.includes(minutes._id)}
                                    onValueChange={() => toggleSelection(minutes._id)}
                                />
                                    <MinutesCard title={minutes.title} body={minutes.body} postDate={moment(minutes.createdAt).format('MMMM D, YYYY')} action={() => { navigation.navigate('minutes', { id: minutes._id })}}/>
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

export default AdminMinutesArchive;