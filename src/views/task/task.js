import * as React from 'react';
import { View, StyleSheet, Modal } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import TaskCard from '../../components/task/task-card';
import { Dialog } from '../../components';
import FamilyScreen from './family/family';

import { connect } from 'react-redux';


function TaskMain({ userReducer, navigation }) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dialog, setDialog] = React.useState(false);


    const canDo = () => {
        return userReducer.user.role != 0;
    }

    const showModal = (dialog) => {
        if (dialog)
            setDialog(dialog);
        setModalVisible(true)
        setTimeout(() => {
            setModalVisible(false)
        }, 2000);
    }


    return (
        <View style={styles.container} >
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Dialog title={dialog} />
            </Modal>
            <TaskCard onPress={() => { canDo() ? navigation.navigate('TaskFamily') : showModal('Yetkiniz yok') }} style={styles.taskItem} title="Aile" desc="Kendi ailelerinizi listeleyin, ekleyin ve düzenleyin" />
            <TaskCard onPress={() => showModal('Daha orayı kodlamadım')} style={styles.taskItem} title="Stok" desc="Tüm bölgelerdeki stokları görüntüleyin, stok ekleyin ve düzenleyin" />
            <TaskCard onPress={() => showModal('Orayı da kodlamadım')} style={styles.taskItem} title="Faaliyet" desc="Bölgenizdeki faaliyetlere katılın, faaliyet planlayın" />
            <TaskCard onPress={() => showModal('Çok yakında...')} style={styles.taskItem} title="Sağlık" desc="Tüm bölgelerdeki kan ihtiyacını görüntüleyin, kan vermek için iletişime geçin" />

        </View>
    );
}


const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

TaskMain = connect(mapStateToProps)(TaskMain);


const Stack = createStackNavigator();

function TaskScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='TaskMain' component={TaskMain} />
            <Stack.Screen name='TaskFamily' component={FamilyScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 50,
        height: '100%',
    },

    taskItem: {
        marginTop: 10
    }

})


export default TaskScreen;