import 'react-native-gesture-handler';
import React from 'react';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux'
import MainScreen from './src/views/main';

import rootReducer from './src/reducers';


import { createStore } from 'redux';
const store = createStore(rootReducer);


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
    this.setState(prevState => ({ fontLoaded: true }));
  }

  render() {
    if (!this.state.fontLoaded)
      return (<AppLoading />);
    else {
      return (
        <Provider store={store}>
          <MainScreen />
        </Provider >
      );
    }
  }
}

export default App;
