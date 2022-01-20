import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';

import { StatusBar, Alert } from 'react-native';
import Welcome from './views/Welcome.js';
import Email from './views/Email.js';
import Done from './views/Done.js';
import ErrorScreen from './views/Error.js';
import AgeRange from './views/AgeRange.js';
import LoginScreen from './views/Login.js';
import GeneratingScreen from './views/Generating.js';
import Reset from './views/Reset.js';

import AboutCourse from './views/AboutCourse';
import AboutExercise from './views/AboutExercise';
import Course from './views/Course';
import Exercise from './views/Exercise';
import PremiumScreen from './views/Premium';

import HomePages from './TabNavigation';

import { mapStateToProps, mapDispatchToProps } from './utils/';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const headerStyles = {
  title: '',
  headerBackTitleVisible: false,
  headerStyle: {
    shadowColor: 'transparent'
  }
}

import Loading from './components/Loading.js';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';

import { userPurchase } from './api';

const Navigation = ({ userDetails, reduxSaveUser }) => {
  const [isLoading, setLoading] = useState(true);

  const token = userDetails.token;

  useEffect(async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('@app'));

      if (user && user.token.length) {
        console.log('user', user);
        reduxSaveUser(user);
      }
    } catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  let purchaseUpdateSubscription, purchaseErrorSubscription;

  useEffect(() => {
    RNIap.initConnection()
      .then(() => {
        RNIap.flushFailedPurchasesCachedAsPendingAndroid()
          .catch((err) => {
            console.log(err);
          })
          .then(() => {
            purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
              const receipt = purchase.transactionReceipt;
              if (receipt) {
                if (!userDetails.token) {
                  return;
                }
                console.log('purchaseUpdatedListener', userDetails.token);

                userPurchase(userDetails.token, {})
                  .then(async (res) => {
                    console.log('res from server', res);
                    if (res.code !== 200) {
                      return;
                    }

                    reduxSaveUser({ ...userDetails, ...res.body });

                    if (Platform.OS === 'ios') {
                      await RNIap.finishTransactionIOS(purchase.transactionId);
                    } else if (Platform.OS === 'android') {
                      // If consumable (can be purchased again)
                      await RNIap.consumePurchaseAndroid(purchase.purchaseToken);
                      // If not consumable
                      await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
                    }
    
                    await RNIap.finishTransaction(purchase, false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            });

            purchaseErrorSubscription = purchaseErrorListener((error) => {
              console.warn('purchaseErrorListener', error);
            });
          })
      })
      .catch((err) => {
        console.warn(err);
      });

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
    }
  }, [token]);

  return isLoading?(<Loading/>):(
    <NavigationContainer>
      {/* <StatusBar backgroundColor="#FEC55E" barStyle='light-content'/> */}
      <StatusBar backgroundColor="#FFF" barStyle='dark-content'/>

      <Stack.Navigator>
        {!userDetails.token?(
          <>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false, ...horizontalAnimation}}/>
            <Stack.Screen
              name="AgeRange"
              options={{headerShown: false, ...horizontalAnimation}}
              component={AgeRange}/>
          </>
        ):(
          <>
            <Stack.Screen
              name="HomePages"
              component={HomePages}
              options={{headerShown: false, ...horizontalAnimation}}/>
            <Stack.Screen
              name="Premium"
              options={{...headerStyles, ...horizontalAnimation}}
              component={PremiumScreen}/>
            <Stack.Screen
              name="Done"
              options={{headerShown: false, ...horizontalAnimation}}
              component={Done}/>
            <Stack.Screen
              name="Course"
              options={{headerShown: false, ...horizontalAnimation}}
              component={Course}/>
            <Stack.Screen
              name="Exercise"
              options={{headerShown: false, ...horizontalAnimation}}
              component={Exercise}/>
            <Stack.Screen
              name="AboutCourse"
              options={{ title: '', headerTintColor: 'white', headerStyle: { backgroundColor: '#FEC55E', shadowColor: 'transparent' }, ...horizontalAnimation}}
              component={AboutCourse}/>
            <Stack.Screen
              name="AboutExercise"
              options={{ title: '', headerTintColor: 'white', headerStyle: { backgroundColor: '#FEC55E', shadowColor: 'transparent' }, ...horizontalAnimation}}
              component={AboutExercise}/>
          </>
        )}
        <Stack.Screen
          name="Generating"
          options={{headerShown: false, ...horizontalAnimation}}
          component={GeneratingScreen}/>
        <Stack.Screen
          name="Reset"
          options={{ ...headerStyles, ...horizontalAnimation}}
          component={Reset}/>
        <Stack.Screen
          name="Email"
          options={{ ...headerStyles, ...horizontalAnimation}}
          component={Email}/>
        <Stack.Screen
          name="Error"
          options={{ ...headerStyles, ...horizontalAnimation}}
          component={ErrorScreen}/>
        <Stack.Screen
          name="LoginScreen"
          options={{ ...headerStyles, ...horizontalAnimation}}
          component={LoginScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
