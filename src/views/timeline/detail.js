import * as React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';

import { Phone } from '../../components/icons';

function About() {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/logo/logo-detail.png')} />
            <Text style={styles.aboutText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate dapibus diam at gravida. Donec vitae quam sollicitudin, vehicula ante et, gravida nisi. Proin sed aliquet sem, at blandit nisl. Quisque a velit id ipsum egestas laoreet.</Text>
        </ View>
    )
};

function Address({ title, desc }) {
    return (
        <View style={styles.address}>
            <Text style={styles.addressTitle}>{title}</Text>
            <Text style={styles.addressDesc}>Talatpaşa, Aydoğan Cd. No 11 B, 34400 Kâğıthane/İstanbul</Text>
        </View>
    )
}

function Contact() {
    return (
        <View style={{ ...styles.container, marginLeft: 15 }}>
            <View style={styles.phone}>
                <Phone fill='#E11E3C' />
                <Text style={styles.phoneNumber}>+90 412 457 52 00</Text>
            </View>

            <View >
                <Address title='Kağıthane Temsilciliği' />
                <Address title='Ümraniye Temsilciliği' />
                <Address title='Kartal Temsilciliği' />
                <Address title='Sultanbeyli Temsilciliği' />
            </View>
        </ View >
    )
};


function Detail() {
    return (
        <ScrollView>
            <About />
            <Contact />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        paddingBottom: 50,
        borderBottomWidth: 0.2,
        borderColor: '#EEF0F2',
    },
    image: {
        width: '40%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center'
    },
    aboutText: {
        color: '#33414C',
        fontFamily: 'SFProText-Medium',
        fontSize: 14,
        marginTop: 15,
        marginHorizontal: 30,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#E8EAED'
    },
    addressTitle: {
        color: '#183148',
        fontSize: 18,
        fontFamily: 'SFProText-Bold'
    },
    addressDesc: {
        width: '90%',
        color: '#758291',
        fontSize: 14,
        fontFamily: 'SFProText-Medium'
    },
    address: {
        marginTop: 10
    },
    phone: {
        paddingBottom: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderColor: '#EEF0F2'
    },
    phoneNumber: {
        marginLeft: 10,
        color: '#758291',
        fontFamily: 'SFProText-Bold',
        fontSize: 14
    }
});

export default Detail;