import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import Input from '../components/input';
import Button from '../components/Button';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Feather';

import * as RNIap from 'react-native-iap';

const productIds = Platform.select({
  ios: [
    'com.example.coins100'
  ],
  android: [
    'com.example.coins100'
  ]
});

const Premium = async ({ navigation, userDetails }) => {
  const [products, setProducts] = useState([]);

  try {
    const products = await RNIap.getProducts(productIds);
    console.log(products);
    setProducts(products);
  } catch(err) {
    console.warn(err); // standardized err.code and err.message available
  }

  const [programs, setPrograms] = useState([
    {
      title: '500 ₽ / 1 неделя',
      description: 'Попробуйте на вкус наше приложение',
      id: 'start',
      isActive: false,
    },
    {
      title: '3,000 ₽ / 1 месяц',
      description: 'Увидите первый результат',
      discount: '20',
      id: 'asd',
      isActive: true,
    },
    {
      title: '6,000 ₽/ 3 месяца',
      description: 'Пройдите несколько курсов',
      discount: '30',
      id: 'stardsadt',
      isActive: false,
    }
  ]);

  const select = (id) => {
    return () => {
      const copy = programs.map((program) => ({
        ...program,
        isActive: program.id === id
      }));

      setPrograms(copy);
    }
  }

  return (
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
        <View style={styles.imageWrap}>
         <Image resizeMode="contain" source={require('../assets/premium.png')} style={styles.Image}/>
        </View>
        <Text style={styles.title}>Купить премиум</Text>
        <Text style={styles.header}>Бесплатная пробная версия включена</Text>

        <View style={styles.imageWrap}>
          {
            programs.map((program) => (
              <TouchableOpacity
                onPress={select(program.id)}
                style={!program.isActive?styles.pick:styles.pickActive}
                key={program.id}
              >
                {
                  program.discount && (
                    <View style={styles.fee}>
                      <Text style={styles.fee_text}>-{program.discount}%</Text>
                    </View>
                  )
                }
                <View style={!program.isActive?styles.isPick:styles.isPickActive}>
                  {
                    program.isActive && (
                      <Icon
                        name="check"
                        color="#FFF"
                        backgroundColor=""
                        size={16}
                      />
                    )
                  }
                </View>
                <View>
                  <Text style={styles.pickTitle}>{program.title}</Text>
                  <Text style={styles.pickDescription}>{program.description}</Text>
                </View>
              </TouchableOpacity>
            ))
          }
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            text="Продолжить"
            disabled={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Premium);

const styles = StyleSheet.create({
  fee: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: '#FF8F87',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  fee_text: {
    color: '#fff'
  },
  isPick: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#CBCBCB',
    marginRight: 16,
  },
  isPickActive: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: '#E0A2E8',
    marginRight: 16,
  },
  pickTitle: {
    fontFamily: 'Inter-Bold',
  },
  pickDescription: {
    fontFamily: 'Inter-Regular',
    color: '#CBCBCB',
    fontSize: 12,
    marginTop: 5,
  },
  error: {
    fontFamily: 'Inter-Bold',
    color: '#CC1E23',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
  pickActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    height: 70,
    marginTop: 10,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 20,
    width: '100%',
    borderWidth: 2,
    borderColor: '#E0A2E8'
  },
  pick: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    height: 70,
    marginTop: 10,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 16,
    width: '100%',
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
    alignItems: 'center',
    justifyContent: 'flex-start'
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
    marginTop: 5,
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

