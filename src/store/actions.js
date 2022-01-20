import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = (userDetails) => {
  AsyncStorage.setItem('@app', JSON.stringify(userDetails));

  return {
    type: "SAVE_USER_DETAIL",
    payload: {
      name: userDetails.name,
      token: userDetails.token,
      email: userDetails.email,
      password: userDetails.password,
      needUpdate: userDetails.needUpdate,
      premiumExpires: userDetails.premiumExpires
    }
  };
};

