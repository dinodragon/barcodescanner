
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ListView, TouchableOpacity, AsyncStorage } from 'react-native';
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
      assets: [],
      userId: null,
      errorMessage: null
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
  async componentWillMount(){
    let userId = await AsyncStorage.getItem("userId");
    this.setState({userId: userId});

    let resp = await Api.get(`api/StockTakeLines?stockTakeMasterID=${this.masterId}&userid=${userId}`);
    if(!resp.ok){
      alert('Error happen while retreiving the existing items. Please contact admin for support.');
      this.setState({errorMessage: 'Error happen while retreiving the existing items'});
      return;
    }

    let assets = await resp.json();
    this.setState({assets: assets});
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

    if(this.state.assets.some(a => a.u_facode == this.state.faCode)){
      alert('The same stock had already been picked up.');
      return;
    }

    let resp = await Api.post(`api/StockTakeLines?item.stockTakeMasterID=${this.masterId}&item.u_facode=${this.state.faCode}&item.userid=${this.state.userId}`);
    if(!resp.ok) {
      alert('Error occur while picking up stock. Please try again. If the error persist, please contact admin for help.');
      return;
    }

    let data = await resp.json();
    this.setState({faCode: null, assets: [data, ...this.state.assets]});
  }

  // -----------------------------------------------------------------
  async onRemove(lineId, faCode){
    let resp = await Api.delete(`api/StockTakeLines?stockTakeLineID=${lineId}`);
    if(!resp.ok){
      alert(`Error happen when trying to remove item ${faCode}. Please try again. If the error persist, please contact admin for help.`);
      return;
    }

    this.setState({assets: this.state.assets.filter(data => data.StockTakeLineID != lineId)});
  }

  // -----------------------------------------------------------------
  onBarCodeRead(data){
    let faCode = data.data.split('#')[0];
    this.setState({faCode: faCode});
    this.onAdd();
  }

  // -----------------------------------------------------------------
  goToScanner(){
    this.props.navigation.navigate('ValidateAssetsScanner', {onBarCodeRead: this.onBarCodeRead});
  }

  // -----------------------------------------------------------------
  renderRow(data){
    return(
      <View style={styles.assetRow} key={data.u_facode}>
        <Icon name="archive" size={30} color="lightgrey"/>
        <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 16, flex: 1}}>{data.u_facode}</Text>
        <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 10}} onPress={() => this.onRemove(data.StockTakeLineID, data.u_facode)}>
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
        <Icon name="pencil" size={75} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        <Text style={styles.title}>Please scan asset QR or enter asset code</Text>
        <Text style={styles.title}>VALIDATION ID: <Text style={{color: 'grey'}}>{this.validationId}</Text></Text>

        <View style={styles.qrPanel}>
          <TouchableOpacity onPress={this.goToScanner}>
            <IonIcon name="ios-qr-scanner" size={75} color="#414141" style={{textAlign: 'center', marginHorizontal: 10}}/>
          </TouchableOpacity>
          <TextBox name="faCode" onChangeText={this.onChangeText} style={{flex: 1}} value={this.state.faCode}/>
          <Button label="ADD" onPress={this.onAdd} style={styles.addButton}/>
        </View>

        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

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
  },

  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginHorizontal: 30
  },
});