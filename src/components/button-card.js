import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ChevronRight } from './icons';


function ButtonCard({ title, desc, style, ...props }) {

    return (<TouchableOpacity {...props} style={[styles.container, style]}>
        <Text style={[styles.title, style.text]} >{title}</Text>
        {desc && <Text style={styles.desc}>{desc}</Text>}
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
    },
    desc: {
        flex: 2,
        color: '#758291',
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 14
    }
});

export default ButtonCard;
