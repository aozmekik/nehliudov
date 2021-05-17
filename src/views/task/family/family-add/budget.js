import * as React from 'react';

import { View, ScrollView } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import { Plus } from '../../../../components/icons';
import Select from '../../../../components/select';
import Button from '../../../../components/button';
import styles from './style';


function BudgetScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} title='Bütçe Ekle' />
            <ScrollView>
                <Select style={styles.input} placeholder='Tip' />
                <Input style={styles.input} placeholder='Bütçe Adı' />
                <Input style={styles.input} placeholder='Tutar' />
                <Button title='Ekle' Icon={Plus} />
            </ScrollView>
        </View>
    )
}


export default BudgetScreen;