import * as React from 'react';
import { Text, View, Modal, Alert } from 'react-native';

import { ImageBrowser } from 'expo-image-picker-multiple';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';


import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';

import { NavBar, Dialog, Button, ButtonCard } from '../../../../components/';

import { Camera as CameraIcon, Check } from '../../../../components/icons';
import styles from './style';


function PickImage({ onSubmit, navigation }) {
    const [access, setAccess] = React.useState(false);
    let images = [];
    let imagesBase64 = [];

    React.useEffect(() => {
        Alert.alert(
            'Medya İzni',
            'İyilik Rengi uygulaması aile kaydına resim eklemek için medyayı kullanmaktadır.',
            [{text: 'Tamam', onPress: () => setAccess(true)}]
        );
      }, []);

    const CheckWrapper = () => {
        return (<Check style={{ margin: 5, backgroundColor: '#FFFFFF', borderRadius: 10 }} fill="#E11E3C" />)
    }

    const imagesCallback = (callback) => {
        callback.then((photos) => {
            images = photos;
        }).catch((e) => console.log(e))
    };

    const onTick = async () => {
        for (var image of images) {
            const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' });
            imagesBase64.push(`data:image/jpeg;base64,${base64}`);
        }

        onSubmit(imagesBase64)
    }

    return (
        <>
            <NavBar title='Galeriden Seç' onTick={onTick} onPress={() => navigation.goBack()} />
            {access && <ImageBrowser
                max={4}
                renderSelectedComponent={CheckWrapper}
                onChange={(num, onSubmit) => {
                    onSubmit();
                }}
                callback={imagesCallback}
            />}
        </>
    );
}


function SelectedModal({ onSnap, onOkay, style }) {
    return (
        <View style={{ paddingVertical: 15, ...style }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                {/* <Button  style={{ marginHorizontal: 5 }} Icon={() => CameraIcon({stroke: 'white'})} /> */}
                <Button onPress={onSnap} color='#48515B' Icon={CameraIcon} style={{ paddingVertical: 7.5, backgroundColor: '#E8EAED', marginHorizontal: 5 }} />
                <Button onPress={onOkay} color='#48515B' style={{ backgroundColor: '#E8EAED', marginHorizontal: 5 }} title='Tamam' />
            </View>
        </View >
    );
}


function SnapImage({ onSubmit, navigation }) {
    const [hasPermission, setHasPermission] = React.useState(null);
    const [isCameraReady, setIsCameraReady] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const camera = React.useRef();
    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    React.useEffect(() => {
        (async () => {
            Alert.alert(
                'Kamera İzni',
                'İyilik Rengi uygulaması aile kaydına resim eklemek için kamerayı kullanmaktadır.',
                [{text: 'Tamam', onPress: async () => {
                    const { status } = await Camera.requestCameraPermissionsAsync();
                    setHasPermission(status === 'granted');
                }
            }]
            );
            
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const options = {
        base64: true,
        quality: 0.5,
    };

    const snap = async () => {
        if (camera && isCameraReady) {
            setModalVisible(true);
            let photo = await camera.current.takePictureAsync(options);
            setModalVisible(false);
            images.push(`data:image/jpeg;base64,${photo.base64}`);
            setImages(images);
        }
    };

    const onTick = () => {
        onSubmit(images);
    }

    return (
        <>
            <NavBar title='Yeni resim' onTick={onTick} onPress={() => navigation.goBack()} />
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
            >
                <Dialog style={{ marginTop: hp('40%') }} title='Kaydediliyor...' />
            </Modal>

            <View style={{ flex: 1 }}>
                <Camera onCameraReady={onCameraReady} ref={camera} style={{ flex: 1 }} >
                    <SelectedModal style={{ backgroundColor: 'transparent', top: hp('60%') }} onSnap={snap} onOkay={onTick} />
                </Camera>

            </View>

        </>
    );
}

function TestMain({ navigation }) {
    return (
        <>
            <NavBar title='Resim Ekle' onPress={() => navigation.goBack()} />
            <ButtonCard onPress={() => navigation.navigate('PickImage')} style={styles.input} title='Galeriden seç' />
            <ButtonCard onPress={() => navigation.navigate('SnapImage')} style={styles.input} title='Yeni resim' />
        </>
    );
}


const Stack = createStackNavigator();

function ImageScreen({ navName }) {
    const pushImages = (images, navigation) => {
        navigation.navigate({
            name: navName,
            params: {
                model: images,
                key: 'FamilyImage',
            },
            merge: true
        });
    }

    const PickImageScreen = ({ navigation }) => {
        return (<PickImage navigation={navigation} onSubmit={(images) => pushImages(images, navigation)} />
        )
    }

    const SnapImageScreen = ({ navigation }) => {
        return (<SnapImage navigation={navigation} onSubmit={(images) => pushImages(images, navigation)} />
        )
    }

    return (
        <Stack.Navigator initialRouteName='TestMain' headerMode='none'>
            <Stack.Screen name='TestMain' component={TestMain} />
            <Stack.Screen name='PickImage' component={PickImageScreen} />
            <Stack.Screen name='SnapImage' component={SnapImageScreen} />
        </Stack.Navigator>
    );
}



// export { SnapImage, PickImage };
export default ImageScreen;