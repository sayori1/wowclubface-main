import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import * as Iconly from 'react-native-iconly';

export default ({ navigation, title, exercisesCount, time, locked, id, user }) => {
  const redirect = () => {
    if (!user.email && locked) {
      return navigation.navigate('Profile');
    }

    if (locked) {
      return navigation.navigate('Premium');
    }

    return navigation.navigate('AboutCourse', { id });
  }

  return (
    <TouchableOpacity
      style={styles.coursePreview}
      onPress={redirect}
    >
      <Image source={require('../assets/lol.png')} style={styles.decoration1} resizeMode="stretch"/>
      <Image source={require('../assets/lol2.png')} style={styles.decoration2} resizeMode="stretch"/>
      <Image source={require('../assets/lol3.png')} style={styles.decoration3} resizeMode="stretch"/>
      {/* <Image source={require('../assets/lol4.png')} style={styles.decoration4} resizeMode="stretch"/> */}

      {
        locked?(
          <Iconly.Lock size={24} set="bold" color="#FFF" style={styles.lock}/>
        ):null
      }

      <Text style={styles.coursePreviewName}>
        { title }
      </Text>
      <Text style={styles.coursePreviewDesc}>{exercisesCount} упражнений - {time} минут</Text>

      <View style={styles.startCourseButtonWrapper}>
        <View style={styles.startCourseButton}>
          <Iconly.ChevronRightCircle size={42} set="bold" color="#FFF"/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lock: {
    position: 'absolute',
    left: 8,
    top: 20,
  },
  coursePreview: {
    marginTop: 14,
    marginRight: 16,
    width: 150,
    backgroundColor: '#FF9893',
    paddingTop: 50,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  coursePreviewName: {
    fontFamily: 'Inter-Bold',
    color: '#FFF',
    fontSize: 20,
  },
  coursePreviewDesc: {
    fontFamily: 'Inter-Regular',
    color: '#FFDBCE',
    marginTop: 10,
  },
  startCourseButtonWrapper: {
    flex: 1,
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  startCourseButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    // backgroundColor: '#FBF5F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  decoration1: {
    position: 'absolute',
    top: 20,
    right: 0,
    height: 120,
    width: 70,
  },
  decoration2: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    height: 120,
    width: 70,
  },
  decoration3: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 60,
    width: 70,
  },
  decoration4: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderRadius: 16,
    height: 60,
    width: 70,
    borderRadius: 20,
  },
});
