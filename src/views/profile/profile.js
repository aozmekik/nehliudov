import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { Notification, Settings, TwoUser } from '../../components/icons';
import NotificationsScreen from './notifications';
import SettingsScreen from './settings';

import { roles, isManager } from '../../models/user';
import PrivilegeScreen from './privilege';

import { connect } from 'react-redux';


const Stack = createStackNavigator();

function ImageBox({ style }) {
    return (
        <TouchableOpacity style={{ ...style, ...styles.imageBox }}>
            <Image style={styles.image} source={require('../../icons/photo.png')} />
        </TouchableOpacity>
    )
}


function MainScreen({ navigation, route, userReducer }) {
    const user = route?.params?.user;
    const self = route?.params?.self;

    return (
        <>
            <View style={styles.header} >
                <Image style={styles.profile} source={require('../../icons/woman.png')} />
                <View style={styles.rightSection}>
                    <View style={styles.firstRow} >
                        <Text style={styles.name}>{user.name}</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 5, width: '20%' }}>
                            {
                                self &&
                                <>
                                    <TouchableOpacity style={styles.notification} onPress={() => navigation.navigate('ProfileNotifications')} >
                                        <Notification />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('ProfileSettings')} ><Settings /></TouchableOpacity>
                                </>
                            }
                            {
                                isManager(userReducer.user) &&
                                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('ProfilePrivilege', { user: user })} ><TwoUser /></TouchableOpacity>
                            }
                        </View>

                    </View>
                    <Text style={styles.title}>{roles[user.role]}</Text>
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

const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

MainScreen = connect(mapStateToProps)(MainScreen);


function ProfileScreen({ route }) {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='ProfileMain' component={MainScreen} initialParams={route.params} />
            <Stack.Screen name='ProfileNotifications' component={NotificationsScreen} />
            <Stack.Screen name='ProfileSettings' component={SettingsScreen} />
            <Stack.Screen name='ProfilePrivilege' component={PrivilegeScreen} />

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
        flexDirection: 'row',
        width: '75%',
    },
    notification: {
        marginLeft: -15,
        marginRight: 10,
        alignSelf: 'center'
    },
    settings: {
        marginRight: 10,
        alignSelf: 'center'
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