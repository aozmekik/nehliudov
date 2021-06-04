import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';


import { NavBar, ButtonCard, Button, Input } from '../../components';

import { connect } from 'react-redux'
import { logout } from '../../services/auth-services';
import { logout as actionLogout } from '../../reducers/actions';




function DetailsScreen({ navigation }) {
    return (
        <>
            <NavBar onPress={() => navigation.goBack()} title='Profil Ayarları' />
            <ButtonCard style={styles.buttonCard} title='Profil resmi değiştir' />
            <Input style={styles.input} placeholder='Eski Şifre' />
            <Input style={styles.input} placeholder='Yeni Şifre' />
            <Input style={styles.input} placeholder='Yeni Şifre' />
            <Button style={styles.input} title='Uygula' />
        </>
    )
}

function MainScreen({ navigation, user, dispatchLogOut }) {

    const onLogout = async () => {
        try {
            await logout();
            dispatchLogOut();
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <NavBar onPress={() => navigation.goBack()} title='Ayarlar' />
            <ButtonCard onPress={() => navigation.navigate('SettingsDetail')} style={styles.buttonCard} title='Profil ayarları' />
            <ButtonCard onPress={onLogout} style={styles.buttonCard} title='Çıkış yap' />
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.userReducer
});

mapDispatchToProps = {
    dispatchLogOut: () => actionLogout()
};

MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainScreen);



const Stack = createStackNavigator();
function SettingsScreen({ }) {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='SettingsMain' component={MainScreen} />
            <Stack.Screen name='SettingsDetail' component={DetailsScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 15,
        marginHorizontal: 15
    },
    buttonCard:
    {
        marginTop: 15,
    }
})


export default SettingsScreen;