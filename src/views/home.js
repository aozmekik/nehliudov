import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import FamilyScreen from './family/family';
import Select from '../components/select';
import FamilyAddScreen from './family/family-add';
import FamilyAddMemberScreen from './family/note';
import TimelineScreen from './timeline/timeline';

function HomeScreen() {
    return (
        <View style={styles.container} >
            {/* <Select style={styles.input} placeholder='İsim' /> */}
            {/* <FamilyScreen /> */}
            <TimelineScreen />
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