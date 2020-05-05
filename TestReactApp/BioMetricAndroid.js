import React from "react"
import TouchID from 'react-native-touch-id';
import {
  View,TouchableHighlight,Text
} from 'react-native';


export default class BioMetricAndroid extends React.Component {

    _pressHandler() {
      TouchID.authenticate('to demo this react-native component')
        .then(success => {
          alert('Authenticated Successfully')
          console.log('Authenticated Successfully ')
         // AlertIOS.alert('Authenticated Successfully');
        })
        .catch(error => {
          alert('Authentication Failed ')
          console.log('Authentication Failed ')
          //AlertIOS.alert('Authentication Failed');
        });
    }
   
    render() {
      return (
        <View>
          
          <TouchableHighlight style={{top:100}} onPress={this._pressHandler}>
            <Text>Authenticate with Touch ID </Text>
          </TouchableHighlight>
        </View>
      );
    }
  };
  