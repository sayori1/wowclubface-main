import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import { connect } from 'react-redux';

const Email = ({ navigation, userDetails }) => {
  return (
    <SafeAreaView
      style={{...emailStyles.background, ...styles.flexContainer}}
    >
      <View style={{ ...emailStyles.safeZone, ...styles.flexContainer}}>
        <Text style={emailStyles.title}>Сбросить пароль</Text>
        <Text style={emailStyles.header}>Ссылка для сброса пароля была отправлена на вашу почту</Text>

        <View style={emailStyles.imageWrap}>
         <Image resizeMode="contain" source={require('../assets/email.png')} style={emailStyles.Image}/>
        </View>

        <View style={emailStyles.buttonWrapper}>
          <TouchableOpacity
          onPress={() => navigation.navigate(userDetails.email?'Home':'LoginScreen')}
            style={{
              ...emailStyles.button,
            }}
          >
            <Text style={{
              ...emailStyles.buttonText,
              color: '#FFFFFF'
            }}>{userDetails.email?'Главная':'Вход'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Email);

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  }
});

const emailStyles = StyleSheet.create({
  buttonText: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: 16
  },
  background: {
    backgroundColor: '#FFF',
  },
  login: {
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Image: {
    flex: 1,
    width: 200,
  },
  safeZone: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 23,
    color: '#2E303F',
  },
  header: {
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    color: '#2E303F',
    fontSize: 16,
    marginTop: 16,
    marginBottom: 12
  },
  description: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: 15
  },
  buttonWrapper: {
    justifyContent: 'flex-end'
  },
  button: {
    width: '100%',
    borderRadius: 40,
    height: 55,
    backgroundColor: '#FEC55E', 
    alignItems: 'center',
    justifyContent: 'center'
  },
  backgroundImage: {
    position: 'absolute',
    right: 0,
    top: 10
  },
});


