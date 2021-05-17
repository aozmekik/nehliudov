import * as React from 'react';
import { ScrollView, Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import NavBar from '../../components/nav-bar';

function NotificationItem() {
    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.profile} source={require('../../icons/woman.png')} />
            <View style={styles.rightSection}>
                <Text style={styles.title}>Özge Yılmaz</Text>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus, elit nec euismod viverra.</Text>
            </View>
        </TouchableOpacity>
    )
}

function NotificationsScreen({ navigation }) {
    return (
        <>
            <NavBar onPress={() => navigation.goBack()} title='Bildirimler' />
            <ScrollView>
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 20
    },
    profile: {
        width: 51,
        height: 51
    },
    rightSection: {
        marginLeft: 15,
        width: '75%'
    },
    title: {
        fontFamily: 'SFProText-Bold',
        fontSize: 12,
        color: '#0A151F'
    },
    desc: {
        fontFamily: 'SFProText-Medium',
        fontSize: 12,
        color: '#0A151F'
    }
});
export default NotificationsScreen;