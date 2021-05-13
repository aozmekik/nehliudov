import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ChevronRight } from './icons';


function ButtonBar({ title, style }) {

    return (<TouchableOpacity style={[styles.container, style]}>
        <Text style={styles.title} >{title}</Text>
        <ChevronRight />
    </TouchableOpacity>);
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
    },
    title: {
        flex: 1,
        color: '#0A151F',
        fontFamily: 'SFProText-Bold',
        fontSize: 14
    }
});

export default ButtonBar;
