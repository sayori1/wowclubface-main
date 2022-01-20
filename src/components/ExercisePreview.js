import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import * as Iconly from 'react-native-iconly';

export default ({ navigation, title, description, image, locked, exercise, user}) => {
  const redirect = () => {
    if (!user.email && locked) {
      return navigation.navigate('Profile');
    }

    if (locked) {
      return navigation.navigate('Premium');
    }

    return navigation.navigate('Exercise', exercise);
  }

  return (
    <TouchableOpacity 
      onPress={redirect}
      style={styles.exercise}
    >
      <Image source={{ uri: image }} style={styles.exerciseImage}/>
      <View style={styles.exerciseContent}>
        <View style={styles.exerciseName}>
          {
            locked?(
              <Iconly.Lock size={16} set="bold" color="#000" style={styles.lock}/>
            ):null
          }
          <Text style={styles.exerciseHeader}>{title}</Text>
        </View>
        <Text style={styles.exerciseDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lock: {
    marginRight: 4,
  },
  exerciseName: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%'
  },
  exercise: {
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 2
  },
  exerciseDescription: {
    color: '#828395',
    fontFamily: 'Inter-Regular',
    maxWidth: '100%'
  },
  exerciseHeader: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#313541',
  },
  exerciseContent: {
    marginLeft: 16,
    maxWidth: '85%',
    paddingRight: 16,
  },
  exerciseImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
