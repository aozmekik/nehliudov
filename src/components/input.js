import * as React from 'react';
import { StyleSheet, Text, TextInput, View} from 'react-native';



function Input({ placeholder, required, value, style, disableLabel, ...props }) {
    // const requiredStyle = required ? { borderWidth: 1, borderColor: '#E11E3C' } : null;
    
    return (
        <View style={style}>
            {!disableLabel && <Text style={styles.text}> {placeholder} </Text>}
            <TextInput label={placeholder} value={value?.toString()}  {...props} placeholder={placeholder} placeholderTextColor={required ? '#E11E3C' : styles.input.color} style={[styles.input]} />
        </View>
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
    },
    text: {
        position: 'absolute',
        alignSelf: 'flex-end',
        zIndex: 1,
        paddingTop: 5,
        paddingHorizontal: 10,
        fontFamily: 'SFProText-Regular',
        fontSize: 11,
        color: '#48515B',
        opacity: 0.6,
    }
})

export default Input;
