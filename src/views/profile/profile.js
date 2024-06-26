import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, FlatList, ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';


import { Settings, TwoUser } from '../../components/icons';
import SettingsScreen from './settings';
import PrivilegeScreen from './privilege';

import { roles } from '../../models/user';
import { selfIsManager } from '../../services/user-services';


const Stack = createStackNavigator();

function MainScreen({ navigation, route, userReducer }) {
    const self = route?.params?.self;
    const user = self ? userReducer.user : route?.params?.user;

    let width = self ? '60%' : (selfIsManager() ? '50%' : '100%');

    return (
        <>
            <View style={styles.header} >
                <Image style={styles.profile} source={require('../../icons/woman.png')} />
                <View style={styles.rightSection}>
                    <View style={styles.firstRow} >
                        <Text style={{ ...styles.name }}>{user.name}</Text>

                        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                                {
                                    !self && selfIsManager() && (user.role === 0 || user.role === 1) &&
                                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('ProfilePrivilege', { user: user })} ><TwoUser /></TouchableOpacity>
                                }
                                {
                                    self &&
                                    <>
                                        <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('ProfileSettings')} ><Settings /></TouchableOpacity>

                                    </>
                                }
                            </View>
                        </View>

                    </View>
                    <Text style={styles.title}>{roles[user.role]}</Text>
                </View>
            </View>


            <View style={{ marginTop: 50, opacity: 0.8}}>
                <Text style={{
                    fontFamily: 'SFProText-Regular', color: '#0A151F',
                    fontSize: 14,
                    margin: 10,
                    paddingHorizontal: 10
                }}>
                    Sistemde 3 farklı rol vardır. {"\n\n"}
                    1. Ziyaretçi{"\n"}
                    
                    Herhangi bir yetkisi yoktur. {"\n\n"}
                    2. İlçe Görevlisi{"\n"}
                    Herhangi bir bölgede Aile kaydı ekleyebilir.  {"\n"}
                    İlçe Sorumlusu, İlçe Görevlisi'ne belirli bölgelerde yetki verebilir.
                    Bu durumda İlçe Görevlisi bu bölgelerdeki Aile kayıtlarını görebilir. {"\n\n"}


                    3. İlçe Sorumlusu{"\n"}
                    İlçe Görevlisi'nin tüm yetkilerini miras alır. {"\n"}
                    İlçe Görevlisi'ni belirli bölgelerde yetkilendirebilir. Böylece İlçe Görevlisi o bölgedeki Aile kayıtlarını görebilir. 


                </Text>
            </View>
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
        flexDirection: 'row',
    },
    profile: {
        width: 51,
        height: 51,
        borderRadius: 100

    },
    rightSection: {
        flex: 1,
        marginHorizontal: 15,
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        marginTop: 10,
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#0A151F',
        flexDirection: 'row',
    },
    notification: {
        marginRight: 10,
        // alignSelf: 'center'
    },
    settings: {
        // alignSelf: 'center'
    },
    title: {
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 12,
        color: '#0A151F'
    },
    scrollView: {
        marginTop: 15
    },
});

export default ProfileScreen;