import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import RootNavigator from '../route';
import TextBox from './common/textbox';
import Button from './common/button';

export default class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      loggedIn: false,
      username: null,
      password: null
    };

    this.onLogin = this.onLogin.bind(this);
    this.onSetting = this.onSetting.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  // -----------------------------------------------------------------
  onLogin(){
    // TODO: Call API to perform authentication
    this.props.navigation.navigate('Home');
  }

  // -----------------------------------------------------------------
  onSetting(){
    this.props.navigation.navigate('Setting');
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
          <TextBox name="username" onChangeText={this.onChangeText} placeholder="Password" secureTextEntry={true}/>
        </View>

        <View style={styles.buttonPanel}>
          <Button label="SETTINGS" onPress={this.onSetting} style={styles.settingButton}/>
          <Button label="LOGIN" onPress={this.onLogin}/>
        </View>
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
  }
});
