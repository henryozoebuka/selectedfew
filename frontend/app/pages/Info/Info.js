import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import { BUTTON, BUTTONTEXT, COLORS, PLACEHOLDERCOLOR, TEXTINPUT, SIZES, FONT } from '../../styles/styles.js';
import { useNavigation } from '@react-navigation/native';
import Image1 from '../../../assets/images/favicon.png';
import Footer from '../../components/Footer/Footer.jsx';

const Info = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <View style={{width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty}}>
                    <Text style={{ color: COLORS.textPrimary, fontSize: FONT.twenty, marginBottom: SIZES.five }}>Announcements</Text>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: COLORS.textPrimary }}>Heading of the Announcement</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Date:</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: COLORS.textPrimary }}>Heading of the Announcement</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Date:</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty}}>
                    <Text style={{ color: COLORS.textPrimary, fontSize: FONT.twenty, marginBottom: SIZES.five }}>Events</Text>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: COLORS.textPrimary }}>Heading of the Event</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Date:</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five }}>
                            <Text style={{ color: COLORS.textPrimary }}>Heading of the Event</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Date:</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Location:</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty}}>
                    <Text style={{ color: COLORS.textPrimary, fontSize: FONT.twenty, marginBottom: SIZES.five }}>Members Profile</Text>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: COLORS.textPrimary, borderWidth: SIZES.two,}} resizeMode="contain" alt='image'/>
                            <View>
                            <Text style={{ color: COLORS.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Role:</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: COLORS.textPrimary, borderWidth: SIZES.two,}} resizeMode="contain" alt='image'/>
                            <View>
                            <Text style={{ color: COLORS.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Role:</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: COLORS.textPrimary, borderWidth: SIZES.two,}} resizeMode="contain" alt='image'/>
                            <View>
                            <Text style={{ color: COLORS.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Role:</Text>
                            </View>
                        </View>
                    </Pressable>
                    <Pressable style={{ backgroundColor: COLORS.lightBackgroundColor, borderRadius: SIZES.ten, marginBottom: SIZES.ten }}>
                        <View style={{ width: '90%', alignSelf: 'center', marginVertical: SIZES.five, display: 'flex', alignItems: 'center', flexDirection: 'row', gap: SIZES.ten }}>
                            <Image source={Image1} style={{height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: COLORS.textPrimary, borderWidth: SIZES.two,}} resizeMode="contain" alt='image'/>
                            <View>
                            <Text style={{ color: COLORS.textPrimary, fontSize: FONT.fifteen }}>Member's Name</Text>
                            <Text style={{ color: COLORS.textPrimary }}>Role:</Text>
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