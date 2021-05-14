import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ChevronLeft } from './icons';


function NavBar({ title, style, ...props }) {
    const col = style?.color ? style.color : styles.title.color;
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.icon} {...props}><ChevronLeft fill={col} /></TouchableOpacity>
            <Text style={[styles.title, { color: col }]} >{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
        paddingBottom: 10
    },
    icon: {
        flex: 1,
        marginLeft: 10,
        position: 'absolute',
        zIndex: 1,
        width: '20%'
    },

    title: {
        flex: 5,
        color: '#183148',
        fontFamily: 'SFProText-Medium',
        alignSelf: 'center',
        fontSize: 14,
        textAlign: 'center',
        paddingVertical: 2.5
    },

})

export default NavBar;