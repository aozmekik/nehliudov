import * as React from 'react';

import { StyleSheet, View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';


import { Bookmark, Time, Chat } from '../../components/icons';

import { roles } from '../../models/user';
import { getImage } from '../../services/image-services';
import { getTownsDict } from '../../services/location-services';

Date.prototype.timeElapsed = function () {
    const now = new Date();
    const year = now.getFullYear() - this.getFullYear();
    if (year > 0)
        return `${year} yıl`;
    const month = now.getMonth() - this.getMonth();
    if (month > 0)
        return `${month} ay`;
    const day = now.getDay() - this.getDay();
    if (day > 0)
        return `${day} gün`;
    const hours = now.getHours() - this.getHours();
    if (hours > 0)
        return `${hours} saat`;
    const mins = now.getMinutes() - this.getMinutes();
    if (mins > 0)
        return `${mins} dakika`;
    return 'yeni';
}


function Post({ post, style, navigation, route, onProfileTouch, ...props }) {
    const [images, setImages] = React.useState([]);
    const [towns, setTowns] = React.useState(null);

    const getImages = async () => {
        const res = await getImage(post.image);
        if (res.status === 200) {
            const data = await res.json();
            setImages(data);
        }
    }

    const getTowns = async () => {
        // FIXME. hardcoded city
        const dict = await getTownsDict(34);
        setTowns(dict);
    }

    React.useEffect(() => {
        getImages();
        getTowns();
    }, [post]);


    return (
        <View style={{ ...styles.container, ...style }} {...props}>
            <View style={styles.section1}>
                <TouchableOpacity onPress={onProfileTouch ? onProfileTouch : undefined}>
                    <Image style={styles.profile} source={require('../../icons/woman.png')} />
                </TouchableOpacity>
                <View style={styles.headerContent} >
                    <View style={styles.headerTitle}>
                        <Text style={styles.name}>{post.createdBy?.name}</Text>
                        {towns && <Text style={styles.district}>{towns[post.town]}</Text>}
                    </View>
                    <Text style={styles.title}>{roles[post.createdBy?.role]}</Text>
                </View>
            </View>
            {images.length > 0 ?
                <Swiper style={{
                    height: 380
                }} paginationStyle={{ marginBottom: -35 }} activeDotColor='black' loop={false}>
                    {
                        images.map((image, index) =>
                            <Image key={`image${index}`} style={styles.image} source={{ uri: image }} />
                        )
                    }
                </Swiper> :
                <ActivityIndicator size='large' style={{ alignSelf: 'center', height: 380 }} color='#000000' />
            }


            {/* <View style={styles.section2}>
                <TouchableOpacity ><Chat /></TouchableOpacity>
                < Time style={styles.time} />
            </View> */}
            <View style={{ marginHorizontal: 5 }}>
                <View style={styles.section3}>
                    <Text style={styles.name}>{post.createdBy?.name}</Text>
                    <Text style={styles.desc}>{post.statement}
                        <Text style={styles.elapsed}>  {new Date(post.createdAt).timeElapsed()}</Text>
                    </Text>
                </View>
                {post.comments &&
                    <TouchableOpacity>
                        <Text style={styles.comment}>{post.comments.length} yorumu gör</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        borderRadius: 10,
    },
    section1: {
        marginHorizontal: 10,
        flexDirection: 'row',
    },
    profile: {
        width: 51,
        height: 51,
        borderRadius: 100
    },
    section2: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerContent: {
        marginHorizontal: 10,
        flex: 1,
    },
    headerTitle: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
    },
    name: {
        fontFamily: 'SFProText-Bold',
        fontSize: 14,
        color: '#0A151F'
    },
    district: {
        fontFamily: 'SFProText-Medium',
        fontSize: 12
    },
    title: {
        fontFamily: 'SFProText-MediumItalic',
        fontSize: 12
    },
    image: {
        marginTop: 10,
        width: '100%',
        height: undefined,
        aspectRatio: 1,
    },
    chat: {
        flex: 1,
    },
    bookmark: {
        flex: 8,
    },
    time: {
        flex: 1,
    },
    section3: {
        flexDirection: 'row'
    },
    desc: {
        flex: 1,
        marginLeft: 5,
        fontFamily: 'SFProText-Regular',
        fontSize: 12,
        marginTop: 2,
    },
    elapsed: {
        fontFamily: 'SFProText-RegularItalic',
        fontSize: 12,
        color: '#48515B'
    },
    comment: {
        fontFamily: 'SFProText-Regular',
        fontSize: 12
    }
});

export default Post;

