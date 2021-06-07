import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";


import { NavBar, ButtonCard, SelectedModal, Dialog } from '../../../../components/';
import { Download, Book } from '../../../../components/icons';
import FamilyAddScreen from '../family-add/family-add';

import { deleteFamily } from '../../../../services/family-services';
import { selfIsManager, selfIsMember } from '../../../../services/user-services';

function FamilyListResultMainScreen({ navigation, route }) {
    const refRBSheet = React.useRef();
    const [selectedIndex, setSelectedIndex] = React.useState(null); // selected item's index.
    const [modalVisible, setModalVisible] = React.useState(false); // selected item's index.


    const families = route?.params?.families;
    const family = route?.params?.family;


    const updateFamilies = () => {
        if (route.params.family) {
            for (let i = 0; i < families.length; ++i)
                if (families[i]._id === family._id)
                    families[i] = family;
        }
    }

    updateFamilies();

    const select = (index) => {
        if (!selfIsManager())
            setModalVisible(true);
        else {
            setSelectedIndex(index);
            refRBSheet.current.open();
        }

    };

    const dismissSelect = () => {
        setSelectedIndex(null);
        refRBSheet.current.close();
    }

    const deleteSelected = async () => {
        const res = await deleteFamily(families[selectedIndex]);
        if (res.status === 204) {
            families.splice(selectedIndex, 1);
            dismissSelect();
        }
        else
            console.error('on delete family');

    }

    return (
        <>
            <NavBar onPress={navigation.goBack} title='Aile Listele' />

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
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
                <SelectedModal onDelete={deleteSelected} onClose={dismissSelect} />
            </RBSheet>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Dialog title='Aile silmek için yetkiniz yok' />
            </Modal>

            {families.length <= 0 && <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Book />
                <Text style={{ marginTop: 15, fontFamily: 'SFProText-Semibold', fontSize: 14, color: '#48515B', textAlign: 'center' }} >Sonuç Bulunamadı</Text>
            </View>

            }
            {families.length > 0 && <>
                <TouchableOpacity style={styles.download}>
                    <Download stroke='#758291' />
                    <Text style={styles.downloadText}>İndir</Text>
                </TouchableOpacity>
                <ScrollView>
                    {
                        families.map((family, index) =>
                            <ButtonCard style={styles.buttonCard} onLongPress={() => select(index)} onPress={() => navigation.navigate('FamilyListResultDetail', { family: family })} selected={index === selectedIndex} key={family.name} title={family.name} desc={family.regDate} />
                        )
                    }
                </ScrollView>
            </>
            }
        </>
    )
}

const Stack = createStackNavigator();

function FamilyListResultScreen({ route }) {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='FamilyListResultMain' component={FamilyListResultMainScreen} initialParams={{ families: route?.params?.families }} />
            <Stack.Screen name='FamilyListResultDetail' component={FamilyAddScreen} />
        </Stack.Navigator>
    );
}


const styles = StyleSheet.create({
    buttonCard: {
        marginTop: 15
    },
    download: {
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

export default FamilyListResultScreen;