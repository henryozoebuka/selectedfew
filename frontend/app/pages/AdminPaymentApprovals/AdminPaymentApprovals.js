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
import { setPaymentApprovals } from '../../redux/slices/paymentApprovalsSlice.js';
import { setLoadingInfo } from '../../redux/slices/loadingInfoSlice.js';

const AdminPaymentApprovals = () => {
  const colors = useSelector((state) => state.colors);
  const serverURL = useSelector((state) => state.serverURL);
  const paymentApprovals = useSelector((state) => state.paymentApprovals);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Fetch announcements
  const fetchPaymentApprovals = async () => {
    try {
      dispatch(setLoadingInfo('Fetching payments'));
      dispatch(setLoading(true));
      const response = await axios.get(`${serverURL}/payment-approvals`);
      if (response && response.status === 200) {
        dispatch(setPaymentApprovals(response.data));
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

      <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
        <Text style={{ width: '90%', color: colors.textPrimary, fontSize: FONT.thirty, marginBottom: SIZES.twenty }}>Manage Payment Approvals</Text>
        <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
          {paymentApprovals && paymentApprovals.length ? (
            [...paymentApprovals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((paymentApproval, index) => (
              <Pressable onPress={() => { navigation.navigate('admin-payment-approval', { id: paymentApproval._id }) }} key={paymentApproval._id || index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.twenty, paddingHorizontal: SIZES.five, borderWidth: SIZES.one, borderColor: colors.textPrimary }}>
                <View style={{ alignSelf: 'center', marginVertical: SIZES.five }}>
                  <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen, fontWeight: 'bold' }}>{paymentApproval.sender.firstname + " " + paymentApproval.sender.lastname}</Text>
                  <Text style={{ color: colors.textPrimary, flexWrap: 'wrap' }}>₦ {paymentApproval?.amount?.toLocaleString()}</Text>
                </View>
                {paymentApproval && paymentApproval.approved ? <Text style={{paddingHorizontal: SIZES.five, backgroundColor: colors.lightGreen, borderRadius: SIZES.five,}}>Approved</Text>: <Text style={{paddingHorizontal: SIZES.five, backgroundColor: colors.lightRed, borderRadius: SIZES.five,}}>Not Approved Yet</Text> }
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

export default AdminPaymentApprovals;