import * as React from 'react';

import { View, ScrollView, Modal } from 'react-native';


import { NavBar, Input, Dialog } from '../../../../components/';

import styles from './style';

import * as FamilyModel from '../../../../models/family';
import FormScreen from './form';
import mountPreventGoingBack from './utils';



class NoteScreen extends FormScreen {
    constructor(props) {
        super(FamilyModel.Note, 'FamilyNote', props);
        mountPreventGoingBack.bind(this)();
    }

    static title(model) {
        return model.statement.substring(0, 20) + (model.statement?.length > 20 ? '...' : ' ');
    }

    static expl(model) {
        return null;
    }

    formIsValid() {
        return this.state.model.statement;
    }

    render() {
        const note = this.state.model;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <NavBar onPress={navigation.goBack()} onTick={() => this.onTick()} title={`Not ${this.isEdit() ? 'Düzenle' : 'Ekle'}`} />
                <ScrollView>
                    <Input value={note.statement} multiline={true} onChangeText={e => this.handleChange(e, 'statement')} style={{ ...styles.input, paddingVertical: 30 }} placeholder='Not' />
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