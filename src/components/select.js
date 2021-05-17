import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import RNPickerSelect from 'react-native-picker-select';
import { ChevronDown } from './icons';



function Select({ items, placeholder, style, chevronColor, ...props }) {
    return (
        <View style={[style, styles.container]}>
            <RNPickerSelect {...props} placeholder={{ label: placeholder }}
                useNativeAndroidPickerStyle={false} Icon={() => (<ChevronDown fill={chevronColor ? chevronColor : "#E11E3C"} />)}
                style={pickerSelectStyles}
                items={items}
            />
        </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        paddingVertical: 12.5,
        color: '#48515B',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    iconContainer: {
        marginTop: 15
    },
    placeholder: {
        fontFamily: 'SFProText-Regular',
        color: '#48515B',
        fontSize: 14,
    },
});

pickerSelectStyles.inputAndroid = pickerSelectStyles.inputIOS;


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
});

export default Select;
