import * as React from 'react';
import { TextInput, StyleSheet } from 'react-native';


function Input({ placeholder, required, style, ...props }) {
    const requiredStyle = required ? { borderWidth: 1, borderColor: '#E11E3C' } : null;
    return (
        <TextInput {...props} placeholder={placeholder} placeholderTextColor={styles.input.color} style={[styles.input, style, requiredStyle]} />
    )
}

const styles = StyleSheet.create({
    input: {
        paddingVertical: 12.5,
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        borderRadius: 10,
        color: '#48515B',

    }
})

export default Input;
