import * as React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Swiper from 'react-native-swiper';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import ButtonCard from '../../../../components/button-card';

import Member from './member';
import Budget from './budget';
import Need from './need';
import Note from './note';

function PaginationItem({ title, active, ...props }) {
    return (
        <TouchableOpacity {...props} style={{ flexGrow: 1 }}>
            <Text style={{ ...styles.paginationText, color: active ? '#0A151F' : styles.paginationText.color }}>{title}</Text>
            <View style={{ ...styles.paginationLine, display: active ? 'flex' : 'none' }} />
        </TouchableOpacity>
    )
}

function Pagination({ index, swiperRef }) {
    const scrollRef = React.useRef(null);

    scrollRef.current?.scrollTo({
        x: index * 30,
        y: 0,
        animated: true,
    });

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef} scrollEnabled={false} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.pagination}>
            <PaginationItem onPress={() => swiperRef.current.scrollTo(0)} active={index === 0} title="Genel" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(1)} active={index === 1} title="Aile Üyeleri" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(2)} active={index === 2} title="Bütçe" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(3)} active={index === 3} title="İhtiyaç" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(4)} active={index === 4} title="Not" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(5)} active={index === 5} title="Resim" />
            {/* padding for right end */}
            <View style={{ width: 10 }} />
        </ScrollView>
    )
}


const Stack = createStackNavigator();


class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0
        }
        this.swiperRef = React.createRef();
    }

    updateIndex(i) {
        this.setState({
            index: i
        });
    };

    render() {
        const { navigation } = this.props;
        return (
            <>
                <NavBar title='Aile Ekle' />
                <Pagination swiperRef={this.swiperRef} index={this.state.index} />
                <Swiper ref={this.swiperRef} showsPagination={false} onIndexChanged={(i) => this.updateIndex(i)} loop={false}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Input style={styles.input} placeholder='İsim' />
                        <Input style={styles.input} placeholder='Kimlik Numarası' />
                        <Input style={styles.input} placeholder='Uyruk' />
                        <Input style={styles.input} placeholder='Telefon' />
                        <Select style={styles.input} placeholder="İl" />
                        <Select style={styles.input} placeholder="İlçe" />
                        <Select style={styles.input} placeholder="Mahalle" />
                        <Input style={styles.input} placeholder='Adres' />
                        <Input style={styles.input} placeholder='Kira' />
                        <Select style={styles.input} placeholder='Isınma Tipi' />
                        <Input style={styles.input} placeholder='Durum' />
                        <View style={styles.empty} />

                    </ScrollView>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Member')} style={styles.input} title='Üye Ekleyin' />
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Budget')} style={styles.input} title='Bütçe Ekleyin' />
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Need')} style={styles.input} title='İhtiyaç Ekleyin' />

                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Note')} style={styles.input} title='Not Ekleyin' />
                    </View>
                    <View >
                        <ButtonCard style={styles.input} title='Resim Ekleyin' />
                    </View>
                </Swiper>
            </>
        )
    }
}

function FamilyAddScreen() {
    return (
        <>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name='Main' component={Main} />
                <Stack.Screen name='Member' component={Member} />
                <Stack.Screen name='Budget' component={Budget} />
                <Stack.Screen name='Need' component={Need} />
                <Stack.Screen name='Note' component={Note} />
            </Stack.Navigator>
        </>
    )
}



const styles = StyleSheet.create({
    empty: {
        height: 25,
    },
    pagination: {
        marginTop: 15,
        maxHeight: 30,
        flexDirection: 'row',
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