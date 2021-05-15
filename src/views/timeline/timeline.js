import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { Camera, More } from '../../components/icons';
import Post from './post';
import Comment from './comment';
import PostAddScreen from './post-add';


const Stack = createStackNavigator();


function Main() {
    return (<>
        <View style={styles.header}>
            <TouchableOpacity><Camera style={styles.camera} stroke='black' /></TouchableOpacity>
            <TouchableOpacity><More style={styles.more} fill='black' /></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>

            <Post style={styles.post} />
            <Post style={styles.post} />
        </ScrollView >
    </>
    );
}

function TimelineScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={PostAddScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        // position: ',
        top: 30,
        zIndex: 1,
        marginHorizontal: 10,
        // borderBottomWidth: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    post: {
        marginTop: 50,
        marginHorizontal: 10,
    }
});

export default TimelineScreen;