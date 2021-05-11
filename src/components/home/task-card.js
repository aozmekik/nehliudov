import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';



class TaskCard extends React.Component {
    state = {
        fontLoaded: false,
    };

    componentDidMount() {
        this.loadAssetsAsync();
    }

    async loadAssetsAsync() {
        await Font.loadAsync({
            'SFProText-Bold': require('../../assets/fonts/SFProText-Bold.otf'),
            'SFProText-Regular': require('../../assets/fonts/SFProText-Regular.otf')

        });
        this.setState({ fontLoaded: true });
    }


    render() {
        const { title, desc, } = this.props
        if (!this.state.fontLoaded)
            return (<AppLoading />)
        else {
            return (
                <TouchableOpacity style={[this.props.style, styles.container]}>
                    <View style={styles.leftItem} />
                    <View style={styles.rightItem}>
                        <Text style={styles.h1}>{title}</Text>
                        <Text style={styles.h2}>{desc}</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }


}


const styles = StyleSheet.create({
    container: {
        padding: 5,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 5
    },

    leftItem: {
        margin: 12,
        width: 3,
        // height: 40,
        height: '80%',
        backgroundColor: '#E3E5E8',

    },

    rightItem: {
        marginTop: 12,
        marginRight: 12,
        flex: 1
    },

    h1: {
        color: '#0A151F',
        fontSize: 18,
        fontFamily: 'SFProText-Bold'
    },

    h2: {
        color: '#48515B',
        fontSize: 12,
        fontFamily: 'SFProText-Regular',
    }



})

export default TaskCard;