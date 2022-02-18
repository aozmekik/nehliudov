import * as React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";

import { connect } from 'react-redux';


import { More, Search } from '../../components/icons';
import Detail from './detail';
import SearchUserScreen from './search-user';
import ProfileScreen from '../profile/profile';

import { restoreUser } from '../../reducers/actions';

function TimelineMainScreen({ navigation, route, dispatchRestoreUser }) {
    const refRBSheet = React.useRef();
    return (<View>
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
    </View >
    );
}

mapDispatchToProps = {
    dispatchRestoreUser: (user) => restoreUser(user)
};

TimelineMainScreen = connect(null, mapDispatchToProps)(TimelineMainScreen);

const Stack = createStackNavigator();

function TimelineScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='TimelineMain' component={TimelineMainScreen} />
            <Stack.Screen name='TimelineSearchUser' component={SearchUserScreen} />
            <Stack.Screen name='TimelineProfile' component={ProfileScreen} />

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
        paddingTop: 25,
        paddingBottom: 10,
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F2F2F2',
    },
    search: {
        marginTop: 15,
        marginLeft: 10,
    },
    more: {
        marginTop: 10,
        marginRight: 10,
    },
    camera: {
        marginLeft: '65%',
        marginTop: 10,
    },
    post: {
        marginBottom: 25,
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