import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import Capture from './src/pages/Capture';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import ShopListing from "./src/pages/ShopListing";
import CameraModule from './src/pages/CameraModule';

const Drawer = createDrawerNavigator();

export default class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Capture" component={CameraModule}/>
            <Drawer.Screen name="Shop Listings" component={ShopListing}/>
          </Drawer.Navigator>
        </NavigationContainer>
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
