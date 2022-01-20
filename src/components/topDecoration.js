import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export default () => {
  return (
    <View styles={styles.container}>
      <Image source={require('../assets/path561.png')} style={styles.decoration1} resizeMode="contain"/>
      <Image source={require('../assets/path569.png')} style={styles.decoration2} resizeMode="contain"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
  },

  decoration1: {
    position: 'absolute',
    width: 40,
    left: 20,
  },
  decoration2: {
    position: 'absolute',
    width: 20,
    right: 20,
    top: 20,
  },
});
