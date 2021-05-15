import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, ScrollView, TextInput, Text } from 'react-native';

import NavBar from '../../components/nav-bar';
import { TickSquare, Plus } from '../../components/icons';
import Select from '../../components/select';
import Button from '../../components/button';


function PostAddScreen() {
    return (
        <>
            <NavBar title='Gönderi Ekle' />
            <TouchableOpacity style={styles.tickSquare}><TickSquare /></TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={styles.profile} source={require('../../icons/woman.png')} />
                    <TextInput style={{ flex: 1, marginLeft: 10, fontFamily: 'SFProText-Medium', fontSize: 12 }} placeholderTextColor='#48515B' placeholder='Açıklama yaz' />
                </View>
                <Select chevronColor='#183148' style={{ marginTop: 40 }} placeholder='İlçe' />
                <TouchableOpacity style={{
                    marginTop: 15,
                    flexDirection: 'row', backgroundColor: '#FFFFFF', borderRadius: 10, paddingVertical: 20, paddingHorizontal: 10
                }}>
                    <Text style={{ marginLeft: 5, flex: 1, fontFamily: 'SFProText-Regular', fontSize: 14, color: '#48515B' }}>Resim Ekleyin</Text>
                    <Plus style={{ marginRight: 5 }} stroke='#183148' />
                </TouchableOpacity>


            </ScrollView>

        </>
    )
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
});

export default PostAddScreen;