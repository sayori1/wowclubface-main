import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';

import { courseEnd } from '../api';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import { connect } from 'react-redux';
import Loading from '../components/Loading';

const Done = ({ navigation, route, userDetails, reduxSaveUser }) => {
  const [day, setDay] = useState(null);
  const { courseName, id } = route.params;

  if (!day) {
    courseEnd(userDetails.token, id)
      .then((res) => {
        console.log('Done log', res);
        return setDay(res.body);
      })
      .catch((err) => {
        console.log('Done error', err);
        navigation.navigate('Error');
      });
  }

  return day === null ? (
    <Loading/>
  ):(
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
        <View style={styles.imageWrap}>
         <Image resizeMode="contain" source={require('../assets/done.png')} style={styles.Image}/>
         <Text style={styles.title}>Отличная работа!</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.cardWrapper}>
            <View style={styles.fakeCard}>
              <View style={styles.fakeImage}></View>
              <View style={styles.fakeWrapper}>
                <View style={styles.fakeTitle}></View>
                <View style={styles.fakeSubTitle}></View>
              </View>
            </View>
            <View style={styles.card}>
              <Image resizeMode="contain" source={require('../assets/done2.png')} style={styles.cardImage}/>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>День {day}</Text>
                <Text style={styles.cardSubTitle}>{courseName}</Text>
              </View>
            </View>
            <View style={styles.fakeCard}>
              <View style={styles.fakeImage}></View>
              <View style={styles.fakeWrapper}>
                <View style={styles.fakeTitle}></View>
                <View style={styles.fakeSubTitle}></View>
              </View>
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{
                ...styles.button,
              }}
            >
              <Text style={{
                ...styles.buttonText,
                color: '#FFFFFF'
              }}>Продолжить</Text>
            </TouchableOpacity>
          </View>
        </View>

          
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Done);

const styles = StyleSheet.create({
  fakeTitle: {
    width: 70,
    height: 16,
    backgroundColor: '#E7EAF1',
    borderRadius: 16,
  },
  fakeSubTitle: {
    width: 140,
    height: 14,
    backgroundColor: '#E7EAF1',
    borderRadius: 16,
    marginTop: 10
  },
  fakeImage: {
    backgroundColor: '#EAEDF4',
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 10,
  },
  fakeCard: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBFBFD',
    borderRadius: 16,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  cardTitle: {
    color: '#313237',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  cardSubTitle: {
    color: '#87888A',
    fontFamily: 'Inter-Regular',
    fontSize: 14
  },
  cardImage: {
    height: 30,
    width: 30,
    margin: 15
  },
  card: {
    marginVertical: 10,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    backgroundColor: '#FFF',
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,

    elevation: 3
  },
  content: {
    flex: 1/1.3,
    paddingHorizontal: 16,
    paddingBottom: 24,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  flexContainer: {
    flex: 1,
  },
  buttonText: {
    fontFamily: 'Inter-Regular'
  },
  background: {
    backgroundColor: '#FEC55E',
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
    width: 150,
    height: 150,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 23,
    marginTop: 24,
    color: '#FFF',
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


