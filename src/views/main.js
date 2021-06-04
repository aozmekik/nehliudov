// async loadLoginInfo() {
//     const loggedIn = await AuthServices.isLoggedIn();
//     this.setState(prevState => ({ ...prevState, loginLoaded: true, isLoggedIn: loggedIn }));
// }

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { connect } from 'react-redux';


import TabBar from '../components/tab-bar';
import ProfileScreen from './profile/profile';
import TaskScreen from './task/task';
import TimelineScreen from './timeline/timeline';
import HomeScreen from './home';
import AuthScreen from './auth/auth';


import { restoreUser } from '../reducers/actions';
import { isLoggedIn, getCurrentUser } from '../services/auth-services';

const Tab = createBottomTabNavigator();

function MainScreen({ userReducer, dispatchRestoreUser }) {

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
        }

        getUser();
    }, []);

    if (userReducer.user == null)
        return (<AuthScreen />);
    else {
        return (
            <SafeAreaView style={styles.container} >
                <NavigationContainer>
                    <Tab.Navigator initialRouteName="Home" tabBar={props => <TabBar {...props} />}>
                        <Tab.Screen name="Task" component={TaskScreen} />
                        <Tab.Screen name="Home" component={HomeScreen} />
                        <Tab.Screen name="Profile" component={ProfileScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

mapDispatchToProps = {
    dispatchRestoreUser: (user) => restoreUser(user)
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);