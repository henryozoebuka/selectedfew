import { Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import { setConstitutions } from '../../redux/slices/constitutionsSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import ConstitutionCard from '../../components/ConstitutionCard/ConstitutionCard.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const Constitutions = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const constitutions = useSelector((state) => state.constitutions);
    const navigation = useNavigation();
    const dispatch = useDispatch();


    // Fetch constitutions
    const fetchConstitutions = async () => {
        try {
            dispatch(setLoadingInfo('Fetching constitutions.'));
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/constitutions`);
            if (response && response.status === 200) {
                dispatch(setConstitutions(response.data));
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
        fetchConstitutions();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'constitutions'} />
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {constitutions && constitutions.length ? (
                        [...constitutions].filter(prev => prev.published === true).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((constitution, index) => (
                            <View key={constitution._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                    <constitutionCard title={constitution.title} body={constitution.body} postDate={constitution.createdAt} action={() => { navigation.navigate('constitution', { id: constitution._id })}}/>
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

export default Constitutions;