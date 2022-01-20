import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';

export default ({ back, exercise, index, max }) => {
  return (
    <SafeAreaView
      style={{...styles.background, ...styles.flexContainer}}
    >
      <StatusBar backgroundColor="#FEC55E" barStyle='light-content'/>
      <View style={{ ...styles.safeZone, ...styles.flexContainer}}>
        <View style={styles.header}>
          <View style={styles.circleButton}>
            <HeaderBackButton
              tintColor={'#fff'}
              onPress={back}
            />
          </View>
        </View>

        <Text style={styles.subtitle}>{exercise.category.toUpperCase()}</Text>
        <Text style={styles.title}>{exercise.name}</Text>
        <Text style={styles.subtitle}>Упражнение {index} из {max}</Text>

        <ScrollView style={styles.content}>
          <Text style={styles.contentHeader}>Шаги</Text>
          {
            exercise.steps.map((step, index) => (
              <View style={styles.contentWrapper} key={index}>
                <View style={styles.circle}/>
                <Text style={styles.contentText}>{index+1}. {step}</Text>
              </View>
            ))
          }
          <Text style={styles.contentHeader}>Полезности</Text>
          {
            exercise.benefits.map((step, index) => (
              <View style={styles.contentWrapper} key={index}>
                <View style={styles.circle}/>
                <Text style={styles.contentText}>- {step}</Text>
              </View>
            ))
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    height: 50,
    marginBottom: 10,
  },
  contentWrapper: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  circle: {
    marginRight: 10,
    height: 20,
    width: 20,
    borderRadius: 25,
    backgroundColor: '#E5EBFC'
  },
  subtitle: {
    fontFamily: 'Inter-SemiBold',
    color: '#F0F0F0',
    marginLeft: 16,
    fontSize: 14,
  },
  contentHeader: {
    marginTop: 16,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#6A6D74',
  },
  contentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A5A5A5',
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

