import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity
} from 'react-native';

import TopDecoration from '../components/topDecoration';
import { H1, H2 } from '../components/Headers';
import CoursePreview from '../components/CoursePreview';
import ProgressBar from '../components/ProgressBar';
import ProgramCoursePreview from '../components/ProgramCoursePreview';
import ProgramCoursePreviewSecondly from '../components/ProgramCoursePreviewSecondly';
import ProgramCoursePreviewCompleted from '../components/ProgramCoursePreviewCompleted';

import {
  getGreeting,
  getIcon,

  mapStateToProps,
  mapDispatchToProps
} from '../utils';

import { connect } from 'react-redux';
import Loading from '../components/Loading';
import { getCourses, getMyCourses } from '../api';

import { useIsFocused } from '@react-navigation/native';
import { isPremiumContent, isUserPremium } from '../utils/premium';
import * as Iconly from 'react-native-iconly';
import Feather from 'react-native-vector-icons/Feather';

const Home = ({ navigation, userDetails, reduxSaveUser }) => {
  const isFocused = useIsFocused();
 
  useEffect(() => {
    getCourses(userDetails.token)
      .then(async (res) => {
        let resMyCourses = await getMyCourses(userDetails.token);
        resMyCourses = resMyCourses.filter((course) => course.name)

        resMyCourses = resMyCourses.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

        resMyCourses = resMyCourses.slice(0, 3);

        setMyCourses(resMyCourses);
        setCurrent(completedCourses(resMyCourses).length);
        setLoadingStatus(false);

        setCourses(res.filter((course) => !resMyCourses.find((curse) => curse.name === course.name)));
      })
      .catch((err) => {
        console.log(err);
        navigation.navigate('Error');
      });
  }, [isFocused]);

  const greeting = getGreeting();
  const icon = getIcon();

  const [isLoading, setLoadingStatus] = useState(true);
  const [courses, setCourses] = useState([]);
  const [myCourses, setMyCourses] = useState([]);
  const [current, setCurrent] = useState(0);

  const completedCourses = (courses) => {
    return courses.filter((course) => {
      console.log(new Date(course.updatedAt), new Date())
      return (course.day > 0) && ((+new Date(course.updatedAt) + (12 * 60 * 100000)) > +new Date());
    });
  }

  const incompletedCourses = (courses) => {
    return courses.filter((course) => {
      return !((course.day > 0) && ((+new Date(course.updatedAt) + (12 * 60 * 100000)) > +new Date()));
    });
  }

  return isLoading?(
    <Loading/>
  ):(
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <ScrollView>
        {/* <TopDecoration/> */}

        <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
          <View style={styles.headerCrown}>
            <Feather
              name={icon}
              color="#000"
              backgroundColor=""
              size={24}
              style={{marginRight: 10}}
            />
            <H1>{greeting}, {userDetails.name}!</H1>
          </View>

          <View style={styles.progress}>
            <View>
              <H2>План на сегодня</H2>
            </View>
            {
              myCourses.length !== 0?(
                <ProgressBar
                  current = {current}
                  max = {myCourses.length}
                  progress = {current / myCourses.length * 100}
                />
              ):null
            }
          </View>

          {
            myCourses.length === 0? (
              <View>
                <Text style={styles.desc}>У Вас нет активных курсов, начните хотя бы один чтобы отслеживать прогресс</Text>
              </View>
            ):null
          }

          {
            incompletedCourses(myCourses)[0] && (
              <ProgramCoursePreview
                key = {incompletedCourses(myCourses)[0]._id}
                onPress = {() => navigation.navigate('AboutCourse', { id: incompletedCourses(myCourses)[0]._id })}
                title = {incompletedCourses(myCourses)[0].category}
                day = {incompletedCourses(myCourses)[0].day + 1}
                exerciseName = {incompletedCourses(myCourses)[0].name}
              />
            )
          }

          {
            incompletedCourses(myCourses).slice(1).map((course) => (
              <ProgramCoursePreviewSecondly
                key = {course._id}
                onPress = {() => navigation.navigate('AboutCourse', { id: course._id })}
                title = {course.name}
                day = {course.day + 1}
                exerciseName = {course.category}
              />
            ))
          }

          {
            completedCourses(myCourses).slice(0).map((course) => (
              <ProgramCoursePreviewCompleted
                key = {course._id}
                onPress = {() => navigation.navigate('AboutCourse', { id: course._id })}
                title = {course.name}
                day = {course.day + 1}
                exerciseName = {course.category}
              />
            ))
          }

          <View>
            <H2>Другие курсы</H2>
          </View>
        </View>
        {
          courses.length === 0? (
            <View>
              <Text style={styles.desc}>Здесь будут отображаться доступные курсы</Text>
            </View>
          ):null
        }
        <ScrollView horizontal={true} style={{marginLeft: 16}}>
          {
            courses.map((course) => {
              return (
                <CoursePreview
                  key = {course._id}
                  title = {course.name}
                  user = {userDetails}
                  id = {course._id}
                  locked = {isPremiumContent(course.isPremium, userDetails)}
                  exercisesCount = {course.exercises.length}
                  time = {course.spentTime}
                  navigation = {navigation}
                />
              )
            })
          }
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  desc: {
    paddingTop: 32,
    paddingBottom: 24,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    color: '#A5A5A5'
  },
  progress: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  flexContainer: {
    flex: 1,
  },
  background: {
    backgroundColor: '#FFF',
  },
  safeZone: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  headerCrown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
