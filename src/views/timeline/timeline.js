import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";


import { Camera, More } from '../../components/icons';
import Post from './post';
import Comment from './comment';
import PostAddScreen from './post-add';
import Detail from './detail';



function Main({ navigation }) {
    const refRBSheet = React.useRef();
    return (<View>
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={hp('60%')}
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
            <TouchableOpacity onPress={() => navigation.navigate('PostAdd')}><Camera style={styles.camera} stroke='black' /></TouchableOpacity>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}><More style={styles.more} fill='black' /></TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Post style={styles.post} />
            <Post style={styles.post} />
        </ScrollView >
    </View>
    );
}

const Stack = createStackNavigator();

function TimelineScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='PostAdd' component={PostAddScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
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