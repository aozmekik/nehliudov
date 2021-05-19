import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import NavBar from '../../../../components/nav-bar';
import ButtonCard from '../../../../components/button-card';

import { SnapImage, PickImage } from './image';
import styles from './style';

const pushImages = (images, navigation) => {
    console.log(images);
    navigation.navigate({
        name: 'FamilyAddMain',
        params: {
            model: images,
            key: 'Image',
        },
        merge: true
    });
}


function PickImageScreen({ navigation }) {
    return (<PickImage onSubmit={(images) => pushImages(images, navigation)} />
    )
}

function SnapImageScreen({ navigation }) {
    return (<SnapImage onSubmit={(images) => pushImages(images, navigation)} />
    )
}

function TestMain({ navigation }) {
    return (
        <>
            <NavBar title='Resim Ekle' />
            <ButtonCard onPress={() => navigation.navigate('PickImage')} style={styles.input} title='Galeriden seç' />
            <ButtonCard onPress={() => navigation.navigate('SnapImage')} style={styles.input} title='Yeni resim' />
        </>
    );
}

const Stack = createStackNavigator();

function TestScreen() {
    return (
        <Stack.Navigator initialRouteName='TestMain' headerMode='none'>
            <Stack.Screen name='TestMain' component={TestMain} />
            <Stack.Screen name='PickImage' component={PickImageScreen} />
            <Stack.Screen name='SnapImage' component={SnapImageScreen} />
        </Stack.Navigator>
    );
}




export default TestScreen;