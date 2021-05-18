import * as React from 'react';

import { View, ScrollView } from 'react-native';

import NavBar from '../../../../components/nav-bar';
import Input from '../../../../components/input';
import { Plus } from '../../../../components/icons';
import Button from '../../../../components/button';
import styles from './style';


function NeedScreen({ navigation, route }) {
    const isEdit = () => { return route.params?.model }
    const [need, setNeed] = React.useState(isEdit() ? route.params.model : null);

    const pushNeed = () => navigation.navigate({
        name: 'Main',
        params: {
            model: need,
            title: need?.substring(0, 20) + (need.length > 20 ? '...' : ' '),
            expl: ' ',
            key: 'Need',
            index: isEdit() ? route.params.index : null
        },
        merge: true
    });

    return (
        <View style={styles.container}>
            <NavBar onPress={() => navigation.goBack()} onTick={pushNeed} title={`İhtiyaç ${isEdit()? 'Düzenle': 'Ekle'}`} />
            <ScrollView>
                <Input multiline={true} value={need} onChangeText={e => setNeed(e)} style={{ ...styles.input, paddingVertical: 30 }} placeholder='İhtiyaç' />
            </ScrollView>
        </View>
    )
}


export default NeedScreen;