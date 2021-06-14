import * as React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { ButtonCard, NavBar, Select } from '../../../../components/';

import { FamilyListResultScreen } from './result';
import Location from '../../../../components/task/location';

import * as FamilyModel from '../../../../models/family';

import { listFamilies } from '../../../../services/family-services';


function FamilyListMainScreen({ navigation }) {
    // FIXME. city hard-coded
    const [query, setQuery] = React.useState({
        city: 34,
        town: null,
        district: null,
        street: null,
        rating: null,
        aid: false,
        health: false,
        education: false,
        warmingType: null,
    });

    const loc = {
        city: 34,
        town: null,
        district: null,
        street: null,
    };

    const handleChange = (event, name) => {
        setQuery(prevState => ({
            ...prevState,
            [name]: event
        }));
    };

    const handleLocation = (loc) => {
        setQuery(prevState => ({
            ...prevState,
            city: loc.city,
            town: loc.town,
            district: loc.district,
            street: loc.street
        }));
    };

    const onList = async () => {
        const res = await listFamilies(query);
        if (res.status === 201) {
            const families = await res.json();
            for (let family of families)
                family.images = family.images ? family.images.data : [];
            navigation.navigate('FamilyListResult', { families: families });
        }
        else
            console.error('on family listing', res);

    }

    return (
        <>
            <NavBar title='Aile Listele' onPress={navigation.goBack} onTick={onList} />
            <ScrollView style={styles.scrollView}>
                <Location restrict={true} loc={loc} onValueChange={e => handleLocation(e)} />
                <Select style={styles.input} value={query.warmingType} onValueChange={e => handleChange(e, 'warmingType')} items={FamilyModel.warmingList} placeholder='Isınma Tipi' />
                <Select style={styles.input} value={query.rating} onValueChange={e => handleChange(e, 'rating')} items={FamilyModel.ratingList} placeholder='Derece' />
                <ButtonCard style={styles.buttonCard} selected={query.aid} onPress={() => handleChange(!query.aid, 'aid')} noChevron={true} title='Yardım Takip' />
                <ButtonCard style={styles.buttonCard} selected={query.health} onPress={() => handleChange(!query.health, 'health')} noChevron={true} title='Sağlık Takip' />
                <ButtonCard style={styles.buttonCard} selected={query.education} onPress={() => handleChange(!query.education, 'education')} noChevron={true} title='Eğitim Takip' />
                <View style={styles.empty} />
            </ScrollView>
        </>

    );
}

const Stack = createStackNavigator();

function FamilyListScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='FamilyListMain' component={FamilyListMainScreen} />
            <Stack.Screen name='FamilyListResult' component={FamilyListResultScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    empty: {
        height: 25,
    },
    select: {
        marginTop: 15,
        flex: 1,
        marginHorizontal: 15
    },

    selectFirst: {
        marginTop: 30
    },
    selectBox: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 15
    },
    input: {
        marginTop: 10,
        marginHorizontal: 15,
    },
    buttonCard: {
        marginTop: 10,
        marginHorizontal: 15,
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        color: '#48515B'
    },

});


export default FamilyListScreen;