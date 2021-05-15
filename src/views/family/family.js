import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';

import { ChevronRight, History } from '../../components/icons';
import SearchBar from '../../components/search-bar';
import NavBar from '../../components/nav-bar';
import FamilyAddScreen from '../family/family-add';

function SelectBox({ style, title }) {
    return (
        <TouchableOpacity style={[selectBoxStyles.container, style]}>
            <Text style={selectBoxStyles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

function Test() {
    return (
        <ScrollView style={styles.scrollView}>
            <Text style={styles.searchText} >SON EKLEMELER</Text>
            <History fill="#C6CBD2" style={{ alignSelf: 'center', marginTop: '20%' }} />
            <Text style={{ color: '#48515B', fontFamily: 'SFProText-Semibold', fontSize: 12, alignSelf: 'center', marginTop: 5 }} >Henüz ekleme yok</Text>



            {/* <View style={{ flexDirection: 'row' }}>
                <Select style={styles.select} placeholder='İl' />
                <Select style={styles.select} placeholder='İlçe' />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Select style={styles.select} placeholder='Mahalle' />
                <Select style={styles.select} placeholder='Durum' />
            </View>

            <View style={styles.boxContainer}>
                <SelectBox style={styles.selectBox} title='Eğitim' />
                <SelectBox style={styles.selectBox} title='Sağlık' />
                <SelectBox style={styles.selectBox} title='İhtiyaç' />
            </View>
            <ButtonBar style={styles.select} title='Aile listele' /> */}

        </ScrollView>

    );
}

function Header({ navigation }) {
    return (
        <View style={styles.headerContainer}>
            <NavBar title='Aile' onPress={navigation.goBack} />

            <SearchBar style={styles.search} title='Aile Ara' />

            <TouchableOpacity style={styles.headerItem2}>
                <Text style={styles.familyAdd}>Aile ekle</Text>
                <ChevronRight style={styles.chevronRight} />
            </TouchableOpacity>

            <View style={{ alignSelf: 'center', width: '90%', borderBottomWidth: 0.4, borderBottomColor: '#EEF0F2' }} />

            <TouchableOpacity style={{ ...styles.headerItem2, marginTop: 0 }}>
                <Text style={styles.familyAdd}>Aile listele</Text>
                <ChevronRight style={styles.chevronRight} />
            </TouchableOpacity>


        </View >
    );
};


const Stack = createStackNavigator();

function FamilyScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Family' component={FamilyAddScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',

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
        fontSize: 24,
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

    select: {
        marginTop: 15,
        flex: 1
    },

    selectFirst: {
        marginTop: 30
    },

    selectBox: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 15
    },

    boxContainer: {
        flexDirection: 'row',
    },

    scrollView: {
        paddingBottom: 100
    },

    searchText: {
        marginTop: 10,
        marginHorizontal: 15,
        color: '#758291',
        fontFamily: 'SFProText-Semibold',
        fontSize: 12,
    }

});

const selectBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',

    },
    text: {
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        color: '#48515B',
    }
})


export default FamilyScreen;