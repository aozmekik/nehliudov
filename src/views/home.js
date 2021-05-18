import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import NotificationsScreen from './profile/notifications';
import FamilyScreen from './task/family/family';
import ResultScreen from './task/family/family-list/result';
import FamilyAddScreen from './task/family/family-add/family-add';
import Member from './task/family/family-add/member';
import Budget from './task/family/family-add/budget';
import Note from './task/family/family-add/note';

function HomeScreen() {
    return (
        <View style={styles.container} >
            {/* <Select style={styles.input} placeholder='İsim' /> */}
            {/* <FamilyScreen /> */}
            {/* <TimelineScreen /> */}
            {/* <ProfileScreen /> */}
            <FamilyAddScreen />
            {/* <ResultScreen /> */}
            {/* <Member /> */}
            {/* <Budget /> */}

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50,
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