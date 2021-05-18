import * as React from 'react';

import { View, ScrollView, Modal } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import Dialog from '../../../../components/dialog';
import styles from './style';

import * as FamilyModel from '../../../../models/family';
import FormScreen from './form';


class MemberScreen extends FormScreen {
    constructor(props) {
        super(FamilyModel.Member, 'Member', props);
    }

    getTitle() {
        return this.state.model.name;
    }

    getExpl() {
        const member = this.state.model;
        return member.birthyear ? new Date().getFullYear() - member.birthyear : null;
    }

    formIsValid() {
        return this.state.model.name != null;
    }


    render() {
        const { navigation } = this.props;
        const member = this.state.model;
        return (
            <View style={styles.container}>
                <NavBar onPress={() => navigation.goBack()} onTick={() => this.onTick()} title={`Aile Üyesi ${this.isEdit() ? 'Düzenle' : 'Ekle'}`} />
                <ScrollView>
                    <Input value={member.name} onChangeText={e => this.handleChange(e, 'name', 'alpha')} style={styles.input} required={true} placeholder='İsim' />
                    <Input value={member.idNo} onChangeText={e => this.handleChange(e, 'idNo', 'numeric')} keyboardType='number-pad' maxLength={11} style={styles.input} placeholder='Kimlik Numarası' />
                    <Select value={member.gender} onValueChange={e => this.handleChange(e, 'gender')} items={FamilyModel.genderList} style={styles.input} placeholder='Cinsiyet' />
                    <Input value={member.kinship} onChangeText={e => this.handleChange(e, 'kinship', 'alpha')} style={styles.input} placeholder='Akrabalık Derecesi' />
                    <Input value={member.birthyear} onChangeText={e => this.handleChange(e, 'birthyear')} keyboardType='number-pad' maxLength={4} style={styles.input} placeholder='Doğum Yılı' />
                    <Input value={member.income} onChangeText={e => this.handleChange(e, 'income')} keyboardType='number-pad' style={styles.input} placeholder='Gelir' />
                    <Input value={member.job} onChangeText={e => this.handleChange(e, 'job', 'alpha')} style={styles.input} placeholder='Meslek' />
                    <Input value={member.size} onChangeText={e => this.handleChange(e, 'size')} style={styles.input} placeholder='Beden' />
                    <Input value={member.disease} onChangeText={e => this.handleChange(e, 'disease')} style={styles.input} placeholder='Hastalık / Engel' />
                    <Input value={member.school} onChangeText={e => this.handleChange(e, 'school')} style={styles.input} placeholder='Okul' />
                    <Input value={member.grade} onChangeText={e => this.handleChange(e, 'grade', 'numeric')} keyboardType='number-pad' style={styles.input} placeholder='Sınıf' />
                    <Input value={member.note} onChangeText={e => this.handleChange(e, 'note')} style={styles.input} placeholder='Not' />
                    <View style={styles.empty} />
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setModalInvisible()}
                    >
                        <Dialog title='İsim Alanı Zorunludur' />
                    </Modal>
                </ScrollView >
            </View >
        )
    }

}

export default MemberScreen;