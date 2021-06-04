import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, ScrollView, TextInput, Text } from 'react-native';

import { TickSquare, Plus } from '../../components/icons';
import { NavBar, Select } from '../../components';


function PostAddScreen({ navigation }) {
    return (
        <View>
            <NavBar onPress={() => navigation.goBack()} title='Gönderi Ekle' />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.tickSquare}><TickSquare /></TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.section1}>
                    <Image style={styles.profile} source={require('../../icons/woman.png')} />
                    <TextInput multiline={true} style={styles.input} placeholderTextColor='#48515B' placeholder='Açıklama yaz' />
                </View>
                {/* <Select chevronColor='#183148' style={styles.select} placeholder='İlçe' /> */}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Resim Ekleyin</Text>
                    <Plus style={styles.icon} stroke='#183148' />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tickSquare: {
        position: 'absolute',
        top: 30,
        right: 15
    },
    profile: {
        width: 51,
        height: 51
    },
    scrollView: {
        margin: 10
    },
    section1: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontFamily: 'SFProText-Medium',
        fontSize: 12
    },
    select: {
        marginTop: 40
    },
    button: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    buttonText: {
        marginLeft: 5,
        flex: 1,
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        color: '#48515B'
    },
    icon: {
        marginRight: 7
    }
});

export default PostAddScreen;