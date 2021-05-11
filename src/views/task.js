import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import TaskCard from '../components/task/task-card';

function TaskScreen() {
    return (
        <View style={styles.container} >
            <TaskCard style={styles.taskItem} title="Aile" desc="Kendi ailelerinizi listeleyin, ekleyin ve düzenleyin" />
            <TaskCard style={styles.taskItem} title="Stok" desc="Tüm bölgelerdeki stokları görüntüleyin, stok ekleyin ve düzenleyin" />
            <TaskCard style={styles.taskItem} title="Faaliyet" desc="Bölgenizdeki faaliyetlere katılın, faaliyet planlayın" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingTop: 50,
        backgroundColor: '#F8F8F8',
        height: '100%',
    },

    taskItem: {
        marginTop: 10
    }

})


export default TaskScreen;