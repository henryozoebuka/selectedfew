import { Text, View, ScrollView } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Image1 from '../../../assets/images/favicon.png';
import Footer from '../../components/Footer/Footer.jsx';
import MemberCard from '../../components/MemberCard/MemberCard.jsx';

const Users = () => {
    const colors = useSelector((state) => state.colors);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.thirty }}>Members</Text>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <MemberCard image={Image1} memberName={'Henry Onyeoma'} role={'Chair Person'} imageAlt={'image title'} />
                    <MemberCard image={Image1} memberName={'Ubachuchukwu Udo'} role={'Secretary'} imageAlt={'image title'} />
                    <MemberCard image={Image1} memberName={'Henry Onyeoma'} role={'Chair Person'} imageAlt={'image title'} />
                    <MemberCard image={Image1} memberName={'Ubachuchukwu Udo'} role={'Secretary'} imageAlt={'image title'} />
                    <MemberCard image={Image1} memberName={'Henry Onyeoma'} role={'Chair Person'} imageAlt={'image title'} />
                    <MemberCard image={Image1} memberName={'Ubachuchukwu Udo'} role={'Secretary'} imageAlt={'image title'} />
                    <MemberCard image={Image1} memberName={'Henry Onyeoma'} role={'Chair Person'} imageAlt={'image title'} />
                    <MemberCard image={Image1} memberName={'Ubachuchukwu Udo'} role={'Secretary'} imageAlt={'image title'} />
                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Users;