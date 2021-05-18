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



function NoteScreen({ navigation, route }) {
    const isEdit = () => { return route.params?.model }
    const [note, setNote] = React.useState(isEdit() ? route.params.model : new FamilyModel.Note());

    const handleChange = (event, name, type) => {
        Validator.setWithValidation(event, type, (text) => setNote({ ...note, [name]: text }));
    };


    const pushNeed = () => navigation.navigate({
        name: 'Main',
        params: {
            model: note,
            title: note.statement.substring(0, 20) + (note.statement?.length > 20 ? '...' : ' '),
            expl: `${note.rating}/5`,
            key: 'Note',
            index: isEdit() ? route.params.index : null
        },
        merge: true
    });


    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} onTick={pushNeed} title={`Not ${isEdit()? 'Düzenle': 'Ekle'}`} />
            <ScrollView>
                <Select value={note.rating} onValueChange={e => handleChange(e, 'rating')} items={FamilyModel.commentList} style={styles.input} placeholder='İhtiyaç Derecesi' />
                <Input value={note.statement} onChangeText={e => handleChange(e, 'statement')} style={styles.input} placeholder='Not' />
                <Input editable={false} style={styles.input} placeholder='Tespit Edenler' />
            </ScrollView>
        </View>
    )
}


export default NoteScreen;