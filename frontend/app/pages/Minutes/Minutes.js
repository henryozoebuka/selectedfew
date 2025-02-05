import { Text, View, Pressable, ScrollView } from 'react-native'
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles.js';
import Footer from '../../components/Footer/Footer.jsx';

const Minutes = () => {
    const colors = useSelector((state) => state.colors);

    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ width: '90%', maxWidth: 500, marginVertical: SIZES.twenty }}>
                <Text style={{fontSize: SIZES.twenty, color: colors.textPrimary}}>Minutes Heading</Text>
                <Text style={{fontSize: SIZES.twenty, color: colors.textPrimary}}>Minutes Body
                  I don't know of it will work well like this.

                  Then men.
                </Text>
            </ScrollView>
            <Footer />
        </View >
    )
}

export default Minutes;