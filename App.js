import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import RootNavigator from './src/route';
import TextBox from './src/components/common/textbox';
import Button from './src/components/common/button';

export default class App extends Component<{}> {
  constructor(props){
    super(props);

    this.state = {
      showSplash: true
    };
  }

  // -----------------------------------------------------------------
  componentDidMount(){
    setTimeout(() => this.setState({showSplash: false}), 1000);
  }

  // -----------------------------------------------------------------
  render() {
    return(
      <View style={styles.container}>
        {
          this.state.showSplash &&
          <View style={styles.splash}>
            <Image style={styles.splashImage} source={{uri: 'https://s3-ap-southeast-1.amazonaws.com/cel-barcodescanner/splash.jpeg'}} resizeMode="cover"/>
          </View>
        }
        {
          !this.state.showSplash && <RootNavigator/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#414141',
  },

  splash: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems:'center'
  },

  splashImage: {
    width: 300,
    height: 300
  }
});
