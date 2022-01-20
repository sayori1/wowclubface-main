import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView
} from 'react-native';
import Button from '../components/Button';
import Loading from '../components/Loading';

export default ({ navigation }) => {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStatus(1);
    }, 3000);

    return () => { clearTimeout(timeout) };
  }, []);

  
  return (
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
        <Text style={styles.title}>
          {
            status === 1?(
              'Ваш план готов!'
            ): (
              'Создание вашего персонального плана…'
            )
          }
        </Text>
        {
          status === 1 && (
            <View style={styles.imageWrap}>
              <Image resizeMode="contain" source={require('../assets/done2.png')} style={styles.Image}/>
            </View>
          )
        }

        {
          status === 1? (
            <View>
              <Button
                onPress={() => navigation.navigate('HomePages')}
                text="Продолжить"
              />
            </View>
          ): (
            <Loading/>
          )
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end'
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
    width: 150,
  },
  safeZone: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  title: {
    marginTop: 32,
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


