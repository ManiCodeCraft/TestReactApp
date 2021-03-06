import React, {Component} from 'react';
import { AsyncStorage, View, Text,  Clipboard } from 'react-native';
import firebase from 'react-native-firebase';
//https://medium.com/@anum.amin/react-native-integrating-push-notifications-using-fcm-349fff071591
//https://stackoverflow.com/questions/40380519/error-package-com-android-annotations-does-not-exist
//https://github.com/wix/react-native-navigation/issues/4671
export default class PushNotification extends Component {

async componentDidMount() {
  this.checkPermission();
  this.createNotificationListeners();
}

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
 
  
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  //1
async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getToken();
  } else {
      this.requestPermission();
  }
}


async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    Clipboard.setString(fcmToken);
    alert(fcmToken)
    Console.log("Token device " + fcmToken);
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
             Console.log("Token device " + fcmToken);
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }
  
    //2
  async requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }
  
    render() {
      return (
        <View style={{flex: 1}}>
          <Text>Welcome to React Native!</Text>
        </View>
      );
    }
  }