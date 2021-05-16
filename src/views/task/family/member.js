import * as React from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import NavBar from '../../components/nav-bar';
import Input from '../../components/input';
import Select from '../../components/select';
import { Plus } from '../../components/icons';
import Button from '../../components/button';
import styles from './style';

function MemberScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} title='Aile Üyesi Ekle' />
            <ScrollView>
                <Input style={styles.input} placeholder='İsim' />
                <Input style={styles.input} placeholder='Kimlik Numarası' />
                <Select style={styles.input} placeholder='Cinsiyet' />
                <Input style={styles.input} placeholder='Akrabalık Derecesi' />
                <Input style={styles.input} placeholder='Doğum Yılı' />
                <Input style={styles.input} placeholder='Gelir' />
                <Input style={styles.input} placeholder='Meslek' />
                <Input style={styles.input} placeholder='Beden' />
                <Input style={styles.input} placeholder='Hastalık / Engel' />
                <Input style={styles.input} placeholder='Okul' />
                <Input style={styles.input} placeholder='Sınıf' />
                <Input style={styles.input} placeholder='Not' />
                <Button title='Ekle' Icon={Plus} />
                <View style={styles.empty} />
            </ScrollView>
        </View>
    )
}

export default MemberScreen;