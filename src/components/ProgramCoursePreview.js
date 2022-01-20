import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as Iconly from 'react-native-iconly';

export default ({ onPress, title, exerciseName, day }) => {
  return (
    <View style={styles.course}>
      <Image source={require('../assets/path347.png')} style={styles.decoration1} resizeMode="stretch"/>
      <Image source={require('../assets/path3470.png')} style={styles.decoration2} resizeMode="stretch"/>
      <Image source={require('../assets/path3471.png')} style={styles.decoration3} resizeMode="stretch"/>

      <View style={styles.courseTitle}>
        <View style={styles.circle}/>
        <Text style={styles.courseName}>{ title }</Text>
      </View>
      
      <View style={styles.courseContent}>
        <Text style={styles.courseDay}>ТРЕНИРОВОЧНЫЙ ДЕНЬ { day }</Text>
        <Text style={styles.exerciseName}>{ exerciseName }</Text>

        <TouchableOpacity style={styles.courseButton} onPress={onPress}>
          <Iconly.ChevronRight size={24} set="bold" style={{marginRight: 5}} color="#FEC55E"/>
          <Text style={styles.courseButtonText}>Начать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  courseTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    marginRight: 10,
    borderColor: '#F0F0F0',
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 25,
  },
  courseDay: {
    fontFamily: 'Inter-Bold',
    color: '#F0F0F0',
    fontSize: 12
  },
  exerciseName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#FFF',
    marginVertical: 10
  },
  courseButton: {
    borderRadius: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingLeft: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  courseButtonText: {
    fontFamily: 'Inter-Bold',
    color: '#FEC55E'
  },
  courseContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  course: {
    width: '100%',
    backgroundColor: '#FEC55E',
    borderRadius: 14,
    marginTop: 24,
    padding: 20,
  },
  courseName: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
    fontSize: 16,
  },
  decoration1: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 60,
    width: 70,
  },
  decoration2: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
    width: 150,
  },
  decoration3: {
    position: 'absolute',
    top: 50,
    right: 100,
    height: 120,
    width: 120
  },
});
