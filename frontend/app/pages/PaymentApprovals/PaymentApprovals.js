import { Pressable } from 'react-native';
import { Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import { setFailure } from '../../redux/slices/failureSlice.js';
import { setLoading } from '../../redux/slices/loadingSlice.js';
import Footer from '../../components/Footer/Footer.jsx';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { setUserPaymentApprovals } from '../../redux/slices/userPaymentApprovalsSlice.js';
import PageTitle from '../../components/PageTitle/PageTitle.jsx';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const PaymentApprovals = () => {
  const colors = useSelector((state) => state.colors);
  const user = useSelector((state) => state.user);
  const serverURL = useSelector((state) => state.serverURL);
  const userPaymentApprovals = useSelector((state) => state.userPaymentApprovals);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Fetch announcements
  const fetchPaymentApprovals = async () => {
    const id = user._id;
    try {
      dispatch(setLoadingInfo('Fetching payment approvals.'));
      dispatch(setLoading(true));
      dispatch(setUserPaymentApprovals([]));
      const response = await axios.get(`${serverURL}/user-payment-approvals`, {params: {id: id}});
      
      if (response && response.status === 200) {
        dispatch(setUserPaymentApprovals(response.data));
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

    fetchPaymentApprovals();
  }, []);



  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PageTitle name={'Payment Approvals'} />
      <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
        <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
          {userPaymentApprovals && userPaymentApprovals.length ? (
            [...userPaymentApprovals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((userPaymentApproval, index) => (
              <Pressable onPress={() => { navigation.navigate('payment-approval', { id: userPaymentApproval._id }) }} key={userPaymentApproval._id || index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.twenty, paddingHorizontal: SIZES.five, borderWidth: SIZES.one, borderColor: colors.textPrimary }}>
                <View style={{ alignSelf: 'center', marginVertical: SIZES.five }}>
                  <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, fontWeight: 'bold' }}>{userPaymentApproval.sender?.firstname + " " + userPaymentApproval.sender?.lastname}</Text>
                  <Text style={{ color: colors.textPrimary, flexWrap: 'wrap' }}>₦ {userPaymentApproval?.amount?.toLocaleString()}</Text>
                </View>
                {userPaymentApproval && userPaymentApproval.approved ? <Text style={{paddingHorizontal: SIZES.five, backgroundColor: colors.lightGreen, borderRadius: SIZES.five,}}>Approved</Text>: <Text style={{paddingHorizontal: SIZES.five, backgroundColor: colors.lightRed, borderRadius: SIZES.five,}}>Not Approved Yet</Text> }
              </Pressable>
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

export default PaymentApprovals;