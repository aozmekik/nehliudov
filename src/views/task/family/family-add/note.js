import * as React from 'react';

import { View, ScrollView, Modal } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import Dialog from '../../../../components/dialog';
import styles from './style';


import * as FamilyModel from '../../../../models/family';
import FormScreen from './form';



class NoteScreen extends FormScreen {
    constructor(props) {
        super(FamilyModel.Note, 'FamilyNote', props);
    }

    static title(model) {
        return model.statement.substring(0, 20) + (model.statement?.length > 20 ? '...' : ' ');
    }

    static expl(model) {
        return `${model.rating}/5`;
    }

    formIsValid() {
        return this.state.model.statement != null && this.state.model.rating != null && this.state.model.members;
    }

    render() {
        const note = this.state.model;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <NavBar onPress={() => navigation.goBack()} onTick={() => this.onTick()} title={`Not ${this.isEdit() ? 'Düzenle' : 'Ekle'}`} />
                <ScrollView>
                    <Select value={note.rating} onValueChange={e => this.handleChange(e, 'rating')} items={FamilyModel.commentList} style={styles.input} placeholder='İhtiyaç Derecesi' />
                    <Input value={note.statement} onChangeText={e => this.handleChange(e, 'statement')} style={styles.input} placeholder='Not' />
                    <Input editable={false} style={styles.input} placeholder='Tespit Edenler' />
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


export default NoteScreen;