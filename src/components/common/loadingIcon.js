import React, { Component } from 'react';
import { Image } from 'react-native';

const LoadingIcon = ({size}) => {
  size = size || 50

  return(
    <Image style={{width: size, height: size}} source={{uri: 'https://s3-ap-southeast-1.amazonaws.com/cel-barcodescanner/loading.gif'}}/>
  )
}

export default LoadingIcon;