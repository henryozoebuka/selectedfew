import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Image1 from '../../../assets/images/favicon.png';
import Footer from '../../components/Footer/Footer.jsx';

const Info = () => {
    const colors = useSelector((state) => state.colors);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.twenty, marginBottom: SIZES.five }}>Announcements</Text>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: colors.textPrimary }}>Heading of the Announcement</Text>
                            <Text style={{ color: colors.textPrimary }}>Date:</Text>
                            <Text style={{ color: colors.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: colors.textPrimary }}>Heading of the Announcement</Text>
                            <Text style={{ color: colors.textPrimary }}>Date:</Text>
                            <Text style={{ color: colors.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.twenty, marginBottom: SIZES.five }}>Events</Text>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: colors.textPrimary }}>Heading of the Event</Text>
                            <Text style={{ color: colors.textPrimary }}>Date:</Text>
                            <Text style={{ color: colors.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: colors.textPrimary }}>Heading of the Event</Text>
                            <Text style={{ color: colors.textPrimary }}>Date:</Text>
                            <Text style={{ color: colors.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <Text style={{ color: colors.textPrimary, fontSize: FONT.twenty, marginBottom: SIZES.five }}>Members Profile</Text>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{ height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" alt='image' />
                            <View>
                                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                                <Text style={{ color: colors.textPrimary }}>Role:</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{ height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" alt='image' />
                            <View>
                                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                                <Text style={{ color: colors.textPrimary }}>Role:</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{ height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" alt='image' />
                            <View>
                                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                                <Text style={{ color: colors.textPrimary }}>Role:</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: colors.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{ height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" alt='image' />
                            <View>
                                <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                                <Text style={{ color: colors.textPrimary }}>Role:</Text>
                            </View>
                        </View>
                    </Pressable>

                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Info;