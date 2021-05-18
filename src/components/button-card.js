import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ChevronRight, Check } from './icons';


function ButtonCard({ title, desc, style, selected, ...props }) {
    const selectedStyle = { borderWidth: 1, borderColor: '#E11E3C' };

    return (<TouchableOpacity {...props} style={[styles.container, style, selected ? selectedStyle : null]}>
        <View style={styles.textContainer}>
            <Text style={[styles.title, style?.text]}>
                {title}
            </Text>
            {desc && <Text style={styles.desc}>{desc}</Text>}
        </View>

        {selected ? <Check fill="#E11E3C" /> : <ChevronRight />}
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
    textContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        color: '#0A151F',
        fontFamily: 'SFProText-Bold',
        fontSize: 14
    },
    desc: {
        marginLeft: 5,
        color: '#758291',
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 14
    }
});

export default ButtonCard;
