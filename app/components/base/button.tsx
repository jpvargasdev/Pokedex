import React from 'react';
import {TouchableOpacity, Text, ViewStyle, TextStyle} from 'react-native';

export type ButtonProps = {
  buttonStyle: ViewStyle;
  textStyle: TextStyle;
  title: string;
  onPress: () => void;
};

export const Button = ({title, buttonStyle, textStyle, onPress}: ButtonProps) => (
  <TouchableOpacity style={buttonStyle} onPress={onPress}>
    <Text style={textStyle}>{title}</Text>
  </TouchableOpacity>
); 
