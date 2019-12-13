'use strict';

import React, { Component } from 'react';

import {
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import BackgroundTask from 'react-native-background-task'

import QRCodeScanner from 'react-native-qrcode-scanner';

BackgroundTask.define(async () => {
  
  var checkpoints = {
    left: {
      latitude: 37.436634,
      longitude: -122.156966  
    },
    bottom: {
      latitude: 37.435876,
    },
    right: {
      longitude: -122.154633
    }
  }
  var url = "https://civil-charmer-256720.appspot.com/"
  navigator.geolocation.getCurrentPosition(position => {
    if(checkpoints.left.latitude < position.coords.latitude && position.coords.latitude < checkpoints.bottom.latitude 
      && checkpoints.right.longitude < position.coords.longitude && position.coords.longitude && checkpoints.left.longitude){
        
    } else {
      AsyncStorage.getItem("loginTime").then((value) => {
        var timeout = new Date().getTime();
        var totalTime = value - timeout;
        //fetch(`${url}logHours/`, {
        //  method: "POST",
        //  headers: { 'Content-Type': 'application/json' },
        //  body: JSON.stringify(signinData)
        //}
        
      })
      
    }
  })
  

})
export default class ScanScreen extends Component {

  static navigationOptions = {
    title: 'Log Hours',
    headerTintColor: "white",

    headerStyle: {
      backgroundColor: '#03572C'
    },
  }

  onSuccess = (e) => {
    if (e.data == "Team8Attendence") {
      var timeIn = new Date().getTime();
      AsyncStorage.setItem("loginTime", timeIn.toString());
      navigator.geolocation.getCurrentPosition(position => {
              
          })
      
      
      BackgroundTask.schedule({
        period: 100,
      })
      this.props.navigation.navigate('Home')
    } else {


      alert("Invalid QR code")
    }

  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        reactivate={true}
        reactivateTimeout={2500}
        topContent={<Text style={styles.centerText}>Scan to log Hours</Text>}


      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});

