import { ScrollView, Text, TextInput, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { SIZES } from '../../styles/styles';
import Button from '../../components/Button/Button.jsx';

const AddEvent = () => {

    const colors = useSelector((state) => state.colors);
    const textInput = useSelector((state) => state.textInput);
    return (
        <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
            <ScrollView style={{width: '90%', alignSelf: 'center', marginTop: SIZES.twenty}}>
                <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>Post Event</Text>
                <TextInput  multiline={true} numberOfLines={50} style={[textInput, {textAlignVertical: 'top', minHeight: SIZES.twoHundred, marginTop: SIZES.twenty}]}/>
                <Button title={'Post'} />
            </ScrollView>
        </View>
    )
}

export default AddEvent;