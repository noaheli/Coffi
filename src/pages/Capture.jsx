import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TopBar from '../components/TopBar';

export default class Capture extends Component {

  constructor(props){
    super();
  }

  render (){
    return (
      <View style={styles.container}>
        <TopBar navigation={this.props.navigation}/>
        <View style={styles.contentArea}>
          <Text>I see you're here to capture</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
