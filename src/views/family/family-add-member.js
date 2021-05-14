import * as React from 'react';

import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

import NavBar from '../../components/nav-bar';
import Input from '../../components/input';
import Select from '../../components/select';
import { Plus } from '../../components/icons';

function FamilyAddMemberScreen() {
    return (
        <View style={styles.container}>
            <NavBar title='Aile Üyesi Ekle' />
            <ScrollView>
                <Input style={styles.input} placeholder='İsim' />
                <Input style={styles.input} placeholder='Kimlik Numarası' />
                <Select style={styles.input} placeholder='Cinsiyet' />
                <Input style={styles.input} placeholder='Akrabalık Derecesi' />
                <Input style={styles.input} placeholder='Doğum Yılı' />
                <Input style={styles.input} placeholder='Gelir' />
                <Input style={styles.input} placeholder='Meslek' />
                <Input style={styles.input} placeholder='Beden' />
                <Input style={styles.input} placeholder='Hastalık / Engel' />
                <Input style={styles.input} placeholder='Okul' />
                <Input style={styles.input} placeholder='Sınıf' />
                <Input style={styles.input} placeholder='Not' />
                <TouchableOpacity style={styles.button} ><Plus style={styles.buttonIcon} /><Text style={styles.buttonText}>Ekle</Text></TouchableOpacity>
                <View style={styles.empty} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
        height: '100%',
    },

    input: {
        marginTop: 10,
        marginHorizontal: 15,
    },
    empty: {
        height: 25,
    },
    button: {
        marginTop: 10,
        marginHorizontal: 15,
        backgroundColor: '#E11E3C',
        width: '40%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 12.5,
        alignSelf: 'center'
    },
    buttonIcon: {
        marginTop: 2
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        marginLeft: 5
    }



})

export default FamilyAddMemberScreen;