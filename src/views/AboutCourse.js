import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import * as Iconly from 'react-native-iconly';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { getCourse } from '../api';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

import { isPremiumContent } from '../utils/premium';

const AboutCourse = ({ route, navigation, userDetails }) => {
  const { id } = route.params;

  const [course, setCourse] = useState(null);
  const [isLoading, setLoading] = useState(true);

  if (!course) {
    console.log('id, token ', id, userDetails.token);

    getCourse(id, userDetails.token)
      .then((res) => {
        if (!res || res.error) {
          return navigation.goBack();
        }

        setCourse(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate('Home');
      });
  }

  const redirect = () => {
    if (isPremiumContent(course.isPremium, userDetails)) {
      return navigation.navigate('Premium');
    }

    return navigation.navigate('Course', course);
  }

  return (
    isLoading?(
      <SafeAreaView style={{flex:1}}>
        <StatusBar backgroundColor="#FEC55E" barStyle='light-content'/>

        <Loading yellow={true}/>
      </SafeAreaView>
    ):(
      <SafeAreaView
        style={{...styles.background, ...styles.flexContainer}}
      >
        <StatusBar backgroundColor="#FEC55E" barStyle='light-content'/>
        <View style={{ ...styles.safeZone, ...styles.flexContainer}}>

          <Text style={styles.subtitle}>{course.category.toUpperCase()}</Text>
          <Text style={styles.title}>{course.name}</Text>
          <Text style={styles.subtitle}>{course.exercises.length} упражнений ꞏ {course.spentTime} минут </Text>

          <View style={styles.content}>
            <Text style={styles.contentHeader}>О Курсе</Text>
            <Text style={styles.contentText}>{course.description}</Text>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                onPress={redirect}
                style={{
                  ...styles.button,
                }}
              >
                {
                  isPremiumContent(course.isPremium, userDetails)?(
                    <Icon
                      name="crown"
                      color="#FFF"
                      backgroundColor=""
                      size={16}
                      style={{marginRight: 10}}
                    />
                  ):(
                    <Iconly.Play size={20} set="bold" style={{marginRight: 5}} color="#FFF"/>
                  )
                }
                <Text style={{
                  ...styles.buttonText,
                  color: '#FFFFFF'
                }}>{isPremiumContent(course.isPremium, userDetails)?'Купить подписку':'Начать'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutCourse);

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#F0F0F0',
    marginLeft: 16,
    fontSize: 14,
  },
  contentHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#6A6D74',
  },
  contentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A5A5A5',
    marginTop: 16
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
    backgroundColor: '#FEC55E',
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
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 32,
  },
  Image: {
    flex: 1,
    width: 150,
  },
  title: {
    textAlign: 'left',
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    marginLeft: 16,
    marginVertical: 8,
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
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 32,
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
    flexDirection: 'row',
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

