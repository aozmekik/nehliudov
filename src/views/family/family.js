import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


import { createStackNavigator } from '@react-navigation/stack';

import { ChevronLeft, ChevronRight } from '../../components/icons';

function Test() {
    return (<View />);
}

function Header({ scene, previous, navigation }) {
    const { options } = scene.descriptor;
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
                ? options.title
                : scene.route.name;

    return (
        <View style={[options.headerStyle, styles.headerContainer]}>
            <View style={styles.headerItem}>
                <TouchableOpacity style={{ flex: 1 }} onPress={navigation.goBack} ><ChevronLeft /></TouchableOpacity>
                <Text style={styles.headerTitle}>Aile</Text>
            </View>

            <TouchableOpacity style={styles.headerItem}>
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
            <Stack.Screen name="Family" component={Test} options={({ route, navigation }) => {
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
        marginTop: 30,
        alignItems: 'center',
        // backgroundColor: 'pink',
    },

    headerTitle: {
        flex: 5,
        color: '#183148',
        fontFamily: 'SFProText-Medium',
        alignSelf: 'center',
        fontSize: 14,
        paddingLeft: '32%'
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
    }
})


export default FamilyScreen;