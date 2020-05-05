import React from "react"
import TouchID from 'react-native-touch-id';
import {Text, View, TouchableHighlight, NativeModules, Platform} from 'react-native';
import ToastExample from './ToastExample';

const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  export default class YourComponent extends React.Component {

  _pressHandler() {
    if(Platform.OS === 'ios'){
 var sample = NativeModules.SampleClass;
    sample.showAuthentication((success, responseString) => {
      if (success) {
        alert(responseString)
      } else {
        alert(responseString)
      }
    });
    }else{
      ToastExample.showAuthentication(
       (error) => {
        alert(error);
       },
       (success) => {
        alert(success);
       },

      );

    }

   


    // TouchID.authenticate('to demo this react-native component', optionalConfigObject)
    //   .then(success => {
    //     alert('Authenticated Successfully')
    //   })
    //   .catch(error => {
    //     alert('Authentication Failed ')
    //   });
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={{top:100}} onPress={this._pressHandler}>
          <Text>
            Authenticate with Touch ID
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};