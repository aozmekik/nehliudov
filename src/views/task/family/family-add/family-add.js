import * as React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Swiper from 'react-native-swiper';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import Location from '../../../../components/task/location';
import Dialog from '../../../../components/dialog';



import MemberScreen from './member';
import BudgetScreen from './budget';
import NeedScreen from './need';
import NoteScreen from './note';
import ImageScreen from './image';
import SwiperView from './swiper-view';

import * as FamilyModel from '../../../../models/family';
import * as Validator from '../../../../utils/validator';
import ButtonCard from '../../../../components/button-card';

import * as FamilyServices from '../../../../services/family-services';


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
        x: index * 35,
        y: 0,
        animated: true,
    });

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef} scrollEnabled={false} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.pagination}>
            <PaginationItem onPress={() => swiperRef.current.scrollTo(0)} active={index === 0} title="Genel" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(1)} active={index === 1} title="Aile Üyeleri" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(2)} active={index === 2} title="Bütçe" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(3)} active={index === 3} title="İhtiyaç" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(4)} active={index === 4} title="Resim" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(5)} active={index === 5} title="Not" />
            <PaginationItem onPress={() => swiperRef.current.scrollTo(6)} active={index === 6} title="Yorum" />

            {/* padding for right end */}
        </ScrollView>
    )
}


const Stack = createStackNavigator();


class FamilyAddMainScreen extends React.Component {
    constructor(props) {
        super(props);
        const { family } = this.props?.route?.params;
        this.state = {
            index: 0,
            family: family ? family : new FamilyModel.Family(),
            modalVisible: false,
            dialogText: ' '
        }
        this.swiperRef = React.createRef();
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

    handleSwiperChange(key, model) {
        this.setState(prevState => ({ ...prevState, family: { ...prevState.family, [key]: model } }));
    }

    showModal() {
        this.setModalVisible(true)
        setTimeout(() => {
            this.setModalVisible(false)
        }, 2000);
    }

    setDialog(dialog) {
        this.setState(prevState => ({ ...prevState, dialogText: dialog }));
    }

    validateModel(key, text, options) {
        const { family } = this.state;
        const dialog = Validator.validateAndDialog(family[key], text, options);
        if (dialog)
            this.setDialog(dialog);
        return dialog == null;
    }

    formIsValid() {
        let valid = true;

        valid = this.validateModel('name', 'Aile ismi');
        if (valid)
            valid = this.validateModel('status', 'Aile durumu');
        if (valid)
            valid = this.validateModel('idNo', 'Kimlik Numarası', {length: 11});
        if (valid)
            valid = this.validateModel('tel', 'Telefon Numarası', {length: 11});

        return valid;
    }

    async createFamily(family) {
        const fam = await FamilyServices.createFamily(family);
        return fam;
    }

    async onTick() {
        if (this.formIsValid()) {
            this.createFamily(this.state.family);
            // this.props.navigation.goBack();
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
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(false)}
                >
                    <Dialog title={this.state.dialogText} />
                </Modal>
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
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('members', e)} models={family.members} modelClass={MemberScreen} screenName='FamilyMember' title='Üye ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('budgets', e)} models={family.budgets} modelClass={BudgetScreen} screenName='FamilyBudget' title='Bütçe ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('needs', e)} models={family.needs} modelClass={NeedScreen} screenName='FamilyNeed' title='İhtiyaç ekleyin' {...this.props} /></View>
                    <View ><SwiperView onChange={(e) => this.handleSwiperChange('images', e)} image={true} models={family.images} modelClass={null} screenName='FamilyImage' title='Resim ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('notes', e)} models={family.notes} modelClass={NoteScreen} screenName='FamilyNote' title='Not ekleyin' {...this.props} /></View>
                    <View>
                        <Select value={family.status} onValueChange={e => this.handleChange(e, 'status')} items={FamilyModel.statusList} style={styles.input} placeholder='Durum' />
                        <Select value={family.rating} onValueChange={e => this.handleChange(e, 'rating')} items={FamilyModel.ratingList} style={styles.input} placeholder='Derece' />
                        <ButtonCard style={{ ...styles.input, text: styles.commentButtonCard }} selected={family.education} onPress={() => this.handleChange(!family.education, 'education')} noChevron={true} title='Eğitim Takip' />
                        <ButtonCard style={{ ...styles.input, text: styles.commentButtonCard }} selected={family.health} onPress={() => this.handleChange(!family.health, 'health')} noChevron={true} title='Sağlık Takip' />

                    </View>
                </Swiper>
            </>
        )
    }
}

function ImageScreenWrapper() {
    return (<ImageScreen navName='FamilyAddMain' />);
}

function FamilyAddScreen({ family }) {
    return (
        <>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name='FamilyAddMain' component={FamilyAddMainScreen} initialParams={{ family: family }} />
                <Stack.Screen name='FamilyMember' component={MemberScreen} />
                <Stack.Screen name='FamilyBudget' component={BudgetScreen} />
                <Stack.Screen name='FamilyNeed' component={NeedScreen} />
                <Stack.Screen name='FamilyNote' component={NoteScreen} />
                <Stack.Screen name='FamilyImage' component={ImageScreenWrapper} />
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
    commentButtonCard: {
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        color: '#48515B'
    }
});

export default FamilyAddScreen;