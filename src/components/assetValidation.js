
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, AsyncStorage, ListView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import TextBox from './common/textbox';
import Button from './common/button';
import Api from '../api';

export default class AssetValidation extends Component{
  constructor(props){
    super(props);

    this.state = {
      validationId: null,
      errorMessage: null,
      userId: null,
      userGroup: null,
      stockTakes: [],
      stockTakeError: null
    };

    this.onChangeText = this.onChangeText.bind(this);
    this.onSave = this.onSave.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onPress = this.onPress.bind(this);
    this.datasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  // -----------------------------------------------------------------
  async componentWillMount(){
    let userId = await AsyncStorage.getItem("userId");
    let userGroup = await AsyncStorage.getItem("userGroup");
    this.setState({userId: userId, userGroup: userGroup});

    let resp = await Api.get("api/StockTakeMasters");
    if(!resp.ok){
      this.setState({stockTakeError: 'Some error happen when retreiving available stock take. Please contact admin for support.'})
      return;
    }

    let stockTakes = await resp.json();
    this.setState({stockTakes: stockTakes});
  }

  // -----------------------------------------------------------------
  onChangeText(value, context){
    let state = {errorMessage: null};
    state[context] = value;
    this.setState(state);
  }

  // -----------------------------------------------------------------
  async onSave(){
    if(!this.state.validationId){
      this.setState({errorMessage: 'Please enter the Validation ID to proceed.'});
      return;
    }

    this.setState({errorMessage: null});
    let body = {
      item: { stockTakeName: this.state.validationId }
    };

    let stockTake = this.state.stockTakes.find(s => s.StockTakeName == this.state.validationId);
    if(stockTake){
      this.onPress(stockTake);
      return;
    }

    let resp = await Api.post(`api/StockTakeMasters?item.stockTakeName=${this.state.validationId}&item.userid=${this.state.userId}`);
    if(!resp.ok){
      let errMsg = resp.status == 409 ? `Stock take ${this.state.validationId} is already exist.` : 'Error happen while performing stock take. Please contact admin for support';
      this.setState({errorMessage: errMsg});
      return;
    }

    let data = await resp.json();
    Object.assign(data, { validationId: this.state.validationId })
    this.setState({stockTakes: [data, ...this.state.stockTakes]})
    this.props.navigation.navigate('ValidateAssets', data);
  }

  // -----------------------------------------------------------------
  onPress(stockTake){
    Object.assign(stockTake, {validationId: stockTake.StockTakeName});
    this.props.navigation.navigate('ValidateAssets', stockTake);
  }

  // -----------------------------------------------------------------
  renderRow(data){
    return(
      <TouchableOpacity style={styles.stockTakeRow} onPress={() => {this.onPress(data)}}>
        <Icon name="archive" size={30} color="lightgrey"/>
        <Text style={{marginLeft: 20, fontWeight: 'bold', fontSize: 16, flex: 1}}>{data.StockTakeName}</Text>
        <Icon name="chevron-right" size={30} color="lightgrey"/>
      </TouchableOpacity>
    );
  }

  // -----------------------------------------------------------------
  render(){
    let datasource = this.datasource.cloneWithRows(this.state.stockTakes);
    return(
      <View style={styles.container}>
        <Icon name="pencil" size={75} color="#ef893d" style={{textAlign: 'center', margin: 20}}/>
        { 
          this.state.userGroup && this.state.userGroup == "ADMIN-MD" &&
          <View>
            <Text style={styles.title}>Please enter the validation ID to begin</Text>

            <View style={styles.textboxContainer}>
              <TextBox name="validationId" onChangeText={this.onChangeText} placeholder="Validation ID"/>
            </View>

            <View style={styles.buttonPanel}>
              <Button label="SAVE" onPress={this.onSave} style={styles.saveButton}/>
            </View>

            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
            { this.state.stockTakes.length > 0 && <Text style={[styles.title]}>---------- OR ----------</Text> }
          </View>
        }
        { 
          this.state.stockTakes.length > 0 && 
          <View style={{flex: 1}}>
            <Text style={styles.title}>Select a stock take to continue</Text>
            <Text style={styles.errorMessage}>{this.state.stockTakeError}</Text>
            <ListView
              style={{flex: 1}}
              enableEmptySections
              dataSource={datasource}
              renderRow={this.renderRow}
            />
          </View>
        }
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

  label: {
    color: '#414141',
    fontWeight: 'bold'
  },

  textboxContainer: {
    marginBottom: 5,
    marginHorizontal: 30
  },

  buttonPanel: {
    alignItems: 'center'
  },

  saveButton: {
    backgroundColor: '#414141'
  },

  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginHorizontal: 30
  },

  stockTakeRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey'
  }
});