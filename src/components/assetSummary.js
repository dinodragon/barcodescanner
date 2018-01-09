
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, BackHandler, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import TextBox from './common/textbox';
import Button from './common/button';
import Api from '../api';
import LoadingIcon from './common/loadingIcon';

const backgroundColors = ['#f5f5f5', 'white']
export default class AssetSummary extends Component{
  constructor(props){
    super(props);

    let data = props.navigation.state.params.data.split('#');
    this.state = {
      faCode: data[0],
      groupCode: data[1],
      createdDate: data[2],
      location: data[3],
      detail: null,
      loading: false,
      successMessage: null
    };

    this.goBack = this.goBack.bind(this);
    this.onDetailsClick = this.onDetailsClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
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
    await AsyncStorage.removeItem('scanner-screen-key');
    this.props.navigation.goBack(key);
    return true;
  }

  // -----------------------------------------------------------------
  async onDetailsClick(){
    this.setState({loading: true});
    let resp = await Api.get(`api/Assets/${this.state.faCode}`);
    if(!resp.ok) return;
    
    let detail = await resp.json();
    setTimeout(() => this.setState({detail: detail, loading: false}), 1000);
  }

  // -----------------------------------------------------------------
  async onSave(){
    let resp = await Api.put(`Assets/${this.state.faCode}/Location/${this.state.location}`);
    if(!resp.ok) return;

    this.setState({successMessage: 'The location had been succesfully updated.'});
    if(this.state.detail) this.onDetailsClick();

    setTimeout(() => this.setState({successMessage: null}), 3000);
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
      <ScrollView style={styles.container}>
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
        { this.state.successMessage && <Text style={{textAlign: 'center', color: 'green'}}>{this.state.successMessage}</Text> }
        { this.state.loading && 
          <View style={{alignItems: 'center'}}><LoadingIcon/></View> 
        }
        { !this.state.loading && this.state.detail && 
          <View style={styles.infoFrame}>
            {
              Object.keys(this.state.detail).map((v, i) => {
                return(
                  <View style={[styles.infoRow, {backgroundColor: backgroundColors[i % 2]}]} key={i}>
                    <Text style={styles.titleLabel}>{v}</Text>
                    <Text style={styles.valueLabel}>{this.state.detail[v]}</Text>
                  </View>
                )
              })
            }
          </View>
        }
      </ScrollView>
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
    paddingVertical: 5,
    alignItems: 'center'
  },

  titleLabel: {
    fontWeight: 'bold',
    flex: 1,
    paddingLeft: 5,
    marginRight: 10
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