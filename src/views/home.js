import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import NotificationsScreen from './profile/notifications';
import FamilyScreen from './task/family/family';
import ResultScreen from './task/family/family-list/result';

function HomeScreen() {
    return (
        <View style={styles.container} >
            {/* <Select style={styles.input} placeholder='İsim' /> */}
            {/* <FamilyScreen /> */}
            {/* <TimelineScreen /> */}
            {/* <ProfileScreen /> */}
            <FamilyScreen />
            {/* <ResultScreen /> */}
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50,
        backgroundColor: '#F8F8F8',
        height: '100%',
    },

    taskItem: {
        marginTop: 10
    },

    input: {
        marginHorizontal: 10
    }

})


export default HomeScreen;