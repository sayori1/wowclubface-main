import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import * as Iconly from 'react-native-iconly';

export default ({
  value, title, error, editable = true, updateMasterState, isPassword, maxLength, textInputStyles
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <View style={{width: '100%'}}>
      <View
        style = {[Styles.textInput, Styles.container, textInputStyles]}
      >
        <TextInput
          style={Styles.textInput}
          value = {value}
          underlineColorAndroid = 'transparent'
          maxLength={maxLength}
          editable = {editable}
          onChangeText = {updateMasterState}
          secureTextEntry = {isPassword && secureTextEntry}
          placeholder={title}
          placeholderTextColor="#777"
        />
        {
          isPassword?(
            <TouchableOpacity style={Styles.eyeContainer} onPress={() => setSecureTextEntry(!secureTextEntry)}>
              {
                secureTextEntry?(
                  <Iconly.Hide size={24} color="#313139" style={Styles.eye}/>
                ):(
                  <Iconly.Show size={24} color="#313139" style={Styles.eye}/>
                )
              }
            </TouchableOpacity>
          ):null
        }
      </View>

      {
        error?(
          <Text style={Styles.error}>{error}</Text>
        ):null
      }
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginTop: 25,
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 5,
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
  eyeContainer: {
    position: 'absolute',
    width: 50,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  eye: {
    marginRight: 16,
  },
  error: {
    marginTop: 10,
    marginLeft: 20,
    color: '#D4777C'
  },
  textInput: {
    fontSize: 15,
    fontFamily: 'Avenir-Medium',
    color: 'black',
    // borderColor: '#000',
    // borderWidth: 1,
    borderRadius: 9,
  },
  titleStyles: {
    position: 'absolute',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    left: 20,
  }
})

