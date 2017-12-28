
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TextBox from './common/textbox';
import Button from './common/button';

export default class AssetValidation extends Component{
  constructor(props){
    super(props);

    this.state = {
      validationId: null
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  onSave(){
    this.props.navigation.navigate('ValidateAssets', {validationId: this.state.validationId});
  }

  // -----------------------------------------------------------------
  render(){
    return(
      <View style={styles.container}>
        <Icon name="pencil" size={100} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        <Text style={styles.title}>Please enter the validation ID to begin</Text>

        <View style={styles.textboxContainer}>
          <TextBox name="validationId" onChangeText={this.onChangeText} placeholder="Validation ID"/>
        </View>

        <View style={styles.buttonPanel}>
          <Button label="SAVE" onPress={this.onSave} style={styles.saveButton}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },

  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },

  label: {
    color: '#414141',
    fontWeight: 'bold'
  },

  textboxContainer: {
    marginBottom: 15,
    marginHorizontal: 30
  },

  buttonPanel: {
    alignItems: 'center'
  },

  saveButton: {
    backgroundColor: '#414141'
  }
});