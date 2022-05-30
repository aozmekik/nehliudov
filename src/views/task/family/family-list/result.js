import * as React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';


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

    const { families, family, onPress } = route?.params;

    const updateFamilies = () => {
        if (route.params.family) {
            for (let i = 0; i < families.length; ++i)
                if (families[i]._id === family._id)
                    families[i] = family;
        }
    }

    updateFamilies();

    const select = (index) => {
        if (!selfIsManager()) {
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false)
            }, 2000);
        }
        else {
            setSelectedIndex(index);
            refRBSheet.current.open();
        }

    };

    const dismissSelect = () => {
        setSelectedIndex(null);
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
            {!onPress && <NavBar onPress={navigation.goBack} title='Aile Listele' />}

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                height={hp('27%')}
                onClose={dismissSelect}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent'
                    },
                    container: {
                        borderRadius: 10
                    },
                }}
            >
                <SelectedModal onDelete={deleteSelected} onClose={() => refRBSheet.current.close()} />
            </RBSheet>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Dialog title='Aile silmek için yetkiniz yok' />
            </Modal>

            {families.length <= 0 &&
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: '20%' }}>
                    <Book />
                    <Text style={{ marginTop: 15, fontFamily: 'SFProText-Semibold', fontSize: 14, color: '#48515B', textAlign: 'center' }} >Sonuç Bulunamadı</Text>
                </View>

            }
            {families.length > 0 &&
                <View style={{ marginTop: 15, marginBottom: 100 }}>
                    <Text style={styles.downloadText}>Ekleme tarihine göre sıralanmakta ve maksimum 20 aile kaydı gösterilmektedir. </Text>
                    {/* <TouchableOpacity style={styles.download}>
                        <Download stroke='#758291' />
                        <Text style={styles.downloadText}>İndir</Text>
                    </TouchableOpacity> */}
                    <FlatList
                        data={families}
                        renderItem={({ item, index }) => (
                            <ButtonCard style={styles.buttonCard} onLongPress={() => select(index)} onPress={() => onPress ? onPress(item) : navigation.navigate('FamilyListResultDetail', { goBack: 'FamilyListResultMain', family: item })} selected={index === selectedIndex} title={item.name} desc={new Date(item.createdAt).toISOString().substring(0, 10)} />
                        )}
                        keyExtractor={item => item._id}
                        contentContainerStyle={{ paddingBottom: 60 }}
                    >

                    </FlatList>
                </View>
            }
        </>
    )
}


const Stack = createStackNavigator();
function FamilyListResultScreen({ route }) {

    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='FamilyListResultMain' component={FamilyListResultMainScreen} initialParams={route.params} />
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
        marginHorizontal: 15,
        marginBottom: 10,
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#758291'
    }
});

export { FamilyListResultScreen, FamilyListResultMainScreen };