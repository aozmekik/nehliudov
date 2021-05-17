import * as React from 'react';

import { View, ScrollView } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import { Plus } from '../../../../components/icons';
import Select from '../../../../components/select';
import Button from '../../../../components/button';
import styles from './style';


function NoteScreen({navigation}) {
    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} title='Not Ekle' />
            <ScrollView>
                <Select style={styles.input} placeholder='İhtiyaç Derecesi' />
                <Input style={styles.input} placeholder='Not' />
                <Input style={styles.input} placeholder='Tespit Edenler' />
                <Button title='Ekle' Icon={Plus} />
            </ScrollView>
        </View>
    )
}


export default NoteScreen;