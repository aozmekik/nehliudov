import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Input, Button, Dialog } from '../../components';
import { User } from '../../models/user';

function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function AuthScreen() {
    const [user, setUser] = React.useState({ ...new User(), email2: null, password2: null });
    const [loginScreen, setLoginScreen] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dialogText, setDialogText] = React.useState(' ');

    const handleChange = (key, e) => {
        setUser(prevState => ({ ...prevState, [key]: e }));
    }


    const onLogin = () => {
        if (checkNull('email', 'E-posta') || checkNull('password', 'Şifre'))
            return;
        if (checkCond(!isEmail(user.email), 'Geçerli bir e-posta giriniz'))
            return;

        console.log('do login');
    };

    const checkCond = (cond, text) => {
        if (cond) {
            setDialogText(text);
            showModal();
            return true;
        }
        return false;
    }

    const checkNull = (key, text) => {
        if (!user[key]) {
            setDialogText(`${text} alanı zorunludur`);
            showModal();
            return true;
        }
        return false;
    }


    const onRegister = () => {
        if (checkNull('email', 'E-posta') && checkNull('password', 'Şifre'))
            return;
        if (checkCond(!isEmail(user.email), 'Geçerli bir e-posta giriniz'))
            return;
        if (checkCond(user.email != user.email2, 'E-Postalar uyuşmuyor'))
            return;
        if (checkCond(user.password2 != user.password2, 'Şifreler uyuşmuyor'))
            return;

        console.log('do register');
    };

    const showModal = () => {
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 2000);
    }

    const changeScreen = () => {
        setUser({ name: null, password: null, email: null, email2: null, password2: null });
        setLoginScreen(!loginScreen);
    }

    return (
        <>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Dialog title={dialogText} />
            </Modal>
            {loginScreen ?
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../../assets/logo/small-logo.png')} />
                    <Input value={user.email} style={styles.input} onChangeText={(e) => handleChange('email', e)} placeholder='E-Posta' />
                    <Input value={user.password} style={styles.input} onChangeText={(e) => handleChange('password', e)} secureTextEntry={true} placeholder='Şifre' />
                    <Button color='#0A151F' onPress={onLogin} big={true} style={[styles.input, styles.button]} title='Giriş Yap' />
                    <TouchableOpacity onPress={changeScreen} ><Text style={styles.text}>Üye Ol</Text></TouchableOpacity>
                </View>
                :
                <View style={styles.container}>
                    <Input value={user.name} style={styles.input} onChangeText={(e) => handleChange('name', e)} placeholder='Ad Soyad' />
                    <Input value={user.email} style={styles.input} onChangeText={(e) => handleChange('email', e)} placeholder='E-Posta' />
                    <Input value={user.email2} style={styles.input} onChangeText={(e) => handleChange('email2', e)} placeholder='E-Posta Tekrar' />
                    <Input value={user.password} style={styles.input} onChangeText={(e) => handleChange('password', e)} secureTextEntry={true} placeholder='Şifre' />
                    <Input value={user.password2} style={styles.input} onChangeText={(e) => handleChange('password2', e)} secureTextEntry={true} placeholder='Şifre Tekrar' />
                    <Button color='#0A151F' onPress={onRegister} big={true} style={[styles.button, styles.input]} title='Üye Ol' />
                    <TouchableOpacity onPress={changeScreen}><Text style={styles.text}>Giriş Yap</Text></TouchableOpacity>
                </View>
            }
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2'
    },
    image: {
        width: wp('30%'),
        height: undefined,
        aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 20
    },
    input: {
        marginTop: 10,
        marginHorizontal: 15,
    },
    button: {
        backgroundColor: '#E8EAED',
    },
    text: {
        color: '#48515B',
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        alignSelf: 'center',
        marginTop: 20
    }
});

export default AuthScreen;