import * as React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Swiper from 'react-native-swiper';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import ButtonCard from '../../../../components/button-card';
import Location from '../../../../components/task/location';

import Member from './member';
import Budget from './budget';
import Need from './need';
import Note from './note';

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
        }
        this.swiperRef = React.createRef();
        this.memberViews = [];
        this.budgetViews = [];
        this.needViews = [];
        this.noteViews = [];
    }

    updateIndex(i) {
        this.setState({
            ...this.state,
            index: i
        });
    };

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

    updateKeys(key, stateName, screenName, views) {
        const { route, navigation } = this.props;
        if (route.params?.key === screenName) {
            const { model, title, expl, index } = route.params;

            const models = this.state.family[stateName];
            const view = <ButtonCard key={`${key}${views.length}`} onPress={() => navigation.navigate(screenName, { model: model, index: models.length })} style={styles.input} title={title} desc={expl} />

            if (index != null) { // update exists
                models[index] = model;
                this.setState({ ...this.state, family: { ...this.state.family, [stateName]: models } });
                views[index] = view;
            }

            else { // push new
                this.setState({ ...this.state, family: { ...this.state.family, [stateName]: [...this.state.family[stateName], model] } });
                views.push(view);
            }

            delete route.params;
        }

    }


    componentDidUpdate() {
        this.updateKeys('member', 'members', 'Member', this.memberViews);
        this.updateKeys('budget', 'budgets', 'Budget', this.budgetViews);
        this.updateKeys('need', 'needs', 'Need', this.needViews);
        this.updateKeys('note', 'notes', 'Note', this.noteViews);
    }



    render() {
        const { navigation } = this.props;
        let { family } = this.state;
        let loc = { city: family.city, town: family.town, district: family.district, street: family.street }
        return (
            <>
                <NavBar title='Aile Ekle' onPress={() => navigation.goBack()} onTick={() => navigation.goBack()} />
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
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Member')} style={styles.input} title='Üye Ekleyin' />
                        <View>{this.memberViews}</View>
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Budget')} style={styles.input} title='Bütçe Ekleyin' />
                        <View>{this.budgetViews}</View>
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Need')} style={styles.input} title='İhtiyaç Ekleyin' />
                        <View>{this.needViews}</View>
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Note')} style={styles.input} title='Not Ekleyin' />
                        <View>{this.noteViews}</View>
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
    },
});

export default FamilyAddScreen;