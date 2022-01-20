import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Input from '../components/input';
const { height } = Dimensions.get('window');
import Button from '../components/Button';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import { connect } from 'react-redux';
import { updateProfile } from '../api';

const Register = ({ navigation, userDetails, reduxSaveUser }) => {
  const [name, setName] = useState(userDetails.name);
  const [nameError, setNameError] = useState('');

  const validateName = (text) => {
    if (!text.length) {
      setNameError('Это поле не может быть пустым');
    } else {
      updateProfile(userDetails.token, {
        name: text,
      })
        .then(() => {
          reduxSaveUser({ ...userDetails, name: text });
        })
        .catch((err) => {
          console.log(err);
          navigation.navigate('Error');
        });

      setNameError('');
    }

    setName(text);
  }

  const [email, setEmail] = useState(userDetails.email);
  const [emailError, setEmailError] = useState('');

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

  const [password, setPassword] = useState(userDetails.password);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (text) => {
    if (!text.length) {
      setPasswordError('Это поле не может быть пустым');
    } else if (text.length < 6) {
      setPasswordError('Пожалуйста, используйте как минимум 6 символов');
    } else {
      setPasswordError('');
    }

    setPassword(text);
  }

  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={{...styles.background, height}}
    >
      <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
        <Text style={styles.title}>Профиль</Text>

        <View style={styles.imageWrap}>
          <Input
            style={styles.input}
            value={name} title="Имя"
            maxLength={12}
            updateMasterState={validateName}
            error={nameError}/>
          <Input
            style={styles.input}
            value={email} title="Почта"
            editable={false}
            updateMasterState={validateEmail}
            error={emailError}/>
          <Input
            style={styles.input}
            value={password} title="Пароль"
            editable={false}
            updateMasterState={validatePassword}
            isPassword={true}
            error={passwordError}/>
          <TouchableOpacity
            style={styles.recovery}
            onPress={() => navigation.navigate('Reset')}
          >
            <Text style={styles.recovery}>Изменить пароль</Text>
          </TouchableOpacity>
          <Text style={styles.error}>
            {error}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            text = {'Выйти'}
            onPress={() => {
              reduxSaveUser({ name: '', token: '' });

              // navigation.navigate('Welcome')
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
  error: {
    fontFamily: 'Inter-Bold',
    color: '#CC1E23',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  login: {
    textDecorationLine: 'underline',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    color: '#88898D'
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
    fontFamily: 'Inter-Regular',
    color: '#83828A',
    textAlign: 'right',
    marginTop: 5
  },
  imageWrap: {
    flex: 1,
    marginTop: 24,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  Image: {
    flex: 1,
    width: 150,
  },
  safeZone: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#313541',
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
    justifyContent: 'flex-end',
    bottom: 70,
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

