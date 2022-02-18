// async loadLoginInfo() {
//     const loggedIn = await AuthServices.isLoggedIn();
//     this.setState(prevState => ({ ...prevState, loginLoaded: true, isLoggedIn: loggedIn }));
// }

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { connect } from 'react-redux';


import TabBar from '../components/tab-bar';
import ProfileScreen from './profile/profile';
import TaskScreen from './task/task';
import HomeScreen from './home';
import AuthScreen from './auth/auth';


import { restoreUser } from '../reducers/actions';
import { isLoggedIn, getCurrentUser } from '../services/auth-services';
import TimelineScreen from './timeline/timeline';

const Tab = createBottomTabNavigator();



function MainScreen({ userReducer, dispatchRestoreUser }) {
    // console.log(userReducer);
    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
        async function getUser() {

            let restoredUser = null;
            try {
                const loggedIn = await isLoggedIn();
                if (loggedIn)
                    restoredUser = await getCurrentUser();
            } catch (e) {
                console.error(e);
            }

            if (restoredUser)
                dispatchRestoreUser(restoredUser);
            setReady(true);
        }

        getUser();
    }, []);

    if (!ready)
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' style={styles.image} color='#000000' />
            </View>);
    else if (userReducer.user == null)
        return (<AuthScreen />);
    else {
        return (
            // FIXME. change this to view. or nothing
            // <SafeAreaView style={styles.container} >
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Task" tabBar={props => <TabBar {...props} />}>
                    <Tab.Screen name="Task" component={TaskScreen} />
                    <Tab.Screen name="Home" component={TimelineScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ self: true }} />
                </Tab.Navigator>
            </NavigationContainer>
            // </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#F2F2F2'
    },
});

const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

mapDispatchToProps = {
    dispatchRestoreUser: (user) => restoreUser(user)
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);