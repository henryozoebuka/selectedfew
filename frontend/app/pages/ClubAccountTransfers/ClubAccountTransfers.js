import { Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SIZES, FONT } from '../../styles/styles.js';
import { setClubTransfers } from '../../redux/slices/clubTransfersSlice.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { setSuccess } from '../../redux/slices/successSlice.js';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal.jsx';
import SecondButton from '../../components/SecondButton/SecondButton.jsx';
import moment from 'moment';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const ClubAccountTransfers = () => {
    const colors = useSelector((state) => state.colors);
    const serverURL = useSelector((state) => state.serverURL);
    const clubTransfers = useSelector((state) => state.clubTransfers);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // State to track selected announcements
    const [selectedAccountTransfers, setselectedAccountTransfers] = useState([]);
    const [modal, setModal] = useState(false);

    // Fetch announcements
    const fetchAccountTransfers = async () => {
        try {
            dispatch(setLoadingInfo('Fetching transfers.'));
            dispatch(setLoading(true));
            const response = await axios.get(`${serverURL}/club-fund-transfers`);
            if (response && response.status === 200) {
                dispatch(setClubTransfers(response.data))
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
    const deleteClubTransfers = async () => {
        try {
            dispatch(setLoadingInfo('Deleting transfer(s).'));
            dispatch(setLoading(true));
            const response = await axios.delete(`${serverURL}/delete-club-transfers`, { data: { clubTransfers: selectedAccountTransfers } });
            if (response && response.status === 200) {
                const currentClubTransfers = clubTransfers.filter(prev => !selectedAccountTransfers.includes(prev._id));
                dispatch(setClubTransfers(currentClubTransfers));
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
        fetchAccountTransfers();
    }, [selectedAccountTransfers]);

    // Toggle selection
    const toggleSelection = (id) => {
        if (selectedAccountTransfers.includes(id)) {
            setselectedAccountTransfers(selectedAccountTransfers.filter(item => item !== id));
        } else {
            setselectedAccountTransfers([...selectedAccountTransfers, id]);
        }
    };

    // Toggle delete modal
    const toggleDeleteModal = () => {
        setModal(!modal);
    }

    if (modal) {
        return <ConfirmationModal displayModal={() => { modal(); }} question={'Are you sure that you want to delete these club transfers?'} toggle={() => { toggleDeleteModal(); }} action={() => { deleteClubTransfers(); }} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PageTitle name={'Manage Club Transfers'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', width: '90%', marginTop: SIZES.twenty }}>
                <SecondButton title={'Club Account Transfer'} bold={'bold'} action={() => { navigation.navigate('club-account-transfer'); }} />
                {/* <Pressable disabled={selectedAccountTransfers.length ? false : true} onPress={() => { toggleDeleteModal(); }}>
                    <MaterialIcons name="delete" size={SIZES.thirty} color={selectedAccountTransfers.length ? colors.textPrimary : colors.lightBackgroundColor} />
                </Pressable> */}
            </View>

            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    {clubTransfers && clubTransfers.length ? (
                        [...clubTransfers].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((clubTransfer, index) => (
                            <View key={clubTransfer._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10 }}>
                                <Pressable style={{ flex: 1, backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten, borderWidth: SIZES.one, borderColor: colors.textPrimary }} onPress={() => { navigation.navigate('approve-club-transfer', { id: clubTransfer._id }) }}>
                                    <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten, marginBottom: SIZES.ten }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, fontWeight: 'bold', marginBottom: SIZES.ten }}>{clubTransfer.description.length > 25 ? clubTransfer.description.slice(0, 25) + '...' : clubTransfer.description}</Text>
                                            <View style={{ flexDirection: 'row', columnGap: SIZES.five, marginBottom: SIZES.ten }}>
                                                <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>Initiated On:</Text>
                                                <Text style={{ color: colors.textPrimary }}>{moment(clubTransfer.createdAt).format('MMMM D, YYYY')}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', columnGap: SIZES.five, marginBottom: SIZES.ten }}>
                                                <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>By:</Text>
                                                <Text style={{ color: colors.textPrimary }}>{clubTransfer.initiatedBy.firstname + " " + clubTransfer.initiatedBy.firstname}</Text>
                                            </View>


                                            <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                                                <View style={{ minWidth: SIZES.seventy, paddingHorizontal: SIZES.five, backgroundColor: clubTransfer.approved ? colors.lightGreen : colors.lightRed, borderRadius: SIZES.five }}>
                                                    <Text>{clubTransfer.approved ? 'Approved' : 'Not Approved'}</Text>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </Pressable>
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

export default ClubAccountTransfers;