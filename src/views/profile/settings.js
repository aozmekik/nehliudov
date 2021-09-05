import * as React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';


import { NavBar, ButtonCard, Input, Dialog } from '../../components';

import { connect } from 'react-redux'
import { logout } from '../../services/auth-services';
import { logout as actionLogout } from '../../reducers/actions';
import { changePassword } from '../../services/user-services';


function PasswordChangeScreen({ navigation }) {
    const [userForm, setUserForm] = React.useState({ old: null, password: null, password2: null });
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dialogText, setDialogText] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    // FIXME. logout on other devices
    const onChange = async () => {
        if (userForm.password != userForm.password2)
            showModal('Şifreler uyuşmuyor');
        else if (userForm.password.length < 8)
            showModal('Şifre 8 karakterden az olamaz');

        try {
            setLoading(true);
            const res = await changePassword(userForm.password);
            if (res.status === 404)
                showModal('Önceki şifreniz yanlış');
            else if (res.status === 200) {
                showModal('Şifreniz değiştirilmiştir');
                navigation.goBack();
            }
            setLoading(false);
        } catch (e) {
            console.error(e);
        }

    }

    const showModal = (text) => {
        setDialogText(text);
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 2000);
    }

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' style={styles.image} color='#000000' />
            </View>
        )
    }
    else {
        return (
            <>
                <NavBar onPress={() => navigation.goBack()} onTick={onChange} title='Şifre Değiştir' />
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Dialog title={dialogText} />
                </Modal>
                <Input style={styles.input} secureTextEntry={true} placeholder='Eski Şifre' />
                <Input style={styles.input} secureTextEntry={true} placeholder='Yeni Şifre' />
                <Input style={styles.input} secureTextEntry={true} placeholder='Yeni Şifre' />
            </>
        )
    }
}

function DetailsScreen({ navigation }) {
    return (
        <>
            <NavBar onPress={() => navigation.goBack()} title='Profil Ayarları' />
            {/* <ButtonCard  style={styles.buttonCard} title='Profil resmi değiştir' /> */}
            <ButtonCard onPress={() => navigation.navigate('PasswordChange')} style={styles.buttonCard} title='Şifre Değiştir' />
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
            {/* <ButtonCard onPress={() => navigation.navigate('SettingsDetail')} style={styles.buttonCard} title='Profil ayarları' /> */}
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
            <Stack.Screen name='PasswordChange' component={PasswordChangeScreen} />

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