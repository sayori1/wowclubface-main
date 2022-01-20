import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export default ({ onPress, text, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[disabled?styles.disabledButton:styles.button]}
    >
      <Text style={{
        ...styles.buttonText,
        color: '#FFFFFF'
      }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 40,
    height: 55,
    backgroundColor: '#f3a817',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    width: '100%',
    borderRadius: 40,
    height: 55,
    backgroundColor: '#FFD383', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter-Regular',
    color: '#FFF',
    fontSize: 16
  },
});
