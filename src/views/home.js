import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

import NotificationsScreen from './profile/notifications';
import FamilyScreen from './task/family/family';
import ResultScreen from './task/family/family-list/result';
import FamilyAddScreen from './task/family/family-add/family-add';
import Member from './task/family/family-add/member';
import Budget from './task/family/family-add/budget';
import Note from './task/family/family-add/note';
import Location from '../components/task/location';
import Dialog from '../components/dialog';
import ButtonCard from '../components/button-card';
import TimelineScreen from '../views/timeline/timeline';
import * as FamilyModel from '../models/family';
import ImageScreen from './task/family/family-add/image';
import AuthScreen from './auth/auth';




function HomeScreen() {
    const [visible, setVisible] = React.useState(false);

    const toggleVisible = () => setVisible(prevValue => !prevValue);

    return (
        <View style={styles.container} >
            {/* <Select style={styles.input} placeholder='İsim' /> */}
            {/* <FamilyScreen /> */}
            {/* <TimelineScreen /> */}
            {/* <ProfileScreen /> */}
            {/* <ImageScreen /> */}
            {/* <FamilyAddScreen /> */}
            {/* <TestScreen /> */}
            <AuthScreen />


            {/* <DeleteSelected /> */}
            {/* <Dialog title='selamlarsana ey '/> */}

            {/* <Location /> */}
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