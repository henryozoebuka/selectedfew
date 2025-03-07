import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import { setMinutesArchive } from '../../redux/slices/minutesArchiveSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import MinutesCard from '../../components/MinutesCard/MinutesCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const MinutesArchive = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const minutesArchive = useSelector((state) => state.minutesArchive);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected minutes archive
    const [selectedMinutesArchive, setSelectedMinutesArchive] = useState([]);

    // Fetch minutes archive
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
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        fetchMinutesArchive();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Minutes Archive'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {minutesArchive && minutesArchive.length ? (
                        [...minutesArchive].filter(prev => prev.published === true).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((minutes, index) => (
                            <View key={minutes._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
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

export default MinutesArchive;