import React, {
  useEffect, useRef, useState
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Text,
} from 'react-native';

export default ({ current, max, progress }) => {
  const animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [progress]);

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  return (
    <View style={styles.progressBarWrapper}>
      <Text style={styles.progressBarText}>{current}/{max}</Text>
      <View style={styles.progressBar}>
        <Animated.View style={{...styles.absoluteFill, width}}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  progressBar: {
    height: 7,
    marginLeft: 15,
    minWidth: '50%',
    backgroundColor: '#F0F3FB',
    borderColor: '#000',
    borderRadius: 5,
  },
  progressBarText: {
    textAlign: 'right',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FEC55E",
    borderRadius: 5,
  },
});
