import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack' ;
import LoginScreen from './screens/LoginScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import HomeScreen from './screens/HomeScreen';
import NavigationService from './NavigationService';


const AppsStackNavigator = createStackNavigator({
    Login: LoginScreen,
    Home: HomeScreen,
    QRCode: QRCodeScreen,
   
},
  {
    initialRouteName: 'Login'

    
  }
)
const AppContainer = createAppContainer(AppsStackNavigator)

export default class App extends React.Component {
  render(){
    return (
      <AppContainer 
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
      />

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
