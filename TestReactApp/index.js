/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './App';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import TabScreen from './TabScreen'
import NavigationDrawerScreen from './NavigationDrawerScreen'
import TableViewScreen from './TableViewScreen'
import DatePickerScreen from './DatePickerScreen'
import BioMetrics from './BioMetrics'
import BioMetricAndroid from './AndroidBioMetrics'
import {name as appName} from './app.json';
import TestScreen from './TestScreen'
import CurrentLocation from './CurrentLocation'
import PushNotification from './PushNotification'
import LoginVC from './Login'
AppRegistry.registerComponent(appName, () => TableViewScreen);
