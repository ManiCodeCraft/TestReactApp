import React, { Component } from "react";
import InputField from "./InputFiled";

import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform
} from "react-native";
export default class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View style={styles.scrollViewWrapper}>
        <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Login</Text>
            <InputField 
              labelText="EMAIL ADDRESS" 
              labelTextSize={14} 
              labelColor='#ffffff'
              textColor='#ffffff'
              borderBottomColor='#ffffff'
              inputType="email" 
              customStyle={{marginBottom:30}} 
                
            />
            <InputField 
              labelText="PASSWORD" 
              labelTextSize={14} 
              labelColor='#ffffff'
              textColor='#ffffff'
              borderBottomColor='#ffffff'
              inputType="password"  
              customStyle={{marginBottom:30}}

            />
          
          </ScrollView>
         </View>
       </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: '#084709'
    
    
  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1
  },
  avoidView: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex:1
   },
  loginHeader: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: "300",
    marginTop: 100
  }
});