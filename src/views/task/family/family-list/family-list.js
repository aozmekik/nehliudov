import * as React from 'react';
import { Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Select from '../../../../components/select';
import ButtonCard from '../../../../components/button-card';
import NavBar from '../../../../components/nav-bar';
import ResultScreen from './result';
import Location from '../../../../components/task/location';

function SelectBox({ style, title }) {
    return (
        <TouchableOpacity style={[selectBoxStyles.container, style]}>
            <Text style={selectBoxStyles.text}>{title}</Text>
        </TouchableOpacity>
    )
}


function Main({ navigation }) {
    return (
        <>
            <NavBar title='Aile Listele' />
            <ScrollView style={styles.scrollView}>
                <Location/>
                <ButtonCard onPress={() => navigation.navigate('Result')} style={styles.select} title='Aile listele' />
            </ScrollView>
        </>

    );
}

const Stack = createStackNavigator();

function FamilyListScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='Result' component={ResultScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    select: {
        marginTop: 15,
        flex: 1,
        marginHorizontal: 15
    },

    selectFirst: {
        marginTop: 30
    },

    selectBox: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 15
    },
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

export default FamilyListScreen;