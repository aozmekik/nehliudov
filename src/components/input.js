import * as React from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';

import { FloatingLabelInput } from 'react-native-floating-label-input';


function Input({ placeholder, required, value, style, ...props }) {
    // const requiredStyle = required ? { borderWidth: 1, borderColor: '#E11E3C' } : null;
    return (
        <>
            <FloatingLabelInput value={value?.toString()} label={placeholder} {...props} placeholder={placeholder}
            
            containerStyles={{...style, paddingVertical: 12.5,
                paddingHorizontal: 15,
                backgroundColor: '#FFFFFF', borderRadius: 10}}  
            
            inputStyles={{fontFamily: 'SFProText-Regular',
        fontSize: 14,
        color: '#48515B',
        
    }} 
    customLabelStyles={{
        colorFocused: '#E11E3C',
        colorBlurred: styles.input.color,
        fontSizeFocused: 11,
        topFocused: -16,
        fontFamily: 'SFProText-Regular',
      }}
      labelStyles={{
          marginHorizontal: -5,
        fontFamily: 'SFProText-Regular',
      }}

    
    />

            {/* <TextInput value={value?.toString()} {...props} placeholder={placeholder} placeholderTextColor={required ? '#E11E3C' : styles.input.color} style={[styles.input, style]} /> */}
        </>
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
