import * as React from 'react';

import { View, ScrollView } from 'react-native';

import NavBar from '../../components/nav-bar';
import Input from '../../components/input';
import { Plus } from '../../components/icons';
import Select from '../../components/select';
import Button from '../../components/button';
import styles from './style';


function NeedScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} title='İhtiyaç Ekle' />
            <ScrollView>
                <Input style={{ ...styles.input, paddingVertical: 30 }} placeholder='İhtiyaç' />
                <Button title='Ekle' Icon={Plus} />
            </ScrollView>
        </View>
    )
}


export default NeedScreen;