import * as React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, FlatList } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { useScrollToTop } from '@react-navigation/native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import RBSheet from "react-native-raw-bottom-sheet";

import { connect } from 'react-redux';


import { Camera, More, Search } from '../../components/icons';
import Post from './post';
import PostAddScreen from './post-add';
import Detail from './detail';
import SearchUserScreen from './search-user';
import ProfileScreen from '../profile/profile';

import { restoreUser } from '../../reducers/actions';

import { listPosts } from '../../services/post-services';
import { selfIsGuest } from '../../services/user-services';
import { getCurrentUser } from '../../services/auth-services';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

function TimelineMainScreen({ navigation, route, dispatchRestoreUser }) {
    const [newest, setNewest] = React.useState(null);
    const [oldest, setOldest] = React.useState(null);
    const [finished, setFinished] = React.useState(false);

    const [posts, setPosts] = React.useState(null);
    const [busy, setBusy] = React.useState(false);
    const [refreshing, setRefreshing] = React.useState(false);

    const ref = React.useRef(null);
    const refreshUserState = React.useCallback(async () => {
        const restoredUser = await getCurrentUser();
        dispatchRestoreUser(restoredUser);
    }, []);

    useScrollToTop(ref);


    const onRefresh = () => {
        setRefreshing(true);
        getPosts({ getNew: true });
        refreshUserState();
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

    // might be other posts as well
    if (route?.params?.post) {
        getPosts({ getNew: true });
        delete route.params.post;
    }

    // FIXME. unmounted component error.

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
            height={hp('70%')}
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
            {/* selfIsGuest() */}
            {true ? <View style={{ marginLeft: '70%' }} /> : <TouchableOpacity style={styles.camera} onPress={() => navigation.navigate('TimelinePostAdd')}><Camera stroke='black' /></TouchableOpacity>}
            <TouchableOpacity style={styles.more} onPress={() => refRBSheet.current.open()}><More fill='black' /></TouchableOpacity>
        </View>
        {posts &&
            <FlatList
                ref={ref}
                data={posts}
                renderItem={post => (
                    <Post onProfileTouch={() => navigation.navigate('TimelineProfile', { user: post.item.createdBy })} post={post.item} style={styles.post} />
                )}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={handleScroll}

                // Performance settings
                removeClippedSubviews={true} // Unmount components when outside of window 
                initialNumToRender={2} // Reduce initial render amount
                maxToRenderPerBatch={1} // Reduce number in each render batch
                updateCellsBatchingPeriod={100} // Increase time between renders
                windowSize={7} // Reduce the window size
            />
        }
    </View >
    );
}

mapDispatchToProps = {
    dispatchRestoreUser: (user) => restoreUser(user)
};

TimelineMainScreen = connect(null, mapDispatchToProps)(TimelineMainScreen);

const Stack = createStackNavigator();

function TimelineScreen() {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='TimelineMain' component={TimelineMainScreen} />
            <Stack.Screen name='TimelinePostAdd' component={PostAddScreen} />
            <Stack.Screen name='TimelineSearchUser' component={SearchUserScreen} />
            <Stack.Screen name='TimelineProfile' component={ProfileScreen} />

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
        marginBottom: 25,
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