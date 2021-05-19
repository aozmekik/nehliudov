import * as React from 'react';

import { View, ScrollView, Modal } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import Dialog from '../../../../components/dialog';
import styles from './style';

import * as FamilyModel from '../../../../models/family';
import FormScreen from './form';

class BudgetScreen extends FormScreen {
    constructor(props) {
        super(FamilyModel.Budget, 'Budget', props);
    }

    static title(model) {
        return model.name;
    }

    static expl(model) {
        let text;
        const budget = model;
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


    formIsValid() {
        const budget = this.state.model;
        return budget.name != null && budget.type != null && budget.amount != null;
    }

    render() {
        const budget = this.state.model;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <NavBar onPress={() => navigation.goBack()} onTick={() => this.onTick()} title={`Bütçe ${this.isEdit() ? 'Düzenle' : 'Ekle'}`} />
                <ScrollView>
                    <Select value={budget.type} onValueChange={e => this.handleChange(e, 'type')} items={FamilyModel.budgetList} style={styles.input} placeholder='Tip' />
                    <Input required={true} value={budget.name} onChangeText={e => this.handleChange(e, 'name')} style={styles.input} placeholder='Bütçe Adı' />
                    <Input required={true} value={budget.amount} onChangeText={e => this.handleChange(e, 'amount', 'numeric')} keyboardType='number-pad' style={styles.input} placeholder='Tutar' />
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setModalInvisible()}
                    >
                        <Dialog title='Tüm alanlar zorunludur' />
                    </Modal>
                </ScrollView>
            </View>
        )
    }

}


export default BudgetScreen;