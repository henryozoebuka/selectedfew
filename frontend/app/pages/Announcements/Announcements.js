import { Text, View, ScrollView } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';
import AnnouncementCard from '../../components/AnnouncementCard/AnnouncementCard.jsx';
import { useNavigation } from '@react-navigation/native';

const Announcements = () => {
    const colors = useSelector((state) => state.colors);
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <Text style={{ color: colors.textPrimary, fontSize: FONT.thirty }}>Announcements</Text>

                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal. We shall hold a meeting this coming weekend for People'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} />
                    <AnnouncementCard title={'We shall hold a meeting this coming weekend for People'} body={'This is the real deal.'} action={() => {navigation.navigate('announcement');}} />
                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Announcements;