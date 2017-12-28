import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

const Button = ({onPress, label, style, labelStyle}) => {
  style = style || {};
  labelStyle = labelStyle || {};

  return(
    <TouchableNativeFeedback onPress={onPress} background={TouchableNativeFeedback.Ripple("lightgrey")}>
      <View style={[styles.button, style]}>
        <Text style={[styles.buttonLabel, labelStyle]}>{label}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 4,
  },

  buttonLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f5f5f5'
  }
});

export default Button;