import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import TopBar from "../components/TopBar";

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopBar navigation={this.props.navigation} />
        <View style={styles.contentArea}>
          <Text>Open up App.js to start working on your app!</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
