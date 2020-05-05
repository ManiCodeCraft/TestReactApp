import React, {Component} from 'react';
import { View,StyleSheet,StatusBar,SafeAreaView,Text,TextInput } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';


export default class LoginScreen extends Component {

render(){
    return(
        <View style={{flex: 1 , backgroundColor:'yellow'}}>
        <View 
          style={{
             flex: 1,
             justifyContent: 'center',
             alignItems: 'center',
             left:10, right: 10
          }}
        >
          <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1,left:10, right: 10  }}
      value='Username'
    />
 <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
      value='Password'
    />
        </View>
        
    </View>
    
    );
}

}

const styles = StyleSheet.create({
    container: {
      height:100,
      width:100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
    },
    outerCircle: {
      backgroundColor: 'blue',
      width: 100,
      height: 100,
      borderRadius: 100/2,
    },
    innerCircle: {
      backgroundColor: 'red',
      width: 80,
      height: 80,
      borderRadius: 80/2,
    }
  });