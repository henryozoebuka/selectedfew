import { Image, Text, View, Pressable, ScrollView } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES, FONT } from '../../styles/styles.js';
import Image1 from '../../../assets/images/favicon.png';
import Footer from '../../components/Footer/Footer.jsx';
import SwitchButton from '../../components/SwitchButton/SwitchButton.jsx';
import AntDesign from '@expo/vector-icons/AntDesign';

const AdminUser = () => {
    const colors = useSelector((state) => state.colors);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <Text style={{ alignSelf: 'center', color: colors.textPrimary, fontSize: FONT.thirty }}>Welcome, Henry!</Text>
                <View style={{ width: '90%', alignSelf: 'center', marginBottom: SIZES.twenty }}>
                    <View>
                        <Image source={Image1} alt='Henry' style={{ alignSelf: 'center', height: SIZES.eighty, width: SIZES.eighty, borderRadius: 100, borderColor: colors.textPrimary, borderWidth: SIZES.two, }} resizeMode="contain" />
                        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  position: 'absolute', top: '30%', right: '20%', height: SIZES.fourty, width: SIZES.fourty, borderRadius: SIZES.oneHundred, backgroundColor: '#DADADA' }}>
                            <AntDesign name="camerao" size={24} color={colors.textPrimary}/>
                            
                        </View>
                    </View>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, }}>Full Name</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>Henry</Text>
                            <Text style={{ color: colors.textPrimary, textTransform: 'capitalize', fontSize: FONT.twenty }}>Onyeoma</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>
                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, }}>email</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>hintlord@gmail.com</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, }}>gender</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>Male</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, }}>address</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>20A Bright Street, Otako, FCT, Abuja.</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <Text style={{ textTransform: 'uppercase', fontSize: FONT.ten, }}>balance</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', gap: SIZES.ten }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>N50,000</Text>
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                    <View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: SIZES.ten, marginTop: SIZES.twenty }}>
                            <Text style={{ color: colors.textPrimary, fontSize: FONT.fifteen }}>Night Mode</Text>
                            <SwitchButton />
                        </View>
                        <View style={{ height: SIZES.two, width: '100%', backgroundColor: '#EAEAEA', marginBottom: SIZES.ten }}></View>
                    </View>

                </View>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default AdminUser;