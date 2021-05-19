import * as React from 'react';

import { View, ScrollView, Modal } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Dialog from '../../../../components/dialog';

import FormScreen from './form';
import styles from './style';

class NeedScreen extends FormScreen {
    constructor(props) {
        super(null, 'FamilyNeed', props);
    }

    static title(model) {
        return model.substring(0, 20) + (model.length > 20 ? '...' : ' ');
    }

    static expl(model) {
        return ' ';
    }

    formIsValid() {
        return this.state.model != null;
    }

    handeChange(e) {
        this.setState(prevState => ({ ...prevState, model: e }))
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <NavBar onPress={() => navigation.goBack()} onTick={() => this.onTick()} title={`İhtiyaç ${this.isEdit() ? 'Düzenle' : 'Ekle'}`} />
                <ScrollView>
                    <Input multiline={true} value={this.state.model} onChangeText={e => this.handeChange(e)} style={{ ...styles.input, paddingVertical: 30 }} placeholder='İhtiyaç' />
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setModalInvisible()}
                    >
                        <Dialog title='İhtiyaç alanı zorunludur' />
                    </Modal>
                </ScrollView>
            </View>
        )
    }

}


export default NeedScreen;