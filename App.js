import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import Capture from './src/pages/Capture';
import TopBar from './src/components/TopBar'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home}/>
          <Drawer.Screen name="Capture" component={Capture}/>
        </Drawer.Navigator>
      </NavigationContainer>
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
