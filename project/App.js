import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, Text, View, Image } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon, { SolidIcons, RegularIcons } from 'react-native-fontawesome';
import { white } from 'color-name';
import { ETIME } from 'constants';


const stuff = [
  {
    name: "Test Shop 1",
    stars: 4,
    description: "The bbest gigglin coffee shop in town.",
    img: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/321371_1100-1100x628.jpg'
  },
  {
    name: "Test Shop 2",
    stars: 4,
    description: "the  actuallly best gigglin coffee shop in townaaaa aaaaaaasdasfdfslkfjs kjshgdkj fghdkhgdkfd khg dkhg dkfhg kdhg dkdkfgh kdfhgk dhfgkd hgkdhg kdfgk dfgkdhfgkdhfgk dh",
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG'
  },
  {
    name: "Shitty Pace Starbucks",
    stars: 3,
    description: "Don't even think about coming here you can't even spend real money like what's the point lol",
    img: 'https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-760w.jpg'
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
    this.tst = this.test.bind(this);
  }
  buttonClick = (i, evt) => {
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

  test = (evt) => {
    console.log("test: " + evt.type);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>

        </View>
        <View style={styles.main}>
          <View style={styles.shopList}>
            {stuff.map((e, i) => {
              return (
                <View style={styles.shopItem} value={i} key={i} onClick={(ev) => this.buttonClick(i, ev)} onClickCapture={(evt) => this.test(evt)}>
                  <View style={styles.shopBackground} />
                  <Image
                    style={styles.img}
                    source={{
                      uri: e.img,
                    }}
                  />
                  <View style={styles.shopTitle}>
                    <Text style={styles.shopTitleText} numberOfLines={1}>{stuff[i].name}</Text>
                    <View style={styles.starBox}><Text style={styles.stars}><Icon name="star" size={12} color="#FFFF00" /> {stuff[i].stars}/5</Text></View>
                  </View>
                  <View style={styles.shopInfo}>
                    <Text style={styles.shopDesc} numberOfLines={2}>{stuff[i].description}</Text>
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
    alignItems: 'center',
    overflow: 'scroll'
  },
  circle: {
    position: "absolute",
    top: 50,
    height: 50,
    minWidth: 50,
    minHeight: 50,
    borderRadius: 100,
    backgroundColor: "#FFFFFF"
  },
  img: {
    top: -15,
    height: 80,
    width: 80,
    position: 'relative',
    borderRadius: 10
  },
  shopBackground: {
    backgroundColor: "#384363",
    borderRadius: 5,
    position: "absolute",
    minWidth: '100%',
    minHeight: 80,
    left: 20
  },
  shopTitle: {
    backgroundColor: "rgb(235, 235, 235)",
    paddingTop: 3,
    paddingBottom: 3,
    minWidth: "70%",
    maxWidth: "70%",
    top: -95,
    left: 90,
    paddingLeft: 10,
    borderRadius: 5,
    position: 'relative',
    overflow: "hidden"
  },
  starBox: {
    backgroundColor: "#303030",
    minWidth: 60,
    minHeight: 31,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 4,
    right: 0,
    top: 0

  },
  shopTitleText: {
    maxWidth: "73%",
    fontSize: 18,
    fontWeight: "bold"
  },
  shopInfo: {
    top: -88,
    left: 95
  },
  shopList: {
    marginTop: 40,
    minWidth: 400
  },
  shopItem: {
    marginTop: 20,
    marginBottom: 2,
    paddingTop: 4,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: "50%",
    maxWidth: "95 %",
    width: "60%",
    height: 80
  },
  shopItemClicked: {
    marginTop: 20,
    marginBottom: 2,
    paddingTop: 4,
    paddingBottom: 3,
    minWidth: 600,
    maxWidth: 600,
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
  shopDesc: {
    maxWidth: "80%",
    color: "#FFFFFF"
  },
  stars: {
    
    color: "#FFFFFF"
  }
});
