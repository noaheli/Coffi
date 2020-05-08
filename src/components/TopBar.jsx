import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';

export default class TopBar extends Component {
  render (){
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={()=>{this.props.navigation.toggleDrawer()}}
        >
          <Image 
            source={require('../../assets/hamburger.png')}
            style={styles.hamburger}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: 'row',
    backgroundColor: '#00e5ff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingTop: 20,
  },
  hamburger: {
    width: 30,
    height: 30,
  }
});
