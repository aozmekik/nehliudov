import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import FamilyScreen from './family/family';

function HomeScreen() {
    return (
        <View style={styles.container} >
            <FamilyScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // paddingTop: 50,
        // backgroundColor: '#F8F8F8',
        height: '100%',
    },

    taskItem: {
        marginTop: 10
    }

})


export default HomeScreen;