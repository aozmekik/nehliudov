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


function BudgetScreen({ navigation, route }) {
    const isEdit = () => { return route.params?.model }
    const [budget, setBudget] = React.useState(isEdit() ? route.params.model : new FamilyModel.Budget());

    const handleChange = (event, name, type) => {
        Validator.setWithValidation(event, type, (text) => setBudget({ ...budget, [name]: text }));
    };

    const getExpl = () => {
        let text;
        switch (budget.type) {
            case FamilyModel.BudgetType.EXPENSE:
                text = `-${budget.amount}₺`;
                break;
            case FamilyModel.BudgetType.INCOME:
                text = `+${budget.amount}₺`;
                break;
            case FamilyModel.BudgetType.BILL:
                text = `Mukavele:${budget.amount}`;
                break;
            default:
                text = ' ';
                break;
        }
        return text;
    }

    const pushBudget = () => navigation.navigate({
        name: 'Main',
        params: {
            model: budget,
            title: budget.name,
            expl: getExpl(),
            key: 'Budget',
            index: isEdit() ? route.params.index : null
        },
        merge: true
    });


    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} onTick={pushBudget} title={`Bütçe ${isEdit()? 'Düzenle': 'Ekle'}`} />
            <ScrollView>
                <Select value={budget.type} onValueChange={e => handleChange(e, 'type')} items={FamilyModel.budgetList} style={styles.input} placeholder='Tip' />
                <Input required={true} value={budget.name} onChangeText={e => handleChange(e, 'name')} style={styles.input} placeholder='Bütçe Adı' />
                <Input required={true} value={budget.amount} onChangeText={e => handleChange(e, 'amount', 'numeric')} keyboardType='number-pad' style={styles.input} placeholder='Tutar' />
            </ScrollView>
        </View>
    )
}


export default BudgetScreen;