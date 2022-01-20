import React, { useState } from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  ScrollView
} from 'react-native';
import * as Iconly from 'react-native-iconly';
import { H1, H2, H3 } from '../components/Headers';
import CoursePreview from '../components/CoursePreview';
import PopularCoursePreview from '../components/PopularCoursePreview';
import ExercisePreview from '../components/ExercisePreview';
import {
  getCourses,
  getExercises,
  getExerciseCategories,
} from '../api';

import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

import { isPremiumContent } from '../utils/premium';

const Exercises = ({ navigation, userDetails }) => {
  const [isLoading, setLoadingStatus] = useState(true);
  const [courses, setCourses] = useState(null);
  const [exercises, setExercises] = useState(null);
  const [exerciseCategories, setExerciseCategories] = useState(null);

  if (!courses) {
    getCourses(userDetails.token)
      .then(async (res) => {
        setCourses(res);

        const exerciseCategories = await getExerciseCategories(userDetails.token);

        setExerciseCategories(exerciseCategories);

        const exercises = await getExercises(userDetails.token);

        setExercises(exercises);
        setLoadingStatus(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingStatus(false);
        navigation.navigate('Error');
      });
  }

  return isLoading?(
    <Loading/>
  ):(
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <ScrollView>
        <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
          <H1>Упражнения для лица</H1>

          <View style={styles.safeHorizontal}>
            <H2>Популярные курсы</H2>
          </View>

          <ScrollView horizontal={true} contentContainerStyle={{paddingLeft: 16, paddingBottom: 12}}>
            {
              courses.map((course) => {
                if (course.category === 'Популярные курсы') {
                  return (
                    <PopularCoursePreview
                      user={userDetails}
                      locked = {isPremiumContent(course.isPremium, userDetails)}
                      image = {`http://80.78.251.86:3000/preview/${course.content}`}
                      key = {course._id}
                      id = {course._id}
                      title = {course.name}
                      exerciseCount = {course.exercises.length}
                      time = {course.spentTime}
                      navigation = {navigation}
                    />
                  )
                }
              })
            }
          </ScrollView>

          <View style={styles.safeHorizontal}>
            <H2>Все курсы</H2>
          </View>

          <ScrollView horizontal={true} style={{marginLeft: 16}}>
            {
              courses.map((course) => {
                return (
                  <CoursePreview
                    locked = {isPremiumContent(course.isPremium, userDetails)}
                    user = {userDetails}
                    key = {course._id}
                    id = {course._id}
                    title = {course.name}
                    exercisesCount = {course.exercises.length}
                    time = {course.spentTime}
                    navigation = {navigation}
                  />
                )
              })
            }
          </ScrollView>
          
          <View style={styles.safeHorizontal}>
            <H2>Все упражнения</H2>

            {
              exerciseCategories.map((category) => {
                const categoryExercises = exercises.filter((exercise) => exercise.category === category.name);

                if (!categoryExercises.length) {
                  return null;
                }


                return (
                  <View key={category._id}>
                    <H3>{category.name.toUpperCase()}</H3>

                    {
                      categoryExercises.map((exercise) => {
                        return (
                          <ExercisePreview
                            user={userDetails}
                            locked = {isPremiumContent(exercise.isPremium, userDetails)}
                            exercise = {exercise}
                            key = {exercise._id}
                            navigation = {navigation}
                            title = {exercise.name}
                            image = {`http://80.78.251.86/preview/${exercise.content}`}
                            description = {exercise.benefits[0]}
                          />
                        )
                      })
                    }

                  </View>
                );
              })
            }
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);

const styles = StyleSheet.create({
  safeZone: {
    marginTop: 24,
  },
  safeHorizontal: {
    marginHorizontal: 16,
  },
  flexContainer: {
    flex: 1,
  },
  background: {
    backgroundColor: '#FFF',
  },
});
