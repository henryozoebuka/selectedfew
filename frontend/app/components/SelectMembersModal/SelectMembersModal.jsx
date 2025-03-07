import { Pressable, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { SIZES, FONT } from '../../styles/styles.js';
import Checkbox from 'expo-checkbox';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import Button from '../Button/Button.jsx';

const SelectMembersModal = ({ members, toggleSelection, toggleShowMembers, selectedmembers, selectAll }) => {
    const colors = useSelector((state) => state.colors)
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, backgroundColor: colors.modalBackgroundColor, justifyContent: 'center' }}>
            <View style={{ backgroundColor: colors.backgroundColor, width: '90%', alignSelf: 'center', marginTop: SIZES.fifty, borderRadius: SIZES.ten }}>
                <View style={{ margin: SIZES.ten, maxHeight: '80%' }}>
                    <AntDesign name="close" size={SIZES.twenty} color={colors.backgroundColor} style={{ alignSelf: 'flex-end', backgroundColor: colors.textPrimary, marginBottom: SIZES.twenty }} onPress={toggleShowMembers} />
                    <Pressable onPress={() => { selectAll(true) }} style={{ flexDirection: 'row', columnGap: SIZES.ten, marginBottom: SIZES.ten, borderStyle: 'dotted', borderWidth: SIZES.one, borderColor: colors.textPrimary, borderRadius: SIZES.five }}>
                        <Text style={{ color: colors.textSecondary, fontSize: FONT.twenty, marginBottom: 5 }}>Select All</Text>
                    </Pressable>
                    
                        <View style={{minHeight: SIZES.threeHundred, maxHeight: SIZES.fourHundred, marginBottom: SIZES.ten}}>
                        <ScrollView>
                    {members && members.length ? (
                        [...members].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((member, index) => (
                            <View key={member._id || index} style={{ width: '100%', flexDirection: 'row', columnGap: SIZES.ten, alignItems: 'center', marginBottom: 10, }}>

                                <Checkbox
                                    value={selectedmembers.includes(member._id)}
                                    onValueChange={() => toggleSelection(member._id)}
                                />
                                <Text style={{ color: colors.textPrimary }}>{member.firstname + " " + member.lastname}</Text>
                            </View>
                        ))
                    ) : (
                        <Text>Null</Text>
                    )}
                    </ScrollView>
                    </View>

                    <Button action={toggleShowMembers} title={'Ok'} />
                </View>

            </View>
        </View>
    )
}

export default SelectMembersModal;