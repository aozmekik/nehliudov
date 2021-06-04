import * as React from 'react';

import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import { Bookmark, Time, Chat } from '../../components/icons';

// FIXME. bookmark button has huge width
function Post({ style, navigation, ...props }) {
    return (
        <View style={{ ...styles.container, ...style }} {...props}>
            <View style={styles.section1}>
                <Image style={styles.profile} source={require('../../icons/woman.png')} />
                <View style={styles.headerContent} >
                    <View style={styles.headerTitle}>
                        <Text style={styles.name}>Özge Yılmaz</Text>
                        <Text style={styles.district}>Ümraniye</Text>
                    </View>
                    <Text style={styles.title}>Ümraniye Temsilcisi</Text>
                </View>
            </View>

            <Image style={styles.image} source={require('../../icons/photo.png')} />
            <View style={styles.section2}>
                <TouchableOpacity style={styles.chat} ><Chat /></TouchableOpacity>
                <TouchableOpacity style={styles.bookmark}><Bookmark /></TouchableOpacity>
                < Time style={styles.time} />
            </View>
            <View style={{marginHorizontal: 5}}>
                <View style={styles.section3}>
                    <Text style={styles.name}>Özge Yılmaz</Text>
                    <Text style={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas egestas justo ex, efficitur elementum eros pretium at. Donec id bibendum libero, et facilisis est.
                <Text style={styles.elapsed}> 1 saat</Text>
                    </Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.comment}>4 yorumu gör</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderRadius: 10,
    },
    section1: {
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    profile: {
        width: 51,
        height: 51
    },
    section2: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerContent: {
        marginHorizontal: 10,
        flex: 1,
    },
    headerTitle: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#0A151F'
    },
    district: {
        fontFamily: 'SFProText-Medium',
        fontSize: 12
    },
    title: {
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 12
    },
    image: {
        marginTop: 10,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    chat: {
        flex: 1,
    },
    bookmark: {
        flex: 8,
    },
    time: {
        flex: 1,
    },
    section3: {
        flexDirection: 'row'
    },
    desc: {
        flex: 1,
        marginLeft: 5,
        fontFamily: 'SFProText-Regular',
        fontSize: 12
    },
    elapsed: {
        fontFamily: 'SFProText-RegularItalic',
        fontSize: 12,
        color: '#48515B'
    },
    comment: {
        fontFamily: 'SFProText-Regular',
        fontSize: 12
    }
});

export default Post;

