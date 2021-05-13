import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { Search } from './icons';

function SearchBar({ title, style }) {
    const col = style?.color ? style.color : styles.title.color;
    return (
        <View style={[styles.container, style]} >
            <Search fill={col} style={styles.test} />
            <TextInput placeholder={title} placeholderTextColor={col} style={[styles.title, { color: col }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: 'red',
        borderRadius: 10,
    },

    title: {
        flex: 1,
        marginLeft: 10,
        color: '#48515B',
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
    },
    test: {
        marginTop: 5
    }

})

export default SearchBar;