import React from 'react';
import {
  View,
  ActivityIndicator,
} from 'react-native';

export default ({ yellow }) => {
  console.log(yellow);
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: yellow?'#FEC55E':'#FFF'
    }}>
      <ActivityIndicator size="large" color={yellow?'#FFFFFF':'#f3a817'} />
    </View>
  );
}
