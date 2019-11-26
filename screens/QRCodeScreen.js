'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {

  static navigationOptions = {
    title: 'Log Hours'
  }

  onSuccess = (e) => {
      alert(e.data)
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        reactivate={true}
        reactivateTimeout={2500}
        topContent={
        }
        bottomContent={
        }
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

//var date = new Date().getDate(); //Current Date
//var month = new Date().getMonth() + 1; //Current Month
//var year = new Date().getFullYear(); //Current Year
//var hours = new Date().getHours(); //Current Hours
//var min = new Date().getMinutes(); //Current Minutes
//var sec = new Date().getSeconds(); //Current Seconds
//var finalHours = new Date() .getHours();
//var finalMin = new Date() .getMinutes();

//this.setState(hours)
//this.setState(finalHours)
//this.setState(min)
//this.setState(finalMin)
// var totalHours = hours - finalHours 
// var totalMintues = min - finalMin
// var totalTime = totalHours + ":" + totalMinutes
// sendTime () => {
//  var totalTime;
//  fetch("http://zachary-d4tm.localhost.run/hours/")
//    method: "POST"
//    body: JSON.stringify(totalTime)
//    }).then(function(response)){
//      AysncStorage.settime(totalTime)
//}
//
//}