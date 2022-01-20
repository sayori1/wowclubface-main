import React from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native';
import Video from 'react-native-video';
// import Video from '../components/Video';
import * as Iconly from 'react-native-iconly';
import Icon from 'react-native-vector-icons/Fontisto';
import AboutExercise from './AboutExercise';

const { height } = Dimensions.get('window');
import {
  mapStateToProps,
  mapDispatchToProps
} from '../utils';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import FeatherIcon from 'react-native-vector-icons/Foundation';

const Course = ({ route, navigation, userDetails }) => {
  const exercise = route.params;

  const [paused, setPaused] = useState(false);

  const control = () => {
    const cache = !paused;

    setPaused(cache);

    return cache;
  };

  const [width, setWidth] = useState(0);
  const [duration, setDuration] = useState(0);

  const [isShow, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
    setPaused(true);
  }

  const closeModal = () => {
    setShow(false);
    setPaused(false);
  }

  const [isLoading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          visible={isShow}
        >
          <AboutExercise
            back={closeModal}
            exercise={exercise}
            index={1}
            max={1}
          />
        </Modal>

        {
          isLoading && (
            <Loading/>
          )
        }

        <Video
          source={{
            uri: `http://80.78.251.86:3000/video/${exercise.content}?token=${userDetails.token}`,
            type: 'mp4',
          }}
          paused={paused}
          resizeMode="cover"
          onEnd={() => navigation.navigate('Exercises')}
          onError={() => navigation.navigate('Exercises')}
          onProgress={(obj) => setWidth(obj.currentTime/duration*100+'%')}
          onLoadStart={() => { setWidth(0); setLoading(true) }}
          onLoad={(meta) => { setDuration(meta.duration); setLoading(false)}}
          style={isLoading?styles.videoLoading : styles.backgroundVideo }/>

        <View style={styles.progress}>
          <View style={styles.progressBars}>
            <View style={[styles.progressBar, { width: '90%'}]}>
              <Animated.View style={{...styles.progressBarContent, width}}/>
            </View>
          </View>
        </View>
  
        <View style={styles.content}>
          <View style={styles.buttonWrapper}>
            <View style={styles.exerciseData}>
              <TouchableOpacity onPress={() => openModal()} style={styles.info}>
                <Text style={styles.exerciseName}>
                  {exercise.name}
                </Text>
                <FeatherIcon
                  name="info"
                  color="#C1C1C1"
                  backgroundColor=""
                  size={24}
                  style={styles.infoIcon}
                />
              </TouchableOpacity>
              <Text style={styles.exerciseTip}>
                {exercise.tip}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.controllButtonWrapper}>
        <TouchableOpacity style={[styles.controlButton]} onPressIn={control}>
          <View pointerEvents="none">
            {
              paused?(
                <Iconly.ChevronRight set="bold" color="#FFF" size={42}/>
              ):(
                <Icon.Button
                  name="pause"
                  color="#FFF"
                  style={{ marginLeft: 9 }}
                  backgroundColor=""
                />
              )
            }
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);

const styles = StyleSheet.create({
  infoIcon: {
    marginLeft: 4,
  },
  videoLoading: {
    height: 0,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonTextBack: {
    fontFamily: 'Inter-Regular',
    color: '#88898D',
    textDecorationLine: 'underline',
    marginTop: 16,
    textAlign: 'center'
  },
  progressBarContentFilled: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FEC55E", width: '100%',
    borderRadius: 5,
  },
  progressBarContentActive: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FEC55E", width: '70%',
    borderRadius: 5,
  },
  progress: {
    position: 'absolute',
    alignItems: 'center',
    top: 16,
    left: 0,
    right: 0,
    bottom: 0,
  },
  progressText: {
    color: '#FFF',
    fontFamily: 'Inter-Bold'
  },
  progressBar: {
    height: 5,
    width: '10%',
    backgroundColor: '#F0F3FB',
    borderRadius: 5,
    marginRight: 4,
  },
  progressBars: {
    marginTop: 10,
    marginHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressBarContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#FEC55E",
    width: 0,
    borderRadius: 5,
  },
  controllButtonWrapper: {
    position: 'absolute',
    zIndex: 1,
    height: (height * (2 / 3)),
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controlButton: {
    backgroundColor: '#FEC55E',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  exerciseData: {
    flex: 1,
    justifyContent: 'center',
    color: '#2E2E36',
    alignItems: 'center'
  },
  exerciseName: {
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    fontSize: 16,
    color: '#2E2E36',
  },
  exerciseTip: {
    fontFamily: 'Inter-SemiBold',
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  backgroundVideo: {
    flex: 1,
  },
  subtitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#DED6FF',
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
    position: 'relative',
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
    flex: 1/2,
    padding: 16,
    paddingTop: 32,
    backgroundColor: '#FFF',
    zIndex: 1,
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

