import * as React from 'react';

import { View, ScrollView, Modal } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Dialog from '../../../../components/dialog';
import styles from './style';


function NeedScreen({ navigation, route }) {
    const isEdit = () => { return route.params?.model }
    const [need, setNeed] = React.useState(isEdit() ? route.params.model : null);
    const [modalVisible, setModalVisible] = React.useState(false);

    const pushNeed = () => navigation.navigate({
        name: 'Main',
        params: {
            model: need,
            title: need?.substring(0, 20) + (need.length > 20 ? '...' : ' '),
            expl: ' ',
            key: 'Need',
            index: isEdit() ? route.params.index : null
        },
        merge: true
    });

    const showModal = () => {
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 2000);
    }

    const formIsValid = () => need != null;

    const onTick = () => {
        if (formIsValid())
            pushNeed();
        else
            showModal();
    }

    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} onTick={onTick} title={`İhtiyaç ${isEdit() ? 'Düzenle' : 'Ekle'}`} />
            <ScrollView>
                <Input multiline={true} value={need} onChangeText={e => setNeed(e)} style={{ ...styles.input, paddingVertical: 30 }} placeholder='İhtiyaç' />
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Dialog title='İhtiyaç alanı zorunludur' />
                </Modal>
            </ScrollView>
        </View>
    )
}


export default NeedScreen;