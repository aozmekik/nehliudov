import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { Camera, More } from '../../components/icons';
import Post from './post';
import Comment from './comment';
import PostAddScreen from './post-add';
import Detail from './detail';


const Stack = createStackNavigator();

// bottom-sheet
function Main({ navigation }) {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (<>
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <Text>Selam</Text>
            </View>

        </Modal>
        <View style={styles.header}>
            <TouchableOpacity><Camera style={styles.camera} stroke='black' /></TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}><More style={styles.more} fill='black' /></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Post style={styles.post} />
            <Post style={styles.post} />
        </ScrollView >
    </>
    );
}

function TimelineScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={Main} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    header: {
        // position: ',
        top: 30,
        zIndex: 1,
        marginHorizontal: 10,
        // borderBottomWidth: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    post: {
        marginTop: 50,
        marginHorizontal: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default TimelineScreen;