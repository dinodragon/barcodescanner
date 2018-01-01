
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ListView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {default as IonIcon} from 'react-native-vector-icons/Ionicons';

import TextBox from './common/textbox';
import Button from './common/button';
import Api from '../api';

export default class ValidateAssets extends Component{
  constructor(props){
    super(props);
    this.state = {
      faCode: null,
      assets: []
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.goToScanner = this.goToScanner.bind(this);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    this.onRemove = this.onRemove.bind(this);

    this.validationId = this.props.navigation.state.params.validationId;
    this.masterId = this.props.navigation.state.params.StockTakeMasterID;
    this.datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  async onAdd(){
    if(!this.state.faCode || this.state.faCode.trim() == "") return;

    if(this.state.assets.some(a => a == this.state.faCode)){
      alert('The same stock had already been picked up.');
      return;
    }

    let resp = await Api.post(`api/StockTakeLines?item.stockTakeMasterID=${this.masterId}&item.u_facode=${this.state.faCode}`);
    if(!resp.ok) {
      alert('Error occur while picking up stock. Please try again. If the error persist, please contact admin for help.');
      return;
    }

    this.setState({faCode: null, assets: [this.state.faCode, ...this.state.assets]});
  }

  // -----------------------------------------------------------------
  onRemove(faCode){
    this.setState({assets: this.state.assets.filter(code => code != faCode)});
  }

  // -----------------------------------------------------------------
  onBarCodeRead(data){
    let faCode = data.data.split('#')[0];
    this.setState({faCode: faCode});
  }

  // -----------------------------------------------------------------
  goToScanner(){
    this.props.navigation.navigate('ValidateAssetsScanner', {onBarCodeRead: this.onBarCodeRead});
  }

  // -----------------------------------------------------------------
  renderRow(code){
    return(
      <View style={styles.assetRow} key={code}>
        <Icon name="archive" size={30} color="lightgrey"/>
        <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 16, flex: 1}}>{code}</Text>
        <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 10}} onPress={() => this.onRemove(code)}>
          <IonIcon name="ios-trash" size={30} color="#414141"/>
        </TouchableOpacity>
      </View>
    )
  }

  // -----------------------------------------------------------------
  render(){
    let datasource = this.datasource.cloneWithRows(this.state.assets);
    return(
      <View style={styles.container}>
        <Icon name="pencil" size={100} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        <Text style={styles.title}>Please scan asset QR or enter asset code</Text>
        <Text style={styles.title}>VALIDATION ID: <Text style={{color: 'grey'}}>{this.validationId}</Text></Text>

        <View style={styles.qrPanel}>
          <TouchableOpacity onPress={this.goToScanner}>
            <IonIcon name="ios-qr-scanner" size={75} color="#414141" style={{textAlign: 'center', marginHorizontal: 10}}/>
          </TouchableOpacity>
          <TextBox name="faCode" onChangeText={this.onChangeText} style={{flex: 1}} value={this.state.faCode}/>
          <Button label="ADD" onPress={this.onAdd} style={styles.addButton}/>
        </View>

        <ListView
          enableEmptySections
          dataSource={datasource}
          renderRow={this.renderRow}
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
    paddingVertical: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey'
  }
});