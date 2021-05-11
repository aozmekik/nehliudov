import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


function HomeScreen() {
    return (
        <View style={styles.container} >
            <Text style={styles.taskItem}>Selam</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 50,
        backgroundColor: '#F8F8F8',
        height: '100%',
    },

    taskItem: {
        marginTop: 10
    }

})


export default HomeScreen;