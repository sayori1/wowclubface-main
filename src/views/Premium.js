import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView
} from 'react-native';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import Button from '../components/Button';

import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Feather';

import * as RNIap from 'react-native-iap';

const productIds = Platform.select({
  ios: [
    'com.wowclub.facefitness.trialsilver',
    'com.wowclub.facefitness.gold',
  ],
  android: [
    'com.wowclub.facefitness.bronze',
    'com.wowclub.facefitness.gold',
  ]
});

const Premium = ({ navigation, userDetails }) => {
  const [programs, setPrograms] = useState([
    {
      title: '849 ₽ / 1 неделя',
      description: '3 дня пробного периода, еженедельная оплата',
      id: 'com.wowclub.facefitness.bronze',
      isActive: true,
    },
    {
      title: '2,490 ₽ / 3 месяца',
      description: 'Экономия в несколько раз!',
      discount: '75',
      id: 'com.wowclub.facefitness.gold',
      isActive: false,
    },
    {
      title: '849 ₽ / 1 неделя',
      description: '3 дня пробного периода, еженедельная оплата',
      id: 'com.wowclub.facefitness.trialsilver',
      isActive: true,
    },
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

  const selectedId = (programs) => {
    return programs.find((program) => program.isActive).id;
  }

  const requestPurchase = async (sku) => {
    console.log(sku);
    try {
      const products = await RNIap.getSubscriptions(productIds);
      await RNIap.requestSubscription(sku, false);
      navigation.navigate('Home');
      // navigation.navigate('Home');

    } catch (err) {
      console.log(err.code, err.message);
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
        <Text style={styles.header}>Откройте доступ к большему количеству курсов для естественного омоложения</Text>

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
            onPress={() => requestPurchase(selectedId(programs))}
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
    backgroundColor: '#FEC55E',
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
    backgroundColor: '#FEC55E',
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
    borderColor: '#FEC55E'
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
    width: '100%',
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

