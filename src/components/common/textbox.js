import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput } from 'react-native';

const TextBox = ({onChangeText, value, style, name, placeholder, secureTextEntry}) => {
  style = style || {};
  secureTextEntry = secureTextEntry || false;

  return(
    <TextInput
      style={[styles.textbox, style]}
      onChangeText={(text) => onChangeText(text, name)}
      value={value}
      underlineColorAndroid="transparent"
      placeholderTextColor="lightgrey"
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  )
}

const styles = StyleSheet.create({
  textbox: {
    height: 40,
    borderWidth: 1,
    borderColor: '#414141',
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
    padding: 10
  }
});

export default TextBox;