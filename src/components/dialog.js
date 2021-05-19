import * as React from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';



import { Text, StyleSheet, View } from 'react-native';
import { Info } from '../components/icons';

function Dialog({ title, style }) {
    return (
        <View style={[styles.container, style]}>
            <Info style={styles.icon} fill='#FFFFFF' />
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: hp('65%'),
        maxWidth: '90%',
        alignSelf: 'center',
        backgroundColor: '#48515B',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row'

    },
    text: {
        fontFamily: 'SFProText-Bold',
        fontSize: 12,
        textAlign: 'center',
        color: '#FFFFFF',
        marginLeft: 5,
        marginTop: 3.5
    },
    icon: {
    }
});

export default Dialog;