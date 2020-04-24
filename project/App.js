import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, Text, View, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon, { SolidIcons, RegularIcons } from 'react-native-fontawesome';


const stuff = [
  {
    name: "hehe1",
    stars: 4,
    description: "the bbest gigglin coffee shop in town"
  },
  {
    name: "hehe2",
    stars: 4,
    description: "the  actuallly best gigglin coffee shop in town"
  },
  {
    name: "pace",
    stars: 3,
    description: "hahshahahah town"
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      clickedIndex: -1,
    };
    this.buttonClick = this.buttonClick.bind(this);

  }
  buttonClick = (i) => {
    if (this.state.clicked) {
      if (this.state.clickedIndex === i) {
        console.log("unclicked");
        this.setState({ clicked: false });
      }
      else {
        this.setState({ clickedIndex: i });
        console.log("changed to " + i);
      }

    }
    else {
      console.log("clicked " + i);
      this.setState({
        clicked: true,
        clickedIndex: i
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.shopList}>
            {stuff.map((e, i) => {
              return (
                <View style={styles.shopItem} key={i} onClick={(i) => this.buttonClick(i)}>
                  <View style={styles.shopBackground} />
                  <Image
                    style={styles.img}
                    source={{
                      uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                  />
                  <View style={styles.shopTitle}><Text>{stuff[i].name}</Text></View>
                  <View style={styles.shopInfo}>
                    <Text><Icon name="star" size={20} color="#A6A6A6" />{stuff[i].stars}/5</Text>

                    <Text>{stuff[i].description}</Text>
                  </View>
                </View>);
            })}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "rgb(48, 54, 71)",
    minWidth: "100%",
    minHeight: "100%",
    alignItems: 'center'
  },
  img: {
    top: -10,
    height: 50,
    width: 50,
    position: 'relative'
  },
  shopBackground: {
    backgroundColor: "#384363",
    borderRadius: 5,
    position: "absolute",
    minWidth: "500px",
    minHeight: 50,
    left: 10
  },
  shopTitle: {
    backgroundColor: "rgb(235, 235, 235)",
    paddingTop: 3,
    paddingBottom: 3,
    minWidth: 20,
    maxWidth: 70,
    top: -60,
    left: 60,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative'
  },
  shopInfo: {
    top: -60,
    left: 60
  },
  shopList: {
    marginTop: 40,
    minWidth: "400px"
  },
  shopItem: {
    marginTop: 20,
    marginBottom: 2,
    paddingTop: 4,
    paddingBottom: 3,
    minWidth: "600px",
    maxWidth: "600px",
    height: 50
  },
  shopItemClicked: {
    marginTop: 20,
    marginBottom: 2,
    paddingTop: 4,
    paddingBottom: 3,
    minWidth: "600px",
    maxWidth: "600px",
    backgroundColor: "#384363",
    borderRadius: 5,
    height: 400
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
  },
});
