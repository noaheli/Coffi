import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import Capture from './src/pages/Capture';
import TopBar from './src/components/TopBar'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar/>
        <View style={styles.contentArea}>
          <Home/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentArea: {
    flex: 1
  }
});
