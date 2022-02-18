import * as React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";

import { connect } from 'react-redux';

import { Search, More } from '../../components/icons';
import TaskCard from '../../components/task/task-card';
import { Dialog } from '../../components';
import FamilyScreen from './family/family';
import SearchUserScreen from '../timeline/search-user';
import Detail from '../timeline/detail';
import ProfileScreen from '../profile/profile';

import { restoreUser } from '../../reducers/actions';
import { getCurrentUser } from '../../services/auth-services';


function TaskMain({ userReducer, navigation, dispatchRestoreUser }) {
    const refRBSheet = React.useRef();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [dialog, setDialog] = React.useState(false);


    const canDo = async () => {
        const restoredUser = await getCurrentUser();
        console.log(restoredUser);
        if (restoredUser)
            dispatchRestoreUser(restoredUser);
        return restoredUser.role != 0;
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
        <>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={hp('70%')}
                customStyles={{
                    container: {
                        borderRadius: 10
                    },
                    draggableIcon: {
                    }
                }}
            >
                <Detail />
            </RBSheet>
            <View style={styles.header}>
                <TouchableOpacity style={styles.search} onPress={() => navigation.navigate('TimelineSearchUser')}><Search fill='black' /></TouchableOpacity>
                <TouchableOpacity style={styles.more} onPress={() => refRBSheet.current.open()}><More fill='black' /></TouchableOpacity>
            </View>
            <View style={styles.container} >
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <Dialog title={dialog} />
                </Modal>
                <TaskCard onPress={async () => {
                    const can = await canDo();
                    can ? navigation.navigate('TaskFamily') : showModal('Yetkiniz yok')
                }
                } style={styles.taskItem} title="Aile" desc="Kendi ailelerinizi listeleyin, ekleyin ve düzenleyin" />
                {/* <TaskCard onPress={() => showModal('Henüz değil')} style={styles.taskItem} title="Faaliyet" desc="Bölgenizdeki faaliyetlere katılın, faaliyet planlayın" /> */}

            </View>
        </>
    );
}


const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

const mapDispatchToProps = {
    dispatchRestoreUser: (user) => restoreUser(user)
};

TaskMain = connect(mapStateToProps, mapDispatchToProps)(TaskMain);


const Stack = createStackNavigator();

function TaskScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='TaskMain' component={TaskMain} />
            <Stack.Screen name='TaskFamily' component={FamilyScreen} />
            <Stack.Screen name='TimelineSearchUser' component={SearchUserScreen} />
            <Stack.Screen name='TimelineProfile' component={ProfileScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 10,
        height: '100%',
    },

    taskItem: {
        marginTop: 10
    },
    header: {
        // position: ',
        paddingTop: 30,
        paddingHorizontal: 5,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    search: {
        marginTop: 15,
        marginLeft: 10,
    },
    more: {
        marginTop: 10,
        marginRight: 10,
    },

})


export default TaskScreen;