import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { login } from '../api';
import Input from '../components/input';
import Button from '../components/Button';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import { connect } from 'react-redux';

const Login = ({ navigation, reduxSaveUser }) => {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
        <Text style={styles.title}>Войти в аккаунт</Text>

        <View style={styles.imageWrap}>
          <Input
            style={styles.input}
            value={email} title="Почта"
            updateMasterState={setEmail}/>
          <Input
            style={styles.input}
            value={password} title="Пароль"
            updateMasterState={setPassword}
            isPassword={true}/>
          <TouchableOpacity
            style={styles.recovery}
            onPress={() => navigation.navigate('Reset')}
          >
            <Text style={styles.recovery}>Забыли пароль?</Text>
          </TouchableOpacity>
          <Text style={styles.error}>
            {error}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button 
            text={'Войти'}
            disabled={isLoading || !password.length || !email.length}
            onPress={() => {
              setLoading(true);

              login({ email, password })
                .then((res) => {
                  setLoading(false);

                  if (res.code === 200) {
                    console.log({
                      ...res.body,
                      token: res.body.jwt
                    });
                    reduxSaveUser({
                      ...res.body,
                      token: res.body.jwt
                    });

                    return navigation.navigate('HomePages');
                  }

                  if (res.code === 403) {
                    return setError('Неверный логин или пароль');
                  }

                  return setError('Что-то пошло не так');
                })
                .catch((err) => {
                  setLoading(false);
                  navigation.navigate('Error');
                });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  error: {
    fontFamily: 'Inter-Bold',
    color: '#CC1E23',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    height: 60,
    marginTop: 25,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 3
  },
  flexContainer: {
    flex: 1,
  },
  background: {
    backgroundColor: '#FFF',
  },
  recovery: {
    width: '100%',
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#83828A',
    textAlign: 'right',
    marginTop: 5
  },
  imageWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  Image: {
    flex: 1,
    width: 150,
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
    fontSize: 20,
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
  selectWrapper: {
    width: '100%',
    borderRadius: 20,
    height: 55,
    borderColor: '#7F8386',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderWidth: 1
  },
  selectText: {
    color: '#7F8386',
    fontSize: 16,
  },
  selectActive: {
    borderColor: '#FEC55E',
    borderWidth: 1.5
  },
  selectActiveText: {
    color: '#FEC55E'
  },
  button: {
    width: '100%',
    borderRadius: 40,
    height: 55,
    backgroundColor: '#FEC55E', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    right: 0,
    top: 10
  },
  buttonText: {
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    fontSize: 16
  },
});

