import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { Search, Delete } from './icons';

function SearchBar({ title, style }) {
    const [focus, setFocus] = React.useState(false);

    const blurStyle = { borderWidth: 0 };
    const focusStyle = { borderWidth: 0.4, borderColor: '#D1D1D1' };

    const col = style?.color ? style.color : styles.title.color;
    return (
        <View style={[styles.container, style, focus ? focusStyle : blurStyle]} >
            <Search fill={col} style={styles.icon} />
            <TextInput
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                placeholder={title} placeholderTextColor={col} style={[styles.title, { color: col }]} />
            {focus && <TouchableOpacity><Delete fill={col} style={styles.icon} /></TouchableOpacity>}
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
    icon: {
        marginTop: 5
    }

})

export default SearchBar;