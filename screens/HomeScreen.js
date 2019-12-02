import React, {Component} from 'react';

import{
    Text,
    View,
    AsyncStorage,
    Button,
    StyleSheet
} from 'react-native';
import NavigationService from '../NavigationService.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



class HomeScreen extends React.Component{
    static navigationOptions = {
        title: 'Team 8 Attendance',
        headerLeft: null,
        gesturesEnabled: false,
    }
    render() {
        return (
            <View>
                
                <Button title="scan QR code"
                onPress ={() => {
                   this.props.navigation.navigate('QRCode')
                }}
                ></Button>
                <Button title="log out"
                onPress ={() => {
                    this.props.navigation.navigate('LoginScreen')
                }}></Button>
            </View>
        )
    }
}
export default HomeScreen;