import * as React from 'react';

import { View, StyleSheet, Text, ScrollView, } from 'react-native';

import Swiper from 'react-native-swiper';

import Input from '../../components/input';

function PaginationItem({ title, active }) {
    return (
        <View>
            <Text style={{ ...styles.paginationText, color: active ? '#0A151F' : styles.paginationText.color }}>{title}</Text>
            <View style={{ ...styles.paginationLine, display: active ? 'flex' : 'none' }} />
        </View>
    )
}


function Pagination({ index }) {
    const scrollRef = React.useRef(null);

    scrollRef.current?.scrollTo({
        x: index * 30,
        y: 0,
        animated: true,
    });

    return (
        <ScrollView ref={scrollRef} scrollEnabled={false} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.pagination}>
            <PaginationItem active={index === 0} title="Genel" />
            <PaginationItem active={index === 1} title="Aile Üyeleri" />
            <PaginationItem active={index === 2} title="Bütçe" />
            <PaginationItem active={index === 3} title="İhtiyaç" />
            <PaginationItem active={index === 4} title="Not" />
            <PaginationItem active={index === 5} title="Resim" />
        </ScrollView>
    )
}

class FamilyAddScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0
        }
    }

    updateIndex(i) {
        this.setState({
            index: i
        });
    }

    render() {
        return (
            <>
                <Pagination index={this.state.index} />

                <Swiper style={styles.wrapper} showsPagination={false} onIndexChanged={(i) => this.updateIndex(i)} loop={false}>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.slide}>
                        <Input style={styles.input} placeholder='İsim' />
                        <Input style={styles.input} placeholder='Kimlik Numarası' />
                        <Input style={styles.input} placeholder='Uyruk' />
                        <Input style={styles.input} placeholder='Telefon' />
                        <Input style={styles.input} placeholder='Kira' />
                        <Input style={styles.input} placeholder='Adres' />
                        <Input style={styles.input} placeholder='Adres' />
                        <Input style={styles.input} placeholder='Adres' />
                        <Input style={styles.input} placeholder='Adres' />
                        <Input style={styles.input} placeholder='Adres' />
                        <View style={styles.empty} />

                    </ScrollView>
                    <View style={styles.slide}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                    <View style={styles.slide}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </>
        )
    }
}


const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F8F8F8',
    },
    slide: {
        marginTop: 70,
    },
    empty: {
        height: 50,
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black'

    },
    pagination: {
        marginTop: 15,
        position: 'absolute',
        // borderWidth: 1,
        width: '100%',
        padding: 5,
        paddingRight: 20,
        flexDirection: 'row',
        zIndex: 1
    },
    paginationText: {
        marginHorizontal: 19,
        color: '#758291',
        fontFamily: 'SFProText-Bold',
        fontSize: 13
    },
    paginationLine: {
        backgroundColor: '#E11E3C',
        height: 2,
        marginTop: 2,
        width: '45%',
        alignSelf: 'center',
    },

    input: {
        marginTop: 10,
        marginHorizontal: 15,
    }
});

export default FamilyAddScreen;