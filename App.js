import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


import TabBar from './src/components/tab-bar';
import HomeScreen from './src/views/home';
import ProfileScreen from './src/views/profile';
import TaskScreen from './src/views/task';
import { SafeAreaView } from 'react-native';

const Tab = createBottomTabNavigator();


class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  componentDidMount() {
    this.loadAssetsAsync();
  }

  async loadAssetsAsync() {
    await Font.loadAsync({
      'SFProText-Bold': require('./src/assets/fonts/SFProText-Bold.otf'),
      'SFProText-BoldItalic': require('./src/assets/fonts/SFProText-BoldItalic.otf'),
      'SFProText-Heavy': require('./src/assets/fonts/SFProText-Heavy.otf'),
      'SFProText-HeavyItalic': require('./src/assets/fonts/SFProText-HeavyItalic.otf'),
      'SFProText-Light': require('./src/assets/fonts/SFProText-Light.otf'),
      'SFProText-LightItalic': require('./src/assets/fonts/SFProText-LightItalic.otf'),
      'SFProText-Medium': require('./src/assets/fonts/SFProText-Medium.otf'),
      'SFProText-MediumItalic': require('./src/assets/fonts/SFProText-MediumItalic.otf'),
      'SFProText-Regular': require('./src/assets/fonts/SFProText-Regular.otf'),
      'SFProText-RegularItalic': require('./src/assets/fonts/SFProText-RegularItalic.otf'),
      'SFProText-Semibold': require('./src/assets/fonts/SFProText-Semibold.otf'),
      'SFProText-SemiboldItalic': require('./src/assets/fonts/SFProText-SemiboldItalic.otf'),
    });
    this.setState({ fontLoaded: true });
  }


  render() {
    if (!this.state.fontLoaded)
      return (<AppLoading />)
    else {
      return (
        <SafeAreaView style={styles.container} >
          <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" tabBar={props => <TabBar {...props} />}>
              <Tab.Screen name="Task" component={TaskScreen} />
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
