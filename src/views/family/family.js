import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';

import { ChevronRight } from '../../components/icons';
import SearchBar from '../../components/search-bar';
import NavBar from '../../components/nav-bar';

function Test() {
    return (<View />);
}

function Header({ navigation }) {
    return (
        <View style={styles.headerContainer}>
            <NavBar title='Aile' onPress={navigation.goBack} />

            <SearchBar style={styles.search} title='Ara' />

            <TouchableOpacity style={styles.headerItem2}>
                <Text style={styles.familyAdd}>Aile ekle</Text>
                <ChevronRight style={styles.chevronRight} />
            </TouchableOpacity>
        </View >
    );
};


const Stack = createStackNavigator();

function FamilyScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Family" component={Test} options={({ navigation }) => {
                return {
                    header: Header,
                }
            }} />
            {/* <Stack.Screen name="Notifications" component={Test} />
            <Stack.Screen name="Profile" component={Test} />
            <Stack.Screen name="Settings" component={Test} /> */}
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
    }
})


export default FamilyScreen;