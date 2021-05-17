import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { Notification, Settings } from '../../components/icons';
import NotificationsScreen from './notifications';
import SettingsScreen from './settings';


const Stack = createStackNavigator();

function ImageBox({ style }) {
    return (
        <TouchableOpacity style={{ ...style, ...styles.imageBox }}>
            <Image style={styles.image} source={require('../../icons/photo.png')} />
        </TouchableOpacity>
    )
}

function Main({ navigation }) {
    return (
        <>
            <View style={styles.header} >
                <Image style={styles.profile} source={require('../../icons/woman.png')} />
                <View style={styles.rightSection}>
                    <View style={styles.firstRow} >
                        <Text style={styles.name}>Özge Yılmaz</Text>
                        <TouchableOpacity style={styles.notification} onPress={() => navigation.navigate('Notifications')} >
                            <Notification />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('Settings')} ><Settings /></TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Ümraniye Temsilcisi</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} >
                <View style={{ flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View>
                <View style={{ marginTop: 2.5, flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View>
                {/* <View style={{ marginTop: 2.5, flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View>
                <View style={{ marginTop: 2.5, flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View> */}
            </ScrollView>

        </>
    )
}

function ProfileScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='Notifications' component={NotificationsScreen} />
            <Stack.Screen name='Settings' component={SettingsScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    imageBox: {
        width: '33%'
    },
    header: {
        marginTop: 50,
        marginLeft: 15,
        flexDirection: 'row'
    },
    profile: {
        width: 51,
        height: 51
    },
    rightSection: {
        marginHorizontal: 15
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row'
    },
    name: {
        fontFamily: 'SFProText-Bold',
        fontSize: 24,
        color: '#0A151F',
        flexDirection: 'row'
    },
    notification: {
        marginTop: 5,
        marginLeft: 50,
        marginRight: 10
    },
    settings: {
        marginTop: 5
    },
    title: {
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 12,
        color: '#0A151F'
    },
    scrollView: {
        marginTop: 15
    }
});

export default ProfileScreen;