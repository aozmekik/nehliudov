import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import NavBar from '../../components/nav-bar';
import ButtonCard from '../../components/button-card';
import Button from '../../components/button';
import Input from '../../components/input';

function SettingsScreen({ navigation }) {
    return (
        <View>
            <NavBar onPress={() => navigation.goBack()} title='Profil Düzenle' />
            <ButtonCard style={{ marginTop: 15, text: { color: '#48515B', fontFamily: 'SFProText-Regular', fontSize: 14 } }} title='Profil resmi değiştir' />
            <Input style={styles.input} placeholder='Eski Şifre' />
            <Input style={styles.input} placeholder='Yeni Şifre' />
            <Input style={styles.input} placeholder='Yeni Şifre' />
            <Button style={styles.input} title='Uygula' />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 15,
        marginHorizontal: 15
    }
})

export default SettingsScreen;