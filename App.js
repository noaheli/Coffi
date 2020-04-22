import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import Capture from './src/pages/Capture';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Home/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
