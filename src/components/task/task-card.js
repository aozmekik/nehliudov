import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

function TaskCard({ style, title, desc }) {
    return (
        <TouchableOpacity style={[style, styles.container]} >
            <View style={styles.leftItem} />
            <View style={styles.rightItem}>
                <Text style={styles.h1}>{title}</Text>
                <Text style={styles.h2}>{desc}</Text>
            </View>
        </TouchableOpacity>)
}


const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 5
    },

    leftItem: {
        margin: 12,
        width: 3,
        // height: 40,
        height: '80%',
        backgroundColor: '#E3E5E8',

    },

    rightItem: {
        marginTop: 12,
        marginRight: 12,
        flex: 1
    },

    h1: {
        color: '#0A151F',
        fontSize: 18,
        fontFamily: 'SFProText-Bold'
    },

    h2: {
        color: '#48515B',
        fontSize: 12,
        fontFamily: 'SFProText-Regular',
    }



})

export default TaskCard;