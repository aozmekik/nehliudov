import * as React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

import {NavBar, Input} from '../../components';

function Comment({ style }) {
    return (
        <View style={[styles.comment, style]}>
            <Image style={styles.profile} source={require('../../icons/woman.png')} />
            <View style={styles.content}>
                <Text style={styles.name}>Özge Yılmaz</Text>
                <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas egestas justo ex, efficitur elementum eros pretium at. Donec id bibendum libero, et facilisis est.
            <Text style={styles.elapsed}> 1 saat</Text>
                </Text>
            </View>
        </View>
    );
}


function CommentScreen({ style, navigation, ...props }) {

    return (
        <>
            <NavBar title='Yorumlar' />
            <Comment style={styles.firstComment} />
            <Comment />
            <Input placeholder='Yorum yazın' style={styles.input} />


        </>
    )
}

const styles = StyleSheet.create({
    profile: {
        width: 51,
        height: 51
    },
    content: {
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: 'column',
        width: '80%'
    },
    name: {
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#000000'
    },
    desc: {
        fontFamily: 'SFProText-Regular',
        fontSize: 12
    },
    elapsed: {
        fontFamily: 'SFProText-RegularItalic',
        fontSize: 12,
        color: '#48515B'
    },
    comment: {
        flexDirection: 'row',
        padding: 5,
    },
    firstComment: {
        borderBottomColor: '#EEF0F2',
        borderBottomWidth: 1.5
    },
    input: {
        marginTop: 20,
        marginHorizontal: 12.5,
    }
});

export default CommentScreen;