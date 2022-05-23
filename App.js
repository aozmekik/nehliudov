import 'react-native-gesture-handler';
import React from 'react';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { Provider } from 'react-redux'
import MainScreen from './src/views/main';

import store from './src/reducers/store';

class App extends React.Component {
  state = {
    appIsReady: false,
  };

  componentDidMount() {
    const prepare = async () => {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      // Pre-load fonts, make any API calls you need to do here
      await this.loadAssetsAsync();

      this.setState(prevState => ({ appIsReady: true }));
      
      await SplashScreen.hideAsync();
    }; 

    prepare();

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
  }

  render() {
    if (!this.state.appIsReady)
      return null;
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
