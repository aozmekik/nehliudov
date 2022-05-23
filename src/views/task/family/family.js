import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';

import { ChevronRight, History } from '../../../components/icons';
import { SearchBar, NavBar, ButtonCard } from '../../../components/';
import FamilyAddScreen from './family-add/family-add';
import FamilyListScreen from './family-list/family-list';

import { listFamilies } from '../../../services/family-services';
import { FamilyListResultMainScreen } from './family-list/result';


function SearchHistory() {
    return (
        <>
            {/* <Text style={styles.searchText}>SON ARAMALAR</Text> */}
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: '20%' }}>
                <History fill="#C6CBD2" />
                <Text style={{ color: '#48515B', fontFamily: 'SFProText-Semibold', fontSize: 12, marginTop: 5 }} >Henüz arama yok</Text>
            </View>
        </>
    );
}



function FamilyMainScreen({ navigation, route }) {
    const [historyScreen, setHistoryScreen] = React.useState(true);
    const [families, setFamilies] = React.useState([]);

    const onChangeText = async (name) => {
        try {
            if (name) {
                // FIXME. city hard-coded
                const res = await listFamilies({ name: name, city: 34 });
                if (res.status === 201) {
                    const data = await res.json();
                    for (let fam of data)
                        fam.images = fam.images ? fam.images.data : [];
                    setFamilies(data);
                }
                else
                    console.error('listFamilies');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const onPressFamilySearch = (family) => {
        navigation.navigate('FamilyListSearchDetail', { goBack: 'FamilyMain', family: family });
    }

    const updateFamilies = () => {
        if (route?.params?.family) {
            for (let i = 0; i < families.length; ++i)
                if (families[i]._id === route.params.family._id)
                    families[i] = route.params.family;
        }
    }

    updateFamilies();

    return (
        <>
            <View style={styles.headerContainer}>
                <NavBar title='Aile' onPress={navigation.goBack} />

                <SearchBar style={styles.search} onChangeText={onChangeText} onEmpty={() => setHistoryScreen(true)} onFocus={() => setHistoryScreen(false)} title='Aile Ara' />


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

            {historyScreen ?
                <SearchHistory />
                :
                <FamilyListResultMainScreen route={{ params: { families: families, onPress: onPressFamilySearch } }} />
            }

        </>
    );
};


const Stack = createStackNavigator();

function FamilyScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='FamilyMain' component={FamilyMainScreen} />
            <Stack.Screen name='FamilyAdd' component={FamilyAddScreen} />
            <Stack.Screen name='FamilyList' component={FamilyListScreen} />
            <Stack.Screen name='FamilyListSearchDetail' component={FamilyAddScreen} />
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
    },
    buttonCard: {
        marginTop: 15
    },

});



export default FamilyScreen;