import * as React from 'react';
import { TouchableOpacity, StyleSheet, Image, View, ScrollView, TextInput, Text, Modal } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';


import { TickSquare, Plus } from '../../components/icons';
import { ButtonCard, NavBar, Dialog } from '../../components';
import ImageScreen from '../task/family/family-add/image';
import Location from '../../components/task/location';


import { selfUserID } from '../../services/user-services';
import { createPost } from '../../services/post-services';

function PostAddMainScreen({ navigation, route }) {
    // FIXME. hard-coded. city
    const [post, setPost] = React.useState({
        userid: selfUserID(),
        images: route.params?.model,
        statement: null,
        city: 34,
        town: null,
    });

    const [modalVisible, setModalVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const loc = {
        city: 34,
        town: null,
        district: null,
        street: null,
    };

    const showModal = () => {
        setModalVisible(true)
        setTimeout(() => {

            setModalVisible(false)
        }, 2000);
    }

    // collect images
    React.useEffect(() => {
        setPost(prevPost => ({ ...prevPost, images: route.params?.model }))
    }, [route]);

    const handleLocation = (loc) => {
        setPost(prevPost => ({
            ...prevPost,
            town: loc?.town,
        }));
    };

    const isValid = () => {
        return post.town != null && post.images?.length != 0 && post.statement != null && post.town != null;
    };

    const onTick = async () => {
        if (isValid()) {
            setLoading(true);
            const res = await createPost(post);
            if (res.status === 201) {
                navigation.navigate('TimelineMain', { post: true })
            }
            else
                console.error('on post create');
        }
        else
            showModal();
    };


    return (
        <View>
            <NavBar onPress={() => navigation.goBack()} onTick={!loading ? onTick : undefined} title='Gönderi Ekle' />
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <Dialog title='Tüm alanlar zorunludur' />
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <View style={styles.section1}>
                    <Image style={styles.profile} source={require('../../icons/woman.png')} />
                    <TextInput value={post.statement} onChangeText={e => setPost(prevPost => ({ ...prevPost, statement: e }))} multiline={true} style={styles.input} placeholderTextColor='#48515B' placeholder='Açıklama yaz' />
                </View>
                <ButtonCard title='Resim ekleyin' onPress={() => navigation.navigate('PostAddImageAdd')} style={{ marginTop: 30, text: styles.buttonText }} />
                <Location restrict={true} loc={loc} onlyTown={true} onValueChange={e => handleLocation(e)} />
            </ScrollView>
        </View>
    );
}

function ImageScreenWrapper() {
    return (<ImageScreen navName='PostAddMain' />);
}


const Stack = createStackNavigator();

function PostAddScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='PostAddMain' component={PostAddMainScreen} />
            <Stack.Screen name='PostAddImageAdd' component={ImageScreenWrapper} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    tickSquare: {
        position: 'absolute',
        top: 30,
        right: 15
    },
    profile: {
        width: 51,
        height: 51
    },
    scrollView: {
        margin: 10
    },
    section1: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontFamily: 'SFProText-Medium',
        fontSize: 12
    },
    select: {
        marginTop: 40
    },
    button: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,

    },
    buttonText: {
        marginLeft: 5,
        flex: 1,
        fontFamily: 'SFProText-Regular',
        fontSize: 14,
        color: '#48515B'
    },
    icon: {
        marginRight: 7
    }
});

export default PostAddScreen;