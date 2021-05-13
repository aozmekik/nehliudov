import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { Search } from './icons';

function SearchBar({ title, color, bgColor }) {

    return (
        <View style={[styles.container, { color: bgColor ? bgColor : styles.container.backgroundColor }]} >
            <Search fill={color ? color : styles.front.color} style={styles.test} />
            <TextInput style={[styles.title, { color: color ? color : styles.front.color }]}>{title}</TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        // shadowColor: "#000",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 3,
    },

    title: {
        flex: 1,
        marginLeft: 10,
        color: '#48515B',
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        // borderWidth: 1,
    },
    front: {
        color: '#758291',
    },
    test: {
        marginTop: 5
    }

})

export default SearchBar;