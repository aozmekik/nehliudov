import * as React from 'react';
import { ScrollView, Image, View, Text, TouchableOpacity } from 'react-native';

import NavBar from '../../components/nav-bar';

function NotificationItem() {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15, marginTop: 20 }}>
            <Image style={{ width: 51, height: 51 }} source={require('../../icons/woman.png')} />
            <View style={{ marginLeft: 15, width: '75%' }}>
                <Text style={{ fontFamily: 'SFProText-Bold', fontSize: 12, color: '#0A151F' }}>Özge Yılmaz</Text>
                <Text style={{ fontFamily: 'SFProText-Medium', fontSize: 12, color: '#0A151F' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus faucibus, elit nec euismod viverra.</Text>
            </View>
        </TouchableOpacity>
    )
}

function NotificationsScreen() {
    return (
        <>
            <NavBar title='Bildirimler' />
            <ScrollView>
                <NotificationItem />
                <NotificationItem />
                <NotificationItem />
            </ScrollView>
        </>
    )
}

export default NotificationsScreen;