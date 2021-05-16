import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import TaskCard from '../../components/task/task-card';
import FamilyScreen from './family/family';


function Main({ navigation }) {
    return (
        <View style={styles.container} >
            <TaskCard onPress={() => navigation.navigate('Family')} style={styles.taskItem} title="Aile" desc="Kendi ailelerinizi listeleyin, ekleyin ve düzenleyin" />
            <TaskCard style={styles.taskItem} title="Stok" desc="Tüm bölgelerdeki stokları görüntüleyin, stok ekleyin ve düzenleyin" />
            <TaskCard style={styles.taskItem} title="Faaliyet" desc="Bölgenizdeki faaliyetlere katılın, faaliyet planlayın" />
        </View>
    );
}

const Stack = createStackNavigator();

function TaskScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='Family' component={FamilyScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 50,
        height: '100%',
    },

    taskItem: {
        marginTop: 10
    }

})


export default TaskScreen;