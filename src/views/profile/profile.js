import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { Notification, Settings } from '../../components/icons';

const Stack = createStackNavigator();

function ImageBox({ style }) {
    return (
        <TouchableOpacity style={{ ...style, width: '33%' }}>
            <Image style={styles.image} source={require('../../icons/photo.png')} />
        </TouchableOpacity>
    )
}

function Main() {
    return (
        <>
            <View style={{ marginTop: 50, marginLeft: 15, flexDirection: 'row' }} >
                <Image style={{ width: 51, height: 51 }} source={require('../../icons/woman.png')} />
                <View style={{ marginHorizontal: 15 }}>
                    <View style={{ flex: 1, flexDirection: 'row', }} >
                        <Text style={{ fontFamily: 'SFProText-Bold', fontSize: 24, color: '#0A151F', flexDirection: 'row' }}>Özge Yılmaz</Text>
                        <TouchableOpacity style={{ marginTop: 5, marginLeft: 50, marginRight: 10 }}>
                            <Notification />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 5 }}><Settings /></TouchableOpacity>
                    </View>
                    <Text style={{ fontFamily: 'SFProText-MediumItalic', fontSize: 12, color: '#0A151F' }}>Ümraniye Temsilcisi</Text>
                </View>
            </View>

            <ScrollView style={{ marginTop: 15 }} showsVerticalScrollIndicator={false} >
                <View style={{ flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View>
                <View style={{ marginTop: 2.5, flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View>
                {/* <View style={{ marginTop: 2.5, flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View>
                <View style={{ marginTop: 2.5, flexDirection: 'row' }}>
                    <ImageBox />
                    <ImageBox style={{ marginHorizontal: 2.5 }} />
                    <ImageBox />
                </View> */}
            </ScrollView>

        </>
    )
}

function ProfileScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={Main} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
});

export default ProfileScreen;