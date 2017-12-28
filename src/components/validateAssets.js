
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';

import TextBox from './common/textbox';
import Button from './common/button';

export default class ValidateAssets extends Component{
  constructor(props){
    super(props);

    this.state = {
      assetCode: null,
      assets: [{id: 1, name: 'Asset One'}, {id: 2, name: 'Asset Two'}, {id: 3, name: 'Asset Three'}]
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  onAdd(){
    
  }

  // -----------------------------------------------------------------
  renderRow(data){
    return(
      <TouchableOpacity style={styles.assetRow} key={data.item.id}>
        <IonIcon name="ios-trash" size={30} color="#414141"/>
        <Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 16}}>{data.item.name}</Text>
      </TouchableOpacity>
    )
  }

  // -----------------------------------------------------------------
  render(){
    return(
      <View style={styles.container}>
        <Icon name="pencil" size={100} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        <Text style={styles.title}>Please scan asset QR or enter asset code</Text>
        <Text style={styles.title}>VALIDATION ID: <Text style={{color: 'grey'}}>{this.props.navigation.state.params.validationId}</Text></Text>

        <View style={styles.qrPanel}>
          <IonIcon name="ios-qr-scanner" size={75} color="#414141" style={{textAlign: 'center', marginHorizontal: 10}}/>
          <TextBox name="assetCode" onChangeText={this.onChangeText} style={{flex: 1}}/>
          <Button label="ADD" onPress={this.onAdd} style={styles.addButton}/>
        </View>

        <FlatList
          data={this.state.assets}
          renderItem={this.renderRow}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },

  qrPanel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  addButton: {
    width: 75,
    backgroundColor: '#414141'
  },

  assetRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});