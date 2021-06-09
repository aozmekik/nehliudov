import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, FlatList, ActivityIndicator } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useScrollToTop, useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';


import { Notification, Settings, TwoUser } from '../../components/icons';
import NotificationsScreen from './notifications';
import SettingsScreen from './settings';
import PrivilegeScreen from './privilege';
import Post from '../timeline/post';

import { roles } from '../../models/user';
import { selfIsManager } from '../../services/user-services';
import { listPostsOfUser } from '../../services/post-services';
import { NavBar } from '../../components';


const Stack = createStackNavigator();

const storedImage = {};

function ImageBox({ post, style }) {
    const [icon, setIcon] = React.useState(null);

    const navigation = useNavigation();

    const getImages = async () => {
        if (!storedImage[post._id])
            storedImage[post._id] = { icon: post.icon };
        return storedImage[post._id];
    }

    React.useEffect(() => {
        let isMounted = true;
        getImages()
            .then(data => {
                if (isMounted) {
                    setIcon(data.icon);
                };
            });
        return () => { isMounted = false };
    }, [post]);

    return (
        <>
            {icon &&
                <TouchableOpacity onPress={() => navigation.navigate('ProfilePostDetail', { post: post })} style={{ ...style, ...styles.imageBox }}>
                    <Image style={styles.image} source={{ uri: icon }} />
                </TouchableOpacity>
            }
        </>
    )
}

ImageBox = React.memo(ImageBox);

function chunkArray(myArray, chunk_size) {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        tempArray.push(myArray.slice(index, index + chunk_size));
    }

    return tempArray;

}

function ImageRow3({ chunk }) {
    return (<View style={{ flexDirection: 'row', marginTop: 2.5 }}>
        <ImageBox post={chunk[0]} />
        {chunk[1] && <ImageBox post={chunk[1]} style={{ marginHorizontal: 2.5 }} />}
        {chunk[2] && <ImageBox post={chunk[2]} />}
    </View>);
}

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};



function ImageRows({ posts }) {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const chunks = chunkArray(posts, 3);
        const newRows = [];
        for (let i = 0; i < chunks.length; i++)
            newRows.push(<ImageRow3 chunk={chunks[i]} key={i} />);
        setRows(newRows)
    }, [posts]);

    return (
        <View>
            {rows.length > 0 && rows}
        </View>
    )
};

ImageRows = React.memo(ImageRows);

function ImageList({ user }) {
    const [newest, setNewest] = React.useState(null);
    const [oldest, setOldest] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const [finished, setFinished] = React.useState(false);
    const [busy, setBusy] = React.useState(false);
    const [posts, setPosts] = React.useState([]);
    const [chunks, setChunks] = React.useState([]);

    const ref = React.useRef(null);

    useScrollToTop(ref);

    const getPosts = async ({ getNew, getOld }) => {
        setBusy(true);
        let res;
        if (getOld)
            res = await listPostsOfUser({ userid: user._id, before: oldest ? oldest : null });
        else if (getNew)
            res = await listPostsOfUser({ userid: user._id, after: newest ? newest : null });

        if (res.status === 200) {
            const data = await res.json();
            if (data.length > 0) {
                let timeline;

                if (getOld)
                    timeline = posts ? posts.concat(data) : data;
                else if (getNew)
                    timeline = posts ? data.concat(posts) : data;

                setPosts(timeline);
                setChunks(chunkArray(timeline, 3));
                setNewest(timeline[0].createdAt);
                setOldest(timeline[timeline.length - 1].createdAt);
            }

            else if (getOld)
                setFinished(true);
        }
        setRefreshing(false);
        setBusy(false);
    }


    const onRefresh = () => {
        if (!busy) {
            setRefreshing(true);
            getPosts({ getNew: true });
        }
    };


    React.useEffect(() => {
        getPosts({ getOld: true });
    }, []);

    const handleScroll = ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
            if (!busy && !finished)
                getPosts({ getOld: true });
        }

    };


    return (
        <FlatList style={styles.scrollView} showsVerticalScrollIndicator={false}
            ref={ref}
            onScroll={handleScroll}
            data={chunks}
            renderItem={post => (
                <ImageRow3 id={post.index} chunk={post.item} />
            )}
            keyExtractor={item => item[0]._id}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}


                />
            }
        >
        </FlatList>
    );
}

function PostDetailScreen({ navigation, route }) {
    const { post, ready, user } = route.params;
    post.user = user;

    return (
        <>
            <NavBar onPress={navigation.goBack} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Post post={post} ready={ready} />
                <View style={{ height: 30 }} />
            </ScrollView>
        </>
    );
}


function MainScreen({ navigation, route, userReducer }) {
    const user = route?.params?.user;
    const self = route?.params?.self;

    let width = self ? '80%' : (selfIsManager() ? '80%' : '100%');

    return (
        <>
            <View style={styles.header} >
                <Image style={styles.profile} source={require('../../icons/woman.png')} />
                <View style={styles.rightSection}>
                    <View style={styles.firstRow} >
                        <Text style={{ ...styles.name, width: width }}>{user.name}</Text>
                        <View style={{ flexDirection: 'row', paddingTop: 5, alignItems: 'center' }}>
                            {
                                !self && selfIsManager() && user.role === 0 &&
                                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate('ProfilePrivilege', { user: user })} ><TwoUser /></TouchableOpacity>
                            }
                            {
                                self &&
                                <>
                                    {/* <TouchableOpacity style={styles.notification} onPress={() => navigation.navigate('ProfileNotifications')} >
                                        <Notification />
                                    </TouchableOpacity> */}
                                    <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate('ProfileSettings')} ><Settings /></TouchableOpacity>
                                </>
                            }
                        </View>

                    </View>
                    <Text style={styles.title}>{roles[user.role]}</Text>
                </View>
            </View>
            <ImageList user={user} />
        </>
    )
}

const mapStateToProps = (state) => ({
    userReducer: state.userReducer
});

MainScreen = connect(mapStateToProps)(MainScreen);


function ProfileScreen({ route }) {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='ProfileMain' component={MainScreen} initialParams={route.params} />
            <Stack.Screen name='ProfileNotifications' component={NotificationsScreen} />
            <Stack.Screen name='ProfileSettings' component={SettingsScreen} />
            <Stack.Screen name='ProfilePrivilege' component={PrivilegeScreen} />
            <Stack.Screen name='ProfilePostDetail' component={PostDetailScreen} initialParams={route.params} />


        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    imageBox: {
        width: '33%'
    },
    header: {
        marginTop: 50,
        marginLeft: 15,
        flexDirection: 'row'
    },
    profile: {
        width: 51,
        height: 51,
        borderRadius: 100

    },
    rightSection: {
        marginHorizontal: 15
    },
    firstRow: {
        flex: 1,
        flexDirection: 'row'
    },
    name: {
        fontFamily: 'SFProText-Bold',
        fontSize: 24,
        color: '#0A151F',
        flexDirection: 'row',
        width: '62%',
    },
    notification: {
        marginRight: 10,
        // alignSelf: 'center'
    },
    settings: {
        // alignSelf: 'center'
    },
    title: {
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 12,
        color: '#0A151F'
    },
    scrollView: {
        marginTop: 15
    }
});

export default ProfileScreen;