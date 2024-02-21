// ImageReduced.js
import React from 'react';
import { Image } from 'react-native';

const ImageReduced = ({ source, width, height }) => {
  return <Image source={source} style={{ width, height }} />;
};

export default ImageReduced;
