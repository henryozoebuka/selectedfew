import { Text, View, ScrollView } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import Image1 from '../../../assets/images/icon.png';
import { useNavigation } from '@react-navigation/native';
import EventCard from '../../components/EventCard/EventCard.jsx';

const Events = () => {
    const colors = useSelector((state) => state.colors);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.thirty }}>Events</Text>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <EventCard title={'First outing of the year. We must go for the best.'} image={Image1} body={'There will be an outing for the first quarter of the year. There will be an outing for the first quarter of the year. There will be an outing for the first quarter of the year.'}  />
                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Events;