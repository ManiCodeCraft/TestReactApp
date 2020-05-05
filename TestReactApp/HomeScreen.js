/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Text, View, AppState, xml2js} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Parser from './node_modules/react-native-xml2js';

//const yourModuleName = require('react-native-xml2js');

export default class HomeScreen extends Component {
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.setState({envoy_status: 'You are not connected with Envoy'});
      this.setState({internet_status: 'You are not connected with internet'});

      this.checkInternetConnection();
      this.checkEnvoyConnection();
      console.log('App has come to the foreground!');
    }
    this.setState({appState: nextAppState});
  };

  state = {
    envoy_status: '',
    appState: AppState.currentState,
    internet_status: 'You are not connected with internet',
  };

  componentDidMount() {
    console.disableYellowBox = true;
    console.reportErrorsAsExceptions = false;
    AppState.addEventListener('change', this._handleAppStateChange);
    this.setState({envoy_status: 'You are not connected with Envoy'});
    this.checkInternetConnection();
    this.checkEnvoyConnection();
  }

  checkInternetConnection() {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        this.setState({
          internet_status:
            'You are connected with internet through ' + state.type,
        });
      } else {
        this.setState({
          internet_status: 'You are not connected with internet',
        });
      }
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
  }

  checkEnvoyConnection(){
    const parseString = Parser.parseString;

    fetch('http://172.30.1.1/info.xml')
      .then(response => response.text())
      .then(response => {
        parseString(
          response,
          function(_err, result) {
            let envoy = result.envoy_info;
            let device = envoy.device;
            let sn = device[0].sn;
            this.setState({
              envoy_status: 'Yes. You are connected with Envoy ' + sn[0],
            });
          }.bind(this),
        );
      })
      .catch(err => {
        console.log('fetch', err)
        this.setState({envoy_status: 'You are not connected with Envoy'});
      });
  }

  // () {
  //   return fetch('http://172.30.1.1/info.xml')
  //     .then(response => response.text)
  //     .then(responseJson => {
  //       this.setState({envoy_status: 'Yes. You are connected with Envoy'});
  //       return responseJson;
  //     })
  //     .catch(error => {
  //       console.error(error);
  //       this.setState({envoy_status: 'You are not connected with Envoy'});
  //     });
  // }

  render() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <Text
          style={{
            backgroundColor: 'powderblue',
            justifyContent: 'center',
            borderColor: Colors.black,
            borderWidth: 1,
            top: 200,
            textAlign: 'center',
          }}>
          {this.state.envoy_status}
        </Text>
        <Text
          style={{
            backgroundColor: 'powderblue',
            justifyContent: 'center',
            borderColor: Colors.black,
            borderWidth: 1,
            top: 250,
            textAlign: 'center',
          }}>
          {this.state.internet_status}
        </Text>
      </View>
    );
  }
}
