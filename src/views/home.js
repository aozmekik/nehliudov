import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import FamilyScreen from './family/family';
import Select from '../components/select';
import FamilyAddScreen from './family/family-add';

function HomeScreen() {
    return (
        <View style={styles.container} >
            {/* <Select style={styles.input} placeholder='İsim' /> */}
            <FamilyScreen />
        </View>
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