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

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import Input from '../components/input';
import Button from '../components/Button';

import { connect } from 'react-redux';

import { restorePassword } from '../api';

const Reset = ({ navigation, userDetails }) => {
  const [email, setEmail] = useState(userDetails.email || '');
  const [emailError, setEmailError] = useState('');

  const [error, setError] = useState('');

  const validateEmail = (text) => {
    const regexp = /^\S+@\S+\.\w+$/;

    if (!text.length) {
      setEmailError('Это поле не может быть пустым');
    } else if (!text.match(regexp)) {
      setEmailError('Эта почта не выглядит валидной. Пожалуйста, проверьте еще раз');
    } else {
      setEmailError('');
    }

    setEmail(text);
  }

  return (
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
        <Text style={styles.title}>Сбросить пароль</Text>
        <Text style={styles.header}>Мы отправим вам ссылку на почту для сброса пароля</Text>

        <View style={styles.imageWrap}>
          <Input
              style={styles.input}
              value={email} title="Почта"
              updateMasterState={(value) => { validateEmail(value); setError('')}}
              error={emailError}/>
          <Text style={styles.error}>{error}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            text="Отправить письмо"
            onPress={() => {
              restorePassword(email)
                .then((res) => {
                  if (res.code === 200) {
                    return navigation.navigate('Email')
                  }

                  if (res.code === 404) {
                    return setError('Аккаунт с данным e-mail не найден')
                  }

                  return setError('Что-то пошло не так')
                })
                .catch((err) => {
                  console.log(err);
                  navigation.navigate('Error');
                })
            }}
            disabled={emailError.length || !email.length}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);

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
    marginTop: 24
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

