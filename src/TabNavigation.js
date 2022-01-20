import React from 'react';

import HomeScreen from './views/Home.js';
import ProfileScreen from './views/Profile.js';
import RegisterScreen from './views/Register';
import ExercisesScreen from './views/Exercises';

import * as Iconly from 'react-native-iconly';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import { connect } from 'react-redux';
import { mapStateToProps } from './utils/';

const HomePages = ({ userDetails }) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f3a817',
        inactiveTintColor: 'gray',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <Iconly.Home name={route.name} size={size} color={color} set={focused?'bold':'light'}/>;
          } else if (route.name === 'Exercises') {
            return <Iconly.Category name={route.name} size={size} color={color} set={focused?'bold':'light'}/>;
          } else if (route.name === 'Profile') {
            return <Iconly.User name={route.name} size={size} color={color} set={focused?'bold':'light'}/>;
          }

          // You can return any component that you like here!
          return <Iconly.Home name={route.name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Главная'}}/>
      <Tab.Screen name="Exercises" component={ExercisesScreen} options={{title: 'Упражнения'}}/>
      <Tab.Screen name="Profile" component={userDetails.email?ProfileScreen:RegisterScreen} options={{title: 'Профиль'}}/>
    </Tab.Navigator>
  );
}

export default connect(mapStateToProps, null)(HomePages);

