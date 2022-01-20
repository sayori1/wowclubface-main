import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as Iconly from 'react-native-iconly';
import Icon from 'react-native-vector-icons/Feather';

export default ({ onPress, title, exerciseName, day }) => {
  return (
    <TouchableOpacity
      onPress = {onPress}
      style={styles.pick}
    >
      <View style={styles.isPickActive}>
        <Icon
          name="check"
          color="#FFF"
          backgroundColor=""
          size={16}
        />
      </View>
      <View>
        <Text style={styles.pickTitle}>{title}</Text>
        <Text style={styles.pickDescription}>{exerciseName}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  isPickActive: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 22,
    height: 22,
    borderRadius: 100,
    backgroundColor: '#FEC55E',
    marginRight: 16,
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
  pickTitle: {
    fontFamily: 'Inter-Bold',
    textDecorationLine: 'line-through',
    fontSize: 16,
  },
  pickDescription: {
    fontFamily: 'Inter-Regular',
    color: '#868688',
    fontSize: 14,
    marginTop: 5,
  },
  courseTitle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    marginRight: 10,
    borderColor: '#C2BBFF',
    borderWidth: 1,
    width: 20,
    height: 20,
    borderRadius: 25,
  },
  courseDay: {
    fontFamily: 'Inter-Bold',
    color: '#C0B9FF',
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
    color: '#867DF2'
  },
  courseContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  course: {
    width: '100%',
    backgroundColor: '#867DF2',
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
