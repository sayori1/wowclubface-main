import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

export const H1 = ({ children }) => {
  return (
    <Text style={styles.h1}>{children}</Text>
  );
}

export const H2 = ({ children }) => {
  return (
    <Text style={styles.h2}>{children}</Text>
  );
}

export const H3 = ({ children }) => {
  return (
    <Text style={styles.h3}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#313541',
  },
  h2: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#313541',
  },
  h3: {
    marginTop: 16,
    color: '#828395',
    fontFamily: 'Inter-SemiBold'
  }
});