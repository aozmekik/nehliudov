import * as React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Button from '../../components/button';
import NavBar from '../../components/nav-bar';
import { Phone } from '../../components/icons';

function About({ navigation }) {
    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} title='Hakkında' />
            <Image style={styles.image} source={require('../../assets/logo/logo-detail.png')} />
            <Text style={styles.aboutText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate dapibus diam at gravida. Donec vitae quam sollicitudin, vehicula ante et, gravida nisi. Proin sed aliquet sem, at blandit nisl. Quisque a velit id ipsum egestas laoreet.</Text>
        </ View>
    )
};

function Address({ title, desc }) {
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ color: '#183148', fontSize: 18, fontFamily: 'SFProText-Bold' }}>{title}</Text>
            <Text style={{ width: '90%', color: '#758291', fontSize: 14, fontFamily: 'SFProText-Medium' }}>Talatpaşa, Aydoğan Cd. No 11 B, 34400 Kâğıthane/İstanbul</Text>
        </View>
    )
}

function Contact({ navigation }) {
    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} title='İletişim' />
            <View style={{ marginTop: 15, marginLeft: 15, paddingBottom: 15, flexDirection: 'row', borderBottomWidth: 0.2, borderColor: '#EEF0F2' }}>
                <Phone fill='#E11E3C' />
                <Text style={{ marginLeft: 10, color: '#758291', fontFamily: 'SFProText-Bold', fontSize: 14 }}>+90 412 457 52 00</Text>
            </View>

            <View style={{ marginLeft: 15 }}>
                <Address title='Kağıthane Temsilciliği' />
                <Address title='Ümraniye Temsilciliği' />
                <Address title='Kartal Temsilciliği' />
                <Address title='Sultanbeyli Temsilciliği' />
            </View>
        </ View >
    )
};


function Main({ navigation }) {
    return (
        <View style={styles.container} >
            <Image style={styles.image} source={require('../../assets/logo/logo-detail.png')} />
            <Text style={styles.versionText}>v.1.0</Text>
            <Button onPress={() => navigation.navigate('About')} title='Hakkında' big={true} color='#0A151F' style={styles.button} />
            <Button onPress={() => navigation.navigate('Contact')} title='İletişim' big={true} color='#0A151F' style={styles.button} />
        </View >
    );
};

const Stack = createStackNavigator();

function Detail() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='About' component={About} />
            <Stack.Screen name='Contact' component={Contact} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 75
    },
    image: {
        width: '40%',
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center'
    },
    versionText: {
        fontFamily: 'SFProText-Regular',
        fontSize: 12,
        color: '#F3A5B1',
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
    }
});

export default Detail;