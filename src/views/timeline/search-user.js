import * as React from 'react';
import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';


import { NavBar, Input, SearchBar } from '../../components';
import { History } from '../../components/icons';
import ProfileScreen from '../profile/profile';

import { roles } from '../../models/user';

import { getUsers } from '../../services/user-services';

function SearchResult({ navigation, style, user }) {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('SearchUserProfile', { user: user })} style={[styles.section1, style]}>
            <Image style={styles.profile} source={require('../../icons/woman.png')} />
            <View style={styles.headerContent} >
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.title}>{roles[user.role]}</Text>
            </View>
        </TouchableOpacity>
    );
}


function SearchHistory() {
    return (
        <>
            <History fill="#C6CBD2" style={{ alignSelf: 'center', marginTop: '40%' }} />
            <Text style={{ color: '#48515B', fontFamily: 'SFProText-Semibold', fontSize: 12, alignSelf: 'center', marginTop: 5 }} >Henüz arama yok</Text>
        </>
    );
}


function Main({ navigation }) {
    const [historyScreen, setHistoryScreen] = React.useState(true);
    const [users, setUsers] = React.useState([]);

    const onChangeText = async (name) => {
        try {
            if (name) {
                const res = await getUsers(name);
                if (res.status === 200) {
                    const data = await res.json();
                    setUsers(data);

                }
            }
        } catch (e) {
            console.error(e);
        }

    };

    return (
        <>
            <View style={styles.header}>
                <NavBar onPress={navigation?.goBack} />
                <SearchBar onChangeText={onChangeText} noBlurStyle={true} onEmpty={() => setHistoryScreen(true)} onFocus={() => setHistoryScreen(false)} title='Gönüllü ara' style={{
                    backgroundColor: 'transparent',
                }} />
            </View>

            {historyScreen ?
                <SearchHistory />
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        users.length > 0 && users.map(user =>
                            <SearchResult key={user.name} user={user} navigation={navigation} style={{ marginTop: 15 }} />
                        )
                    }
                </ScrollView>
            }
        </>
    );
}

const Stack = createStackNavigator();

function SearchUserScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='SearchUserMain' component={Main} />
            <Stack.Screen name='SearchUserProfile' component={ProfileScreen} />
        </Stack.Navigator>
    );
}



const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF'
    },
    profile: {
        width: 51,
        height: 51
    },

    section1: {
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    headerContent: {
        marginHorizontal: 10,
        flex: 1,
    },
    name: {
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#0A151F'
    },

    title: {
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 12
    },
});

export default SearchUserScreen;