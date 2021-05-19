import * as React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Swiper from 'react-native-swiper';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import ButtonCard from '../../../../components/button-card';
import Location from '../../../../components/task/location';
import Dialog from '../../../../components/dialog';



import Member from './member';
import Budget from './budget';
import Need from './need';
import Note from './note';
import SwiperView from './swiper-view';

import * as FamilyModel from '../../../../models/family';
import * as Validator from '../../../../utils/validator';


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
            index: 0,
            family: new FamilyModel.Family(),
            modalVisible: false
        }
        this.swiperRef = React.createRef();
    }

    updateIndex(i) {
        this.setState({
            ...this.state,
            index: i
        });
    };

    isValid() {
        return this.state.family.name;
    }

    handleChange = (event, name, type) => {
        Validator.setWithValidation(event, type, (text) => this.setState({
            ...this.state,
            family: {
                ...this.state.family,
                [name]: text,
            }
        }
        ));

    };

    handleLocation = (loc) => {
        this.setState({
            ...this.state,
            family: {
                ...this.state.family,
                city: loc?.city,
                town: loc?.town,
                district: loc?.district,
                street: loc?.street
            }
        });
    }

    handleSwiperChange(key, model) {
        this.setState(prevState => ({ ...prevState, family: { ...prevState.family, [key]: model } }));
    }

    showModal() {
        this.setModalVisible(true)
        setTimeout(() => {
            this.setModalVisible(false)
        }, 2000);
    }

    formIsValid() {
        return this.state.family.name != null;
    }

    onTick() {
        if (this.formIsValid()) {
            console.log('send');
            this.props.navigation.goBack();
        }
        else
            this.showModal();
    }


    setModalVisible(value) {
        this.setState(prevState => ({ ...prevState, modalVisible: value }));
    }

    render() {
        const { navigation } = this.props;
        let { family } = this.state;
        let loc = { city: family.city, town: family.town, district: family.district, street: family.street }
        return (
            <>
                <NavBar title='Aile Ekle' onPress={() => navigation.goBack()} onTick={() => this.onTick()} />
                <Pagination swiperRef={this.swiperRef} index={this.state.index} />
                <Swiper ref={this.swiperRef} showsPagination={false} onIndexChanged={(i) => this.updateIndex(i)} loop={false}>
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Input value={family.name} onChangeText={e => this.handleChange(e, 'name', 'alpha')} required={true} autoCapitalize='words' textContentType='name' style={styles.input} placeholder='İsim' />
                        <Input value={family.idNo} onChangeText={e => this.handleChange(e, 'idNo', 'numeric')} keyboardType='number-pad' maxLength={11} style={styles.input} placeholder='Kimlik Numarası' />
                        <Input value={family.nation} style={styles.input} placeholder='Uyruk' />
                        <Input value={family.tel} onChangeText={e => this.handleChange(e, 'tel', 'numeric')} keyboardType='number-pad' maxLength={11} style={styles.input} placeholder='Telefon' />
                        <Location loc={loc} onValueChange={e => this.handleLocation(e)} />
                        <Input value={family.address} style={styles.input} onChangeText={e => this.handleChange(e, 'address')} placeholder='Adres' />
                        <Input value={family.rent} style={styles.input} keyboardType='number-pad' onChangeText={e => this.handleChange(e, 'address', 'numeric')} placeholder='Kira' />
                        <Select value={family.warmingType} onValueChange={e => this.handleChange(e, 'warmingType')} items={FamilyModel.warmingList} style={styles.input} placeholder='Isınma Tipi' />
                        <View style={styles.empty} />
                    </ScrollView>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('members', e)} screenName='Member' title='Üye Ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('budgets', e)} screenName='Budget' title='Bütçe Ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('needs', e)} screenName='Need' title='İhtiyaç Ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('notes', e)} screenName='Note' title='Not Ekleyin' {...this.props} /></View>
                    <View >
                        <ButtonCard style={styles.input} title='Resim Ekleyin' />
                    </View>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => this.setModalVisible(false)}
                    >
                        <Dialog title='Ailenin ismi girilmesi zorunludur' />
                    </Modal>
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
    },
});

export default FamilyAddScreen;