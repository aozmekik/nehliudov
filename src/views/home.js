import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';

import NotificationsScreen from './profile/notifications';
import FamilyScreen from './task/family/family';
import FamilyListResultScreen from './task/family/family-list/result';
import FamilyAddScreen from './task/family/family-add/family-add';
import Member from './task/family/family-add/member';
import Budget from './task/family/family-add/budget';
import Note from './task/family/family-add/note';
import Location from '../components/task/location';
import Dialog from '../components/dialog';
import ButtonCard from '../components/button-card';
import * as FamilyModel from '../models/family';
import ImageScreen from './task/family/family-add/image';
import AuthScreen from './auth/auth';

function Test({ text }) {
    console.log('TestComponent');
    return (
        <Text>
            {text}
        </Text>
    )
}

import { getHeaders } from '../services/headers';
import ProfileScreen from './profile/profile';
import PrivilegeScreen from './profile/privilege';
import FamilyListScreen from './task/family/family-list/family-list';


function HomeScreen() {
    const [count, setCount] = React.useState(0)
    // const [visible, setVisible] = React.useState(false);

    const increase = React.useCallback(() => {
        setCount(count => count + 1);
    }, []);

    const test = () => {
        console.log('callback');
    };


    // const toggleVisible = () => setVisible(prevValue => !prevValue);

    return (
        <View style={styles.container} >
            {/* <Select style={styles.input} placeholder='İsim' /> */}
            {/* <FamilyScreen /> */}
            {/* <TimelineScreen /> */}
            {/* <ProfileScreen /> */}
            {/* <ImageScreen /> */}
            {/* <SearchUserScreen /> */}
            <FamilyScreen />
            {/* <ProfileScreen route={{ params: { user: { name: 'semih', role: 1 } } }} /> */}
            {/* <TestScreen /> */}
            {/* <AuthScreen /> */}

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