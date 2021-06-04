import * as React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Modal } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { connect } from 'react-redux'

import { Input, Button, Dialog } from '../../components';
import { User } from '../../models/user';

import { login, register } from '../../services/auth-services';


function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

import { login as actionLogin } from '../../reducers/actions';


function AuthScreen({ dispatchLogIn }) {
    // const [userForm, setUserForm] = React.useState({ ...new User(), email2: null, password2: null });
    const [userForm, setUserForm] = React.useState({ email: 'ahmed-semih@outlook.com', password: 'semih123' });

    const [loginScreen, setLoginScreen] = React.useState(true);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dialogText, setDialogText] = React.useState(' ');

    const handleChange = (key, e) => {
        setUserForm(prevState => ({ ...prevState, [key]: e }));
    }

    const userJSON = () => {
        return { email: userForm.email, password: userForm.password };
    }

    const onLogin = async () => {
        if (checkNull('email', 'E-posta') || checkNull('password', 'Şifre'))
            return;
        if (checkCond(!isEmail(userForm.email), 'Geçerli bir e-posta giriniz'))
            return;

        try {
            const { res, json } = await login(userForm);
            if (json.errorCode === 1)
                showModal('Hatalı bir e-posta ya da şifre girdiniz');
            else if (json.errorCode === 2)
                showModal('E-Posta doğrulanmamış. Mailinizi kontrol edin.');
            else if (json.errorCode === 3)
                showModal('Hesabınız henüz doğrulanmamış.');
            else
                dispatchLogIn({ ...json.user, token: json.token })

        }
        catch (e) {
            console.error(e);
        }
    };

    const checkCond = (cond, text) => {
        if (cond) {
            showModal(text);
            return true;
        }
        return false;
    }

    const checkNull = (key, text) => {
        if (!userForm[key]) {
            showModal(`${text} alanı zorunludur`);
            return true;
        }
        return false;
    }


    const onRegister = async () => {
        if (checkNull('name', 'Ad Soyad') || checkNull('email', 'E-posta') || checkNull('password', 'Şifre'))
            return;
        if (checkCond(!isEmail(userForm.email), 'Geçerli bir e-posta giriniz'))
            return;
        if (checkCond(userForm.email != userForm.email2, 'E-Postalar uyuşmuyor'))
            return;
        if (checkCond(userForm.password != userForm.password2, 'Şifreler uyuşmuyor'))
            return;

        try {
            const res = await register(userForm);
            if (res.status === 500)
                showModal('E-Posta sistemde zaten kayıtlıdır');
            else if (res.status === 200) {
                showModal('E-Mail adresinize doğrulama kodu gönderilmiştir.');
                changeScreen();
            }
        } catch (e) {
            console.error(e);
        }

        console.log('do register');
    };

    const showModal = (text) => {
        setDialogText(text);
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 2000);
    }

    const changeScreen = () => {
        setUserForm({ name: null, password: null, email: null, email2: null, password2: null });
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
                <Dialog style={styles.dialog} title={dialogText} />
            </Modal>
            {loginScreen ?
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../../assets/logo/small-logo.png')} />
                    <Input value={userForm.email} style={styles.input} onChangeText={(e) => handleChange('email', e)} placeholder='E-Posta' />
                    <Input value={userForm.password} style={styles.input} onChangeText={(e) => handleChange('password', e)} secureTextEntry={true} placeholder='Şifre' />
                    <Button color='#0A151F' onPress={onLogin} big={true} style={[styles.input, styles.button]} title='Giriş Yap' />
                    <TouchableOpacity onPress={changeScreen} ><Text style={styles.text}>Üye Ol</Text></TouchableOpacity>
                </View>
                :
                <View style={styles.container}>
                    <Input value={userForm.name} style={styles.input} onChangeText={(e) => handleChange('name', e)} placeholder='Ad Soyad' />
                    <Input value={userForm.email} style={styles.input} onChangeText={(e) => handleChange('email', e)} placeholder='E-Posta' />
                    <Input value={userForm.email2} style={styles.input} onChangeText={(e) => handleChange('email2', e)} placeholder='E-Posta Tekrar' />
                    <Input value={userForm.password} style={styles.input} onChangeText={(e) => handleChange('password', e)} secureTextEntry={true} placeholder='Şifre' />
                    <Input value={userForm.password2} style={styles.input} onChangeText={(e) => handleChange('password2', e)} secureTextEntry={true} placeholder='Şifre Tekrar' />
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
    },
    dialog: {
        marginTop: hp('82%')
    }
});

const mapStateToProps = (state) => ({
    user: state.userReducer
});

mapDispatchToProps = {
    dispatchLogIn: (user) => actionLogin(user)
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);