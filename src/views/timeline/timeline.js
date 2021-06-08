import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";


import { Camera, More, Search } from '../../components/icons';
import Post from './post';
import PostAddScreen from './post-add';
import Detail from './detail';
import SearchUserScreen from './search-user';

import { listPosts } from '../../services/post-services';
import { selfIsGuest } from '../../services/user-services';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

function TimelineMainScreen({ navigation, route }) {
    const [newest, setNewest] = React.useState(null);
    const [oldest, setOldest] = React.useState(null);
    const [finished, setFinished] = React.useState(false);

    const [posts, setPosts] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        getPosts({ getNew: true });
    };

    const getPosts = async ({ getNew, getOld }) => {
        setBusy(true);
        let res;
        if (getOld)
            res = await listPosts({ before: oldest ? oldest : null });
        else if (getNew)
            res = await listPosts({ after: newest ? newest : null });

        if (res.status === 200) {
            const data = await res.json();
            if (data.length > 0) {
                let timeline;

                if (getOld)
                    timeline = posts ? posts.concat(data) : data;
                else if (getNew)
                    timeline = posts ? data.concat(posts) : data;

                setPosts(timeline);
                setNewest(timeline[0].createdAt);
                setOldest(timeline[timeline.length - 1].createdAt);
            }
            else if (getOld)
                setFinished(true);
        }
        setRefreshing(false);
        setBusy(false);
    }

    if (route?.params?.post) {
        getPosts({ getNew: true });
        delete route.params.post;
    }

    React.useEffect(() => {
        getPosts({ getOld: true });
        getPosts({ getNew: true });
    }, []);

    const handleScroll = ({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
            if (!busy && !finished)
                getPosts({ getOld: true });
        }

    };

    const refRBSheet = React.useRef();
    return (<View>
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            height={hp('60%')}
            customStyles={{
                container: {
                    borderRadius: 10
                },
                draggableIcon: {
                }
            }}
        >
            <Detail />
        </RBSheet>

        <View style={styles.header}>
            <TouchableOpacity style={styles.search} onPress={() => navigation.navigate('TimelineSearchUser')}><Search fill='black' /></TouchableOpacity>
            {selfIsGuest() ? <View style={{ marginLeft: '70%' }} /> : <TouchableOpacity style={styles.camera} onPress={() => navigation.navigate('TimelinePostAdd')}><Camera stroke='black' /></TouchableOpacity>}
            <TouchableOpacity style={styles.more} onPress={() => refRBSheet.current.open()}><More fill='black' /></TouchableOpacity>
        </View>
        <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={400} showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }

        >
            <>
                {
                    posts?.length > 0 && posts.map(post =>
                        <Post key={post._id} post={post} style={styles.post} />
                    )
                }
                <View style={{ height: 120 }} />
                {/* <Post />
                <Post style={styles.post} /> */}
            </>

        </ScrollView >
    </View>
    );
}

const Stack = createStackNavigator();

function TimelineScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='TimelineMain' component={TimelineMainScreen} />
            <Stack.Screen name='TimelinePostAdd' component={PostAddScreen} />
            <Stack.Screen name='TimelineSearchUser' component={SearchUserScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    header: {
        // position: ',
        paddingTop: 25,
        paddingBottom: 10,
        zIndex: 1,
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
    },
    search: {
        marginTop: 15,
        marginHorizontal: 15,
    },
    more: {
        marginTop: 10,
        marginHorizontal: 15,
    },
    camera: {
        marginLeft: '65%',
        marginTop: 10,
    },
    post: {
        marginTop: 50,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default TimelineScreen;