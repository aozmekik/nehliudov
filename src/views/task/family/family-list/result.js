import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Navbar from '../../../../components/nav-bar';
import ButtonCard from '../../../../components/button-card';
import { Download } from '../../../../components/icons';

function ResultScreen() {
    return (
        <>
            <Navbar title='Aile Listele' />
            <TouchableOpacity style={styles.download}>
                <Download stroke='#758291' />
                <Text style={styles.downloadText}>İndir</Text>
            </TouchableOpacity>
            <ScrollView>
                <ButtonCard style={styles.buttonCard} title='Ali Hisam' desc='2 gün önce' />
                <ButtonCard style={styles.buttonCard} title='Muhammed Elhasan' desc='3 gün önce' />
                <ButtonCard style={styles.buttonCard} title='Ahmed Sukkar' desc='1 ay önce' />
                <ButtonCard style={styles.buttonCard} title='Muhammed Gina' desc='2 gün önce' />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    buttonCard: {
        marginTop: 15
    },
    download: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '25%',
        marginLeft: 15,
        borderRadius: 20
    },
    downloadText: {
        marginTop: 1,
        marginLeft: 8,
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#758291'
    }
});

export default ResultScreen;