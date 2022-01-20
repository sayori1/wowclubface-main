import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

export default ({ navigation, image, title, exerciseCount, time, id, locked = false, user }) => {
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
      onPress={redirect}
      style={styles.popularCoursePreview}
    >
      <Image resizeMode="stretch" source={{ uri: image }} style={styles.popularCoursePreviewImage}/>

      {
        locked ? (
          <Text style={styles.popularCoursePreviewPremium}>ПРЕМИУМ</Text>
        ):null
      }

      <Text style={styles.popularCoursePreviewName}>
        { title }
      </Text>
      <Text style={styles.popularCoursePreviewDesc}>{exerciseCount} упражнений - {time} минут</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  popularCoursePreviewPremium: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    letterSpacing: 2,
    borderRadius: 8,
    top: 5,
    left: 10,
    color: '#FFF',
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  popularCoursePreviewDesc: {
    fontFamily: 'Inter-Regular',
    color: '#848388',
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 20
  },
  popularCoursePreviewName: {
    fontFamily: 'Inter-Bold',
    color: '#313541',
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 10
  },
  popularCoursePreview: {
    marginTop: 14,
    marginRight: 16,
    width: 270,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 7
  },
  popularCoursePreviewImage: {
    width: 270,
    height: 150,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
