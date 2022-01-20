import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import Button from '../components/Button';

export default ({ navigation }) => {
  return (
    <SafeAreaView
      style={{...loginStyles.background, ...styles.flexContainer}}
    >
      <View style={{ ...loginStyles.safeZone, ...styles.flexContainer}}>
        <Text style={loginStyles.title}>Добро пожаловать!</Text>
        <Text style={loginStyles.header}>Ваш ежедневный тренер по красоте лица </Text>

        <View style={loginStyles.imageWrap}>
         <Image resizeMode="contain" source={require('../assets/wel.png')} style={loginStyles.Image}/>
        </View>

        <View style={loginStyles.buttonWrapper}>
          <Button
            onPress={() => navigation.navigate('AgeRange')}
            text="Начать"
          />
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={loginStyles.login}>Войти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  }
});

const loginStyles = StyleSheet.create({
  background: {
    backgroundColor: '#FFF',
  },
  login: {
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
    marginTop: 24
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Image: {
    flex: 1,
    width: 350,
  },
  safeZone: {
    marginTop: 50,
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
  buttonText: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: 16
  },
  form: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    paddingHorizontal: 8,
    paddingVertical: 11,
    color: '#FFFFFF',
    fontSize: 15,
    width: '90%',
  },
  closeButton: {
    marginRight: 250
  },
  inputParent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderBottomWidth: 1,
  },
  backgroundImage: {
    position: 'absolute',
    right: 0,
    top: 10
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#F86A6F',
    fontSize: 15,
    marginTop: 16
  },
});


