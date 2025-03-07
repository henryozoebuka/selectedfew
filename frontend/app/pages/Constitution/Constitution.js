import { Text, View, ScrollView } from 'react-native'
import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation } from '@react-navigation/native';
import { setConstitution } from '../../redux/slices/constitutionSlice.js';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import moment from 'moment';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import axios from 'axios';
import { setFailure } from '../../redux/slices/failureSlice.js';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';

const Constitution = () => {
    const colors = useSelector((state) => state.colors);
    const user = useSelector((state) => state.user);
    const serverURL = useSelector((state) => state.serverURL);
    const constitution = useSelector((state) => state.constitution);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //fetch constitution
    const fetchConstitution = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/constitution`);
            if (response && response.status === 200) {
                dispatch(setConstitution(response.data));
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
        fetchConstitution();
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Constitution'} />
            <View style={{ display: 'flex', maxWidth: 500, flexDirection: 'row', width: '90%', justifyContent: 'space-between', marginTop: SIZES.twenty }}>
                <View style={{ flexDirection: 'row', columnGap: SIZES.twenty, justifyContent: 'flex-end', width: '100%' }}>
                    {
                        (user?.role === 'chairman' || user?.role === 'secretary') &&
                        <FontAwesome name="edit" size={SIZES.twentyFive} color={colors.textPrimary} onPress={() => { navigation.navigate('edit-constitution') }} />
                    }
                </View>
            </View>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', columnGap: SIZES.twenty, marginBottom: SIZES.twenty }}>
                    <Entypo name="user" size={24} color={colors.textPrimary} />
                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Posted by:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{constitution.author?.firstname + " " + constitution.author?.lastname}</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>On:  </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(constitution.createdAt).format('MMMM D, YYYY')}</Text>
                        </View>

                        {
                            constitution && constitution.updatedAt &&
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: FONT.ten, color: colors.textPrimary }}>Last edited on:  </Text>
                                <Text style={{ fontWeight: 'bold', fontSize: FONT.ten, color: colors.date }}>{moment(constitution.updatedAt).format('MMMM D, YYYY')}</Text>
                            </View>
                        }
                    </View>
                </View>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary, fontSize: FONT.twenty, fontWeight: 'bold', marginBottom: SIZES.ten }}>{constitution && constitution.title}</Text>
                <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                <Text style={{ fontSize: SIZES.twenty, color: colors.textPrimary }}>{constitution && constitution.body}</Text>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Constitution;