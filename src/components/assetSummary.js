
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TextBox from './common/textbox';
import Button from './common/button';

export default class AssetSummary extends Component{
  constructor(props){
    super(props);

    let data = props.navigation.state.params.data.split('#');
    this.state = {
      faCode: data[0],
      groupCode: data[1],
      createdDate: data[2],
      location: data[3]
    };

    this.goBack = this.goBack.bind(this);
    this.onDetailsClick = this.onDetailsClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    
    debugger
  }

  // -----------------------------------------------------------------
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.goBack);
  }

  // -----------------------------------------------------------------
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', this.goBack);
  }

  // -----------------------------------------------------------------
  async goBack(){
    let key = await AsyncStorage.getItem('scanner-screen-key');
    this.props.navigation.goBack(key);
    return true;
  }

  // -----------------------------------------------------------------
  onDetailsClick(){
    alert('no screen design provided for this.');
  }

  // -----------------------------------------------------------------
  onSave(){
    alert(`location ${this.state.location} will be updated.`);
    this.goBack();
  }

  // -----------------------------------------------------------------
  onChangeText(value, name){
    let state = {};
    state[name] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  render(){
    let { groupCode, faCode, createdDate, location } = this.state;
    return(
      <View style={styles.container}>
        <Icon name="md-cube" size={100} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>

        <View style={styles.infoFrame}>
          <View style={styles.infoRow}>
            <Text style={styles.titleLabel}>Group Code</Text>
            <Text style={styles.valueLabel}>{groupCode}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.titleLabel}>FA Code</Text>
            <Text style={styles.valueLabel}>{faCode}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.titleLabel}>Created Date</Text>
            <Text style={styles.valueLabel}>{createdDate}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.titleLabel}>Location</Text>
            <TextBox name="location" onChangeText={this.onChangeText} style={{flex: 2}} value={location}/>
          </View>
        </View>

        <View style={styles.buttonPanel}>
          <Button label="DETAILS" onPress={this.onDetailsClick} style={styles.button}/>
          <Button label="SAVE" onPress={this.onSave} style={styles.button}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },

  infoFrame: {
    margin: 20
  },

  infoRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center'
  },

  titleLabel: {
    fontWeight: 'bold',
    flex: 1
  },

  valueLabel: {
    color: 'grey',
    flex: 2
  },

  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  button: {
    backgroundColor: '#414141'
  }
});