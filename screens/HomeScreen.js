import React, { Component } from 'react';

import {
    Text,
    View,
    AsyncStorage,
    Button,
    StyleSheet
} from 'react-native';
import NavigationService from '../NavigationService.js';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
    first,
    last,
    state,
    text
} from '../screens/LoginScreen.js';


var url = "https://civil-charmer-256720.appspot.com/";
class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Team 8 Attendance',
        headerLeft: null,
        gesturesEnabled: false,
        headerTintColor: "white",

        headerStyle: {
            backgroundColor: '#03572C',
        },

    }
    diff_hours(dt2, dt1) {
        var diff = (dt2 - dt1) / 1000;
        diff /= (60 * 60);
        return Math.abs(diff);
    }
    test() {
        AsyncStorage.getItem("loginTime").then((value) => {
            var timeout = new Date().getTime();
            var totalTime = timeout - value;
            var totalHours = this.diff_hours(timeout, value)
            alert(new Date(parseInt(value)).toISOString());
            AsyncStorage.getItem("id").then((id) => {
                fetch(`${url}logHours/`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: id,
                        hours: totalHours.toFixed(1),
                        timein: new Date(parseInt(value)).toISOString().substr(11, 8),
                        timeout: new Date(timeout).toISOString().substr(11,8)
                    })
                }).then(function(response) {

                });
            });
        });
    }
    render() {

            return(
            <View styles = { styles.container } >
                    <Button title="Submit Hours"
                        onPress={() => {
                            this.test()
                        }}
                    >

                    </Button>



                    <Button

                        title="Scan QR code"
                        style={styles.button}
                        onPress={() => {
                            this.props.navigation.navigate('QRCode')

                        }}
                    />
                    <Button title="Log Out"
                        onPress={() => {
                            this.props.navigation.navigate('Login')
                        }} />
            </View>
        )
    }


}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        backgroundColor: '#03572C',
        marginTop: 50,
        borderRadius: 15,

    }
})
