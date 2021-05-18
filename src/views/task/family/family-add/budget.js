import * as React from 'react';

import { View, ScrollView } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import { Plus } from '../../../../components/icons';
import Select from '../../../../components/select';
import Button from '../../../../components/button';
import styles from './style';

import * as FamilyModel from '../../../../models/family';
import * as Validator from '../../../../utils/validator';


function BudgetScreen({ navigation }) {
    const [budget, setBudget] = React.useState(new FamilyModel.Budget());

    const handleChange = (event, name, type) => {
        event = Validator.validateText(event, type);
        setBudget({ ...budget, [name]: event });
    };

    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} title='Bütçe Ekle' />
            <ScrollView>
                <Select value={budget.type} onValueChange={e => handleChange(e, 'type')} items={FamilyModel.budgetList} style={styles.input} placeholder='Tip' />
                <Input required={true} value={budget.name} onChangeText={e => handleChange(e, 'name')} style={styles.input} placeholder='Bütçe Adı' />
                <Input value={budget.amount} onChangeText={e => handleChange(e, 'amount', 'numeric')} keyboardType='number-pad' style={styles.input} placeholder='Tutar' />
                <Button title='Ekle' Icon={Plus} />
            </ScrollView>
        </View>
    )
}


export default BudgetScreen;