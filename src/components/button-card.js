import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

import { ChevronRight, Check } from './icons';


function ButtonCard({ title, desc, style, selected, image, ...props }) {
    const selectedStyle = { borderWidth: 1, borderColor: '#E11E3C' };

    return (
        <>
            {!image ?
                <TouchableOpacity {...props} style={[styles.container, style, selected ? selectedStyle : null]}>
                    <View style={styles.textContainer}>
                        <Text style={[styles.title, style?.text]}>
                            {title}
                        </Text>
                        {desc && <Text style={styles.desc}>{desc}</Text>}
                    </View>
                    {selected ? <Check fill="#E11E3C" /> : <ChevronRight />}
                </TouchableOpacity>
                :
                <TouchableOpacity delayPressIn={50} style={[styles.imageContainer, style]} {...props}>
                    <Image style={styles.image} source={{uri: image}} />
                    {selected && <Check style={{ marginTop: 10, marginLeft: -30, backgroundColor: '#FFFFFF', borderRadius: 10 }} fill="#E11E3C" />}
                </TouchableOpacity>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        color: '#0A151F',
        fontFamily: 'SFProText-Bold',
        fontSize: 14
    },
    desc: {
        marginLeft: 5,
        color: '#758291',
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 14
    },
    imageContainer: {
        flexDirection: 'row',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
});

export default ButtonCard;
