import * as React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal, Alert, BackHandler } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Swiper from 'react-native-swiper';

import { Download } from '../../../../components/icons';
import { NavBar, Input, Select, Dialog, ButtonCard } from '../../../../components/';
import Location from '../../../../components/task/location';




import MemberScreen from './member';
import BudgetScreen from './budget';
import NeedScreen from './need';
import NoteScreen from './note';
import ImageScreen from './image';
import SwiperView from './swiper-view';
import mountPreventGoingBack from './utils';

import * as FamilyModel from '../../../../models/family';
import * as Validator from '../../../../utils/validator';

import * as FamilyServices from '../../../../services/family-services';

import { selfIsManager, selfIsMember, selfUserID } from '../../../../services/user-services'


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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.pagination}>
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
        const family = this.props?.route?.params?.family;
        this.state = {
            index: 0,
            family: family ? family : new FamilyModel.Family(),
            modalVisible: false,
            dialogText: ' ',
            loading: false,
            exit: false,
            goBack: this.props?.route?.params?.goBack
        }
        this.swiperRef = React.createRef();
        this.backHandler = null;

    }

    componentDidMount() {
        mountPreventGoingBack.bind(this)();
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

    showModal(dialog) {
        if (dialog)
            this.setDialog(dialog);
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
            valid = this.validateModel('idNo', 'Kimlik Numarası', { length: 11 });
        // if (valid)
            // valid = this.validateModel('tel', 'Telefon Numarası', { length: 10 });
        if (valid)
            valid = this.validateModel('town', 'İlçe');

        return valid;
    }

    isUpdate() {
        return this.state.family._id != null;
    }

    isRegistrant() {
        return this.state.family.createdBy._id === selfUserID();
    }

    canDo() {
        let authorized = false;
        if (this.isUpdate()) {
            if (selfIsManager())
                authorized = true;
            else if (selfIsMember() && this.isRegistrant())
                authorized = true;

        }
        else
            authorized = true;
        return authorized;
    }

    async onTick() {
        this.setState(prevState => ({ ...prevState, loading: true }));
        if (this.formIsValid()) {
            if (this.isUpdate()) { // update family
                if (this.canDo()) {
                    const res = await FamilyServices.updateFamily(this.state.family);
                    if (res.status === 200) {
                        // update the family list in stack screen
                        console.log('goBack', this.state.goBack);
                        this.setState(prevState => ({ ...prevState, exit: true }));
                        this.props.navigation.navigate({
                            name: this.state.goBack,
                            params: {
                                family: this.state.family
                            },
                            merge: true
                        });
                        return;
                    }
                    if (res.status === 400) {
                        const js = await res.json();
                        this.showModal('Bir hata oluştu' + JSON.stringify(js));
                    }
                }
                else
                    this.showModal('İşlemi yapmaya yetkiniz yok!');
            }
            else { // create family
                const res = await FamilyServices.createFamily(this.state.family);
                if (res.status === 201) {
                    this.setState(prevState => ({ ...prevState, exit: true }));
                    this.props.navigation.goBack();
                    return;
                }
                else if (res.status === 400){
                    const js = await res.json();
                    this.showModal('Bir hata oluştu' + JSON.stringify(js));
                }
            }

            // this.props.navigation.goBack();
        }
        else
            this.showModal();
        this.setState(prevState => ({ ...prevState, loading: false }));
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
                <NavBar title={`Aile ${this.isUpdate() ? 'Düzenle' : 'Ekle'}`} onPress={() => navigation.goBack()} onTick={!this.state.loading ? () => this.onTick() : undefined} />
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
                        {family._id && <TouchableOpacity onPress={() => FamilyServices.downloadFamily(family)} style={styles.download}>
                            <Download stroke='#758291' />
                            <Text style={styles.downloadText}>İndir</Text>
                        </TouchableOpacity>}
                        <Input value={family.name} onChangeText={e => this.handleChange(e, 'name')} required={true} autoCapitalize='words' textContentType='name' style={styles.input} placeholder='İsim' />
                        <Input value={family.idNo} onChangeText={e => this.handleChange(e, 'idNo', 'numeric')} required={true} keyboardType='number-pad' maxLength={11} style={styles.input} placeholder='Kimlik Numarası' />
                        <Input value={family.nation} onChangeText={e => this.handleChange(e, 'nation')} style={styles.input} placeholder='Uyruk' />
                        <Input value={family.tel} onChangeText={e => this.handleChange(e, 'tel', 'numeric')} required={true}  keyboardType='number-pad' style={styles.input} placeholder='Telefon' />
                        <Location loc={loc} onValueChange={e => this.handleLocation(e)} />
                        <Input value={family.address} style={styles.input} onChangeText={e => this.handleChange(e, 'address')} placeholder='Adres' />
                        <Input value={family.rent} style={styles.input} keyboardType='number-pad' onChangeText={e => this.handleChange(e, 'rent', 'numeric')} placeholder='Kira' />
                        <Select value={family.warmingType} onValueChange={e => this.handleChange(e, 'warmingType')} items={FamilyModel.warmingList} style={styles.input} placeholder='Isınma Tipi' />
                        <View style={styles.empty} />
                    </ScrollView>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('members', e)} models={family.members} modelClass={MemberScreen} screenName='FamilyMember' enableQuick={true} title='Üye ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('budgets', e)} models={family.budgets} modelClass={BudgetScreen} screenName='FamilyBudget' title='Bütçe ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('needs', e)} models={family.needs} modelClass={NeedScreen} screenName='FamilyNeed' enableQuick={true} title='İhtiyaç ekleyin' {...this.props} /></View>
                    <View ><SwiperView onChange={(e) => this.handleSwiperChange('images', e)} image={true} models={family.images} modelClass={null} screenName='FamilyImage' title='Resim ekleyin' {...this.props} /></View>
                    <View><SwiperView onChange={(e) => this.handleSwiperChange('notes', e)} models={family.notes} modelClass={NoteScreen} screenName='FamilyNote' enableQuick={true} title='Not ekleyin' {...this.props} /></View>
                    <ScrollView>
                        <Select value={family.rating} onValueChange={e => this.handleChange(e, 'rating')} items={FamilyModel.ratingList} style={styles.input} placeholder='Derece' />
                        <ButtonCard style={{ ...styles.input, text: styles.commentButtonCard }} selected={family.aid} onPress={() => this.handleChange(!family.aid, 'aid')} noChevron={true} title='Yardım Takip' />
                        <ButtonCard style={{ ...styles.input, text: styles.commentButtonCard }} selected={family.education} onPress={() => this.handleChange(!family.education, 'education')} noChevron={true} title='Eğitim Takip' />
                        <ButtonCard style={{ ...styles.input, text: styles.commentButtonCard }} selected={family.health} onPress={() => this.handleChange(!family.health, 'health')} noChevron={true} title='Sağlık Takip' />
                    </ScrollView>
                </Swiper>
            </>
        )
    }
}

function ImageScreenWrapper() {
    return (<ImageScreen navName='FamilyAddMain' />);
}

function FamilyAddScreen({ route }) {
    return (
        <>
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name='FamilyAddMain' component={FamilyAddMainScreen} initialParams={route.params} />
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
    },
    download: {
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '25%',
        marginLeft: 15,
        borderRadius: 20
    },
    downloadText: {
        marginTop: 1,
        marginLeft: 8,
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#758291'
    }
});

export default FamilyAddScreen;