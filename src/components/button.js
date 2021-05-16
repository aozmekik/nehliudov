import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';


function Button({ title, Icon, color, big, style, ...props }) {
    color = color ? color : '#FFFFFF';
    let size = {
        width: '40%',
        alignSelf: 'center'
    };


    return (
        <TouchableOpacity {...props} style={[styles.container, style, !big ? size : null]} >
            {/* <Icon style={styles.icon} /> */}
            {Icon && <Icon style={styles.icon} />}

            <Text style={{ ...styles.title, color: color }}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#E11E3C',
        justifyContent: 'center',
        paddingVertical: 12.5,
    },
    icon: {
        marginTop: 2
    },
    title: {
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        marginLeft: 5
    }

});

export default Button;