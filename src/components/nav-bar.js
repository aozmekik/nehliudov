import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import { ChevronLeft, TickSquare } from './icons';


function NavBar({ title, style, onTick, ...props }) {
    const col = style?.color ? style.color : styles.title.color;
    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.icon1} {...props}><ChevronLeft fill={col} /></TouchableOpacity>
            <Text style={[styles.title, { color: col }]} >{title}</Text>
            {onTick && <TouchableOpacity onPress={onTick} style={styles.icon2}><TickSquare /></TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 30,
        paddingBottom: 10
    },
    icon1: {
        flex: 1,
        left: 10,
        position: 'absolute',
        zIndex: 1,
    },

    icon2: {
        flex: 1,
        right: 10,
        position: 'absolute',
        zIndex: 1,
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