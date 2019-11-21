import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack' ;
import LoginScreen from './screens/LoginScreen';
import QRCodeScreen from './screens/QRCodeScreen';


const AppsStackNavigator = createStackNavigator({
    Login: LoginScreen,
    QRCode: QRCodeScreen
})
const AppContainer = createAppContainer(AppsStackNavigator)

export default class App extends React.Component {
  render(){
    return (
      <AppContainer />

      );
  
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
