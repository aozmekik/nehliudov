import * as React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { NavBar, ButtonCard } from '../../components';

import Location from '../../components/task/location';

import { privilegeUser } from '../../services/user-services';

function PrivilegeScreen({ navigation, route }) {
    const [user, setUser] = React.useState(route.params.user);
    const [loc, setLoc] = React.useState({ city: 34, town: null });
    const [willBePrivileged, setWillBePrivileged] = React.useState(false);
    const [canBeSent, setCanBeSent] = React.useState(false);

    const onTick = async () => {
        const res = await privilegeUser(user._id, { granted: willBePrivileged, town: loc.town });
        if (res.status == 200) {
            const data = await res.json();
            setUser(data);
        }
        else {
            const json = await res.json();
            console.error(json);
        }

    };

    React.useEffect(() => checkPrivilegeChanged(), [willBePrivileged, user]);
    React.useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', onBack);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', onBack);
        };
    }, [user]);

    const checkPrivilegeChanged = () => {
        const hasPrivilege = user.towns.includes(loc.town);
        const privilegeChanged = (hasPrivilege && !willBePrivileged) || (!hasPrivilege && willBePrivileged);
        setCanBeSent(privilegeChanged);
    }

    const onLocChange = async (location) => {
        setLoc(location);
        setWillBePrivileged(user.towns.includes(location.town));
    }

    const onBack = () => {
        navigation.navigate({
            name: 'ProfileMain',
            params: {
                user: user,
            },
            merge: true
        });
        return true;
    }


    return (
        <View style={styles.container}>
            <NavBar onPress={onBack} title='Yetki Düzenle' onTick={canBeSent ? () => onTick() : null} />
            <Location onValueChange={onLocChange} onlyTown={true} loc={loc} />
            {
                loc.town &&
                <ButtonCard onPress={() => setWillBePrivileged(!willBePrivileged)} style={{ marginTop: 10 }} selected={willBePrivileged} noChevron={true} title='İlçe Görevlisi' />
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