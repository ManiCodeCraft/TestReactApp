import {Button, View, StyleSheet} from 'react-native';
import React, { Component } from 'react';
import GetLocation from 'react-native-get-location'
//https://www.npmjs.com/package/react-native-get-location
export default class CurrentLocation extends Component {

    _onPressButton() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
        .then(location => {
          alert('You tapped the button!' + location.latitude)
            console.log('hello' + location);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
        
      }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Button
                onPress={this._onPressButton}
                title="Press Me"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={this._onPressButton}
                title="Press Me"
                color="#841584"
              />
            </View>
            <View style={styles.alternativeLayoutButtonContainer}>
              <Button
                onPress={this._onPressButton}
                title="This looks great!"
              />
              <Button
                onPress={this._onPressButton}
                title="OK!"
                color="#841584"
              />
            </View>
          </View>
        );
      }

}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     justifyContent: 'center',
    },
    buttonContainer: {
      margin: 20
    },
    alternativeLayoutButtonContainer: {
      margin: 20,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });
  