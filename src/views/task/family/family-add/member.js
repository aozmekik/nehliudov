import * as React from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import { Plus } from '../../../../components/icons';
import Button from '../../../../components/button';
import styles from './style';

import * as FamilyModel from '../../../../models/family';
import * as Validator from '../../../../utils/validator';



function MemberScreen({ navigation, route }) {
    const isEdit = () => { return route.params?.model }

    const [member, setMember] = React.useState(isEdit() ? route.params.model : new FamilyModel.Member());

    const handleChange = (event, name, type) => {
        Validator.setWithValidation(event, type, (text) => setMember({ ...member, [name]: text }));
    };

    const pushMember = () => navigation.navigate({
        name: 'Main',
        params: {
            model: member,
            title: member.name,
            expl: member.birthyear ? new Date().getFullYear() - member.birthyear : null,
            key: 'Member',
            index: isEdit() ? route.params.index : null
        },
        merge: true
    });

    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} onTick={pushMember} title={`Aile Üyesi ${isEdit()? 'Düzenle': 'Ekle'}`} />
            <ScrollView>
                <Input value={member.name} onChangeText={e => handleChange(e, 'name', 'alpha')} style={styles.input} required={true} placeholder='İsim' />
                <Input value={member.idNo} onChangeText={e => handleChange(e, 'idNo', 'numeric')} keyboardType='number-pad' maxLength={11} style={styles.input} placeholder='Kimlik Numarası' />
                <Select value={member.gender} onValueChange={e => handleChange(e, 'gender')} items={FamilyModel.genderList} style={styles.input} placeholder='Cinsiyet' />
                <Input value={member.kinship} onChangeText={e => handleChange(e, 'kinship', 'alpha')} style={styles.input} placeholder='Akrabalık Derecesi' />
                <Input value={member.birthyear} onChangeText={e => handleChange(e, 'birthyear')} keyboardType='number-pad' maxLength={4} style={styles.input} placeholder='Doğum Yılı' />
                <Input value={member.income} onChangeText={e => handleChange(e, 'income')} keyboardType='number-pad' style={styles.input} placeholder='Gelir' />
                <Input value={member.job} onChangeText={e => handleChange(e, 'job', 'alpha')} style={styles.input} placeholder='Meslek' />
                <Input value={member.size} onChangeText={e => handleChange(e, 'size')} style={styles.input} placeholder='Beden' />
                <Input value={member.disease} onChangeText={e => handleChange(e, 'disease')} style={styles.input} placeholder='Hastalık / Engel' />
                <Input value={member.school} onChangeText={e => handleChange(e, 'school')} style={styles.input} placeholder='Okul' />
                <Input value={member.grade} onChangeText={e => handleChange(e, 'grade', 'numeric')} keyboardType='number-pad' style={styles.input} placeholder='Sınıf' />
                <Input value={member.note} onChangeText={e => handleChange(e, 'note')} style={styles.input} placeholder='Not' />
                <View style={styles.empty} />
            </ScrollView>
        </View>
    )
}

export default MemberScreen;