import { StackNavigator } from 'react-navigation';
import React, { Component } from 'react';
import { TouchableHighlight, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Scanner from './components/scanner';
import Login from './components/login';
import Home from './components/home';
import AssetSummary from './components/assetSummary';
import Setting from './components/setting';
import AssetValidation from './components/assetValidation';
import ValidateAssets from './components/validateAssets';

const RootNavigator = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      title: 'HOME'
    })
  },
  Scanner: {
    screen: Scanner,
    navigationOptions: ({navigation}) => ({
      header: null
    })
  },
  Setting: {
    screen: Setting,
    navigationOptions: ({navigation}) => ({
      title: 'SETTINGS'
    })
  },
  AssetSummary: {
    screen: AssetSummary,
    navigationOptions: ({navigation}) => ({
      title: 'ASSET DETAILS',
      headerLeft: (
        <TouchableHighlight>
          <Icon style={{padding: 15}} name="arrow-left" size={20} color="#f5f5f5" onPress={async () => {
            let key = await AsyncStorage.getItem('scanner-screen-key');
            navigation.goBack(key);
          }}/>
        </TouchableHighlight>)
    })
  },
  AssetValidation: {
    screen: AssetValidation,
    navigationOptions: ({navigation}) => ({
      title: 'ASSET VALIDATION'
    })
  },
  ValidateAssets: {
    screen: ValidateAssets,
    navigationOptions: ({navigation}) => ({
      title: 'VALIDATE ASSETS'
    })
  }
},{
  navigationOptions: ({navigation}) => ({
    headerStyle: { backgroundColor: '#414141' },
    headerTintColor: '#f5f5f5',
    headerLeft: (<TouchableHighlight><Icon style={{padding: 15}} name="arrow-left" size={20} color="#f5f5f5" onPress={() => navigation.goBack(null)}/></TouchableHighlight>)
  })
});

export default RootNavigator;