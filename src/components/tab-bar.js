import * as React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Logo, Home, Profile, HomeActive, ProfileActive } from './icons';


function TabBar({ state, descriptors, navigation }) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const TaskButton = () => {
                    return (isFocused ? <HomeActive /> : <Home />);
                }

                const ProfileButton = () => {
                    return (isFocused ? <ProfileActive /> : <Profile />);
                }


                return label === 'Home' ? (
                    <View style={styles.midContainer} >
                        <TouchableOpacity key={label} style={[styles.button, styles.midButton]} onPress={onPress}>
                            <Logo />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity key={label} style={[styles.button, styles.cornerButton]} onPress={onPress}>
                        {label === 'Task' && <TaskButton />}
                        {label === 'Profile' && <ProfileButton />}

                        <View key={label} style={[
                            styles.selected,
                            isFocused ?
                                { backgroundColor: 'black' }
                                : { backgroundColor: 'white' }
                        ]} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        height: 56,
        paddingTop: 5,
        paddingBottom: 5
    },

    midContainer: {
        padding: 15,
        marginTop: -15,
        backgroundColor: 'white',
        borderRadius: 100
    },

    midButton: {
        borderRadius: 100,
        flex: 0

    },

    cornerButton: {
        marginTop: 10
    },

    selected: {
        width: 4,
        height: 4,
        marginTop: 6,
        borderRadius: 10,
        backgroundColor: 'black'
    }
});

export default TabBar;