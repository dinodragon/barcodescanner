import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import RootNavigator from '../route';
import TextBox from './common/textbox';
import Button from './common/button';
import Api from '../api';

export default class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false,
      username: null,
      password: null,
      errorMessage: null
    };

    this.onLogin = this.onLogin.bind(this);
    this.onSetting = this.onSetting.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  // -----------------------------------------------------------------
  async onLogin(){
    this.host = await AsyncStorage.getItem('host');
    this.port = await AsyncStorage.getItem('port');
    if(!this.host){
      this.setState({errorMessage: 'The Host and port is not set. Please configure the Host and Port at Setting page.'})
      return;
    }

    let resp = await Api.get(`api/userprofiles?UserID=${this.state.username}&Password=${this.state.password}`);
    if(!resp.ok){
      this.setState({errorMessage: 'Invalid credential. Please try again.'});
      return;
    }

    this.setState({errorMessage: null});
    this.props.navigation.navigate('Home');
  }

  // -----------------------------------------------------------------
  onSetting(){
    this.props.navigation.navigate('Setting');
    this.setState({errorMessage: null});
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  render(){
    return(
      <View style={styles.container}>
        <Icon name="sign-in" size={150} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        
        <View style={styles.textboxContainer}>
          <Text style={styles.label}>USER ID</Text>
          <TextBox name="username" onChangeText={this.onChangeText} placeholder="User ID"/>
        </View>

        <View style={styles.textboxContainer}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextBox name="password" onChangeText={this.onChangeText} placeholder="Password" secureTextEntry={true}/>
        </View>

        <View style={styles.buttonPanel}>
          <Button label="SETTINGS" onPress={this.onSetting} style={styles.settingButton}/>
          <Button label="LOGIN" onPress={this.onLogin}/>
        </View>

        { this.state.errorMessage && <Text style={styles.errorMessage}>{this.state.errorMessage}</Text> }
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

  textboxContainer: {
    marginBottom: 15,
    marginHorizontal: 30
  },

  label: {
    color: 'white',
    fontWeight: 'bold'
  },

  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  settingButton: {
    borderColor: '#f5f5f5'
  },

  errorMessage: {
    textAlign: 'center', 
    color: 'red',
    marginHorizontal: 30
  }
});
