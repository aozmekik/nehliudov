import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NavBar, ButtonCard, Select } from '../../components';

import Location from '../../components/task/location';

function PrivilegeScreen({ navigation }) {
    const [loc, setLoc] = React.useState({ city: 34, town: null });
    const [privileged, setPrivileged] = React.useState(false); // FIXME. get it from user info

    // TODO. carefull: if town changes privilges changes.
    const onTick = () => {

    };

    return (
        <View style={styles.container}>
            <NavBar onPress={navigation.goBack} title='Yetki Ver' onTick={onTick} />
            <Location onValueChange={setLoc} onlyTown={true} loc={loc} />
            {
                loc.town &&
                <ButtonCard onPress={() => setPrivileged(!privileged)} style={{ marginTop: 10 }} selected={privileged} noChevron={true} title='İlçe Görevlisi' />
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
});

export default PrivilegeScreen;