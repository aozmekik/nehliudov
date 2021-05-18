import * as React from 'react';

import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Modal, } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";

import Swiper from 'react-native-swiper';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import Select from '../../../../components/select';
import ButtonCard from '../../../../components/button-card';
import Location from '../../../../components/task/location';
import Button from '../../../../components/button';
import { Trash } from '../../../../components/icons';



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

function DeleteSelected({ onClose, style }) {
    return (
        <View style={{ backgroundColor: '#FFFFFF', paddingVertical: 15, ...style }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                <Button style={{ marginHorizontal: 5 }} Icon={Trash} title='Sil' />
                <Button color='#48515B' style={{ backgroundColor: '#E8EAED', marginHorizontal: 5 }} title='Tümünü Seç' />
            </View>
            <TouchableOpacity onPress={onClose} style={{ marginTop: 15, }}><Text style={{ fontFamily: 'SFProText-Bold', fontSize: 14, color: '#758291', alignSelf: 'center' }}>Vazgeç</Text></TouchableOpacity>
        </View >
    );
}




const Stack = createStackNavigator();


class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            family: new FamilyModel.Family(),
            views: { members: [], budgets: [], needs: [], notes: [] },
        }
        this.swiperRef = React.createRef();
        this.refRBSheet = React.createRef();
        this.selecteds = [];
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

    // deselect(key, index) {
    //     const lastDeselect = this.selecteds.length == 1;
    //     const onPress = lastDeselect ? () => this.firstSelected : () => this.select();
    //     const props = this.state.views[key][index].props;
    //     const view = <ButtonCard key={`${key}${index}`} onPress={onPress} {...props} />
    //     this.updateButtonCard(key, index, view);

    //     const i = this.selecteds.indexOf(index);
    //     if (i > -1) {
    //         this.selecteds.splice(i, 1);
    //     }
    // }


    select(key, index) {
        const props = this.state.views[key][index].props;
        const view = <ButtonCard selected={true} key={`${key}${index}`} onPress={() => this.deselect()} {...props} />
        this.updateButtonCard(key, index, view);
        this.selecteds.push(index);
        this.refRBSheet.current.open();
    }

    updateButtonCard(key, index, view) {
        const views = this.state.views[key];
        views[index] = view;
        this.setState(prevState => ({ ...prevState, views: { ...prevState.views, [key]: views } }));
    }

    pushButtonCard(key, index, view) {
        const views = this.state.views[key];
        views.push(view);
        this.setState(prevState => ({ ...prevState, views: { ...prevState.views, [key]: views } }));
    }

    updateKeys(key, screenName) {
        const { route, navigation } = this.props;
        if (route.params?.key === screenName) {
            const { model, title, expl, index } = route.params;

            const models = this.state.family[key];

            if (index != null) { // update exists
                models[index] = model;
                this.setState({ ...this.state, family: { ...this.state.family, [key]: models } });
                const view = <ButtonCard key={`${key}${index}`} onLongPress={() => this.select(key, index)} onPress={() => navigation.navigate(screenName, { model: model, index: index })} style={styles.input} title={title} desc={expl} />
                this.updateButtonCard(key, index, view);
            }

            else { // push new
                const newIndex = models.length;
                this.setState({ ...this.state, family: { ...this.state.family, [key]: [...this.state.family[key], model] } });
                const view = <ButtonCard key={`${key}${newIndex}`} onLongPress={() => this.select(key, newIndex)} onPress={() => navigation.navigate(screenName, { model: model, index: newIndex })} style={styles.input} title={title} desc={expl} />
                this.pushButtonCard(key, index, view);
            }

            delete route.params;
        }

    }


    componentDidUpdate() {
        this.updateKeys('members', 'Member');
        this.updateKeys('budgets', 'Budget');
        this.updateKeys('needs', 'Need');
        this.updateKeys('notes', 'Note');
    }

    dismissSelect() {
        this.refRBSheet.current.close()
    }


    render() {
        const { navigation } = this.props;
        let { family } = this.state;
        let loc = { city: family.city, town: family.town, district: family.district, street: family.street }
        return (
            <>
                <RBSheet
                    ref={this.refRBSheet}
                    closeOnDragDown={false}
                    closeOnPressMask={false}
                    height={hp('27%')}
                    customStyles={{
                        wrapper: {
                            backgroundColor: 'transparent'
                        },
                        container: {
                            borderRadius: 10
                        },
                    }}
                >
                    <DeleteSelected onClose={() => this.dismissSelect()} />
                </RBSheet>
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
                        <View>{this.state.views.members}</View>
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Budget')} style={styles.input} title='Bütçe Ekleyin' />
                        <View>{this.state.views.budgets}</View>
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Need')} style={styles.input} title='İhtiyaç Ekleyin' />
                        <View>{this.state.views.needs}</View>
                    </View>
                    <View >
                        <ButtonCard onPress={() => navigation.navigate('Note')} style={styles.input} title='Not Ekleyin' />
                        <View>{this.state.views.notes}</View>
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