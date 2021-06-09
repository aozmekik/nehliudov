import * as React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { Search, Delete } from './icons';

function SearchBar({ title, noBlurStyle, style, onFocus, onEmpty, onChangeText }) {
    const [focus, setFocus] = React.useState(false);
    const [text, setText] = React.useState(null);


    const blurStyle = { borderWidth: 0 };
    const focusStyle = noBlurStyle ? blurStyle : { borderWidth: 0.4, borderColor: '#D1D1D1' };

    const onChange = (e) => {
        setText(e);
        if (!e && onEmpty)
            onEmpty();

        if (e && onFocus)
            onFocus();

        if (onChangeText)
            onChangeText(e);
    }

    const col = style?.color ? style.color : styles.title.color;
    return (
        <View style={[styles.container, style, focus ? focusStyle : blurStyle]} >
            <Search fill={col} style={styles.icon} />
            <TextInput
                value={text}
                onChangeText={onChange}
                onBlur={() => {
                    setFocus(false);
                }
                }
                onFocus={() => {
                    setFocus(true);
                }}
                placeholder={title} placeholderTextColor={col} style={[styles.title, { color: col }]} />
            {focus && <TouchableOpacity><Delete onPress={() => {onChange(null)}} fill={col} style={styles.icon} /></TouchableOpacity>}
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