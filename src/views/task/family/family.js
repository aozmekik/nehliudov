import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';

import { ChevronRight, History } from '../../../components/icons';
import SearchBar from '../../../components/search-bar';
import NavBar from '../../../components/nav-bar';
import FamilyAddScreen from './family-add/family-add';
import FamilyListScreen from './family-list/family-list';


function Main({ navigation }) {
    return (
        <>
            <View style={styles.headerContainer}>
                <NavBar title='Aile' onPress={navigation.goBack} />

                <SearchBar style={styles.search} title='Aile Ara' />

                <TouchableOpacity onPress={() => navigation.navigate('FamilyAdd')} style={styles.headerItem2}>
                    <Text style={styles.familyAdd}>Aile ekle</Text>
                    <ChevronRight style={styles.chevronRight} />
                </TouchableOpacity>

                <View style={{ alignSelf: 'center', width: '90%', borderBottomWidth: 0.4, borderBottomColor: '#EEF0F2' }} />

                <TouchableOpacity onPress={() => navigation.navigate('FamilyList')} style={{ ...styles.headerItem2, marginTop: 0 }}>
                    <Text style={styles.familyAdd}>Aile listele</Text>
                    <ChevronRight style={styles.chevronRight} />
                </TouchableOpacity>
            </View >
            <ScrollView style={styles.scrollView}>
                <Text style={styles.searchText} >SON ARAMALAR</Text>
                <History fill="#C6CBD2" style={{ alignSelf: 'center', marginTop: '20%' }} />
                <Text style={{ color: '#48515B', fontFamily: 'SFProText-Semibold', fontSize: 12, alignSelf: 'center', marginTop: 5 }} >Henüz arama yok</Text>
            </ScrollView>
        </>
    );
};


const Stack = createStackNavigator();

function FamilyScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Family' component={Main} />
            <Stack.Screen name='FamilyAdd' component={FamilyAddScreen} />
            <Stack.Screen name='FamilyList' component={FamilyListScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFFFFF',
    },
    headerItem: {
        flexDirection: 'row',
        marginTop: 35,
        alignItems: 'center',
    },

    headerItem2: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
    },

    familyAdd: {
        fontFamily: 'SFProText-Bold',
        color: '#0A151F',
        fontSize: 18,
        flex: 1,
        padding: 15
    },

    chevronRight: {
        marginRight: 20
    },

    search: {
        marginTop: 15,
        backgroundColor: '#F8F8F8',
    },

    boxContainer: {
        flexDirection: 'row',
    },

    scrollView: {
    },

    searchText: {
        marginTop: 10,
        marginHorizontal: 15,
        color: '#758291',
        fontFamily: 'SFProText-Semibold',
        fontSize: 12,
    }

});



export default FamilyScreen;