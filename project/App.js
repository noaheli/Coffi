import React, { useState, useEffect, Component } from 'react';
import { Animated, Platform, StyleSheet, Text, View, Image, Easing, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import FontAwesomeIcon, { SolidIcons, RegularIcons } from 'react-native-fontawesome';




const stuff = [
  {
    name: "Test Shop 1",
    stars: 4,
    description: "The bbest gigglin coffee shop in town.",
    img: ['https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/321371_1100-1100x628.jpg',
      'https://image.shutterstock.com/image-photo/wood-table-top-blur-people-260nw-568528537.jpg',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'],
    loc: '.3 miles',
    password: {
      has: true,
      login: 'password',
      pw: 'password'
    }
  },
  {
    name: "Test Shop 2",
    stars: 4,
    description: "the  actuallly best gigglin coffee shop in townaaaa aaa aaaas dasfdfslkf js kjshgdkj fghdkh gdkfd khg dkhg dkfhg kdhg dkdkfgh kdfhgk dhfgkd hgkdhg kdfgk dfgkdh fgkdhfgk dh",
    img: ['https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1200px-A_small_cup_of_coffee.JPG'],
    loc: '.3 miles',
    password: {
      has: false,
      login: 'password',
      pw: 'password'
    }
  },
  {
    name: "Shitty Pace Starbucks",
    stars: 3,
    description: "Don't even think about coming here you can't even spend real money like what's the point lol",
    img: ['https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-760w.jpg',
      'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/321371_1100-1100x628.jpg',
      'https://image.shutterstock.com/image-photo/wood-table-top-blur-people-260nw-568528537.jpg',
      'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'],
    loc: '.3 miles',
    password: {
      has: true,
      login: 'password',
      pw: 'password'
    }
  }
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      clickedIndex: -1,
      drillDown: false
    };
    this.buttonClick = this.buttonClick.bind(this);
    this.fadeVal = new Animated.Value(1);
  }
  buttonClick = (i) => {
    if (this.state.clicked) {
      this.setState({ clicked: false })
    }
    else {
      this.setState({
        clicked: true,
        clickedIndex: i
      });
    }
    Animated.timing(this.fadeVal, {
      toValue: 0.00001,
      easing: Easing.linear,
      duration: 200
    }).start(() => {
      //When fadeout animation is completed, fade in coffee shop page
      console.log("fadeval: " + this.fadeVal._value);
      if (this.state.clicked) this.setState({ drillDown: true });
      else this.setState({ drillDown: false });
      Animated.timing(this.fadeVal, {
        toValue: 1,
        easing: Easing.linear,
        duration: 200
      }).start(() => {
        //When fadeout animation is completed, fade in coffee shop page
        console.log("fadeval: " + this.fadeVal._value);
      });
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {(!this.state.drillDown) ?
            //This is the list of shops that the user views initially. Everything within the stuff.map() function is the rendering of each row
            (<Animated.View style={{
              ...styles.shopList,
              opacity: this.fadeVal
            }}>
              {stuff.map((e, i) => {
                return (
                  <TouchableWithoutFeedback style={styles.tapItem} onPress={(ev) => this.buttonClick(i)}>
                    <View style={styles.shopItem} value={i} key={i} >
                      <View style={styles.shopBackground} />
                      <Image
                        style={styles.img}
                        source={{
                          uri: e.img[0],
                        }}
                      />
                      <View style={styles.shopTitle}>
                        <Text style={styles.shopTitleText} numberOfLines={1}>{stuff[i].name}</Text>
                        <View style={styles.starBox}><Text style={styles.stars}><Icon name="star" size={12} color="#FFFF00" /> {stuff[i].stars}/5</Text></View>
                      </View>
                      <View style={styles.shopInfo}>
                        <Text style={styles.shopDesc} numberOfLines={2}>{stuff[i].description}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>);
              })}
            </Animated.View>)
            :
            //This is the view that displays the details about a shop, shown after a user taps a specific shop row
            (<Animated.View style={{
              ...styles.main,
              opacity: this.fadeVal
            }}>
              <ScrollView style={{ height: "100%", minHeight: "100%" }}>
                <View style={styles.ddTitleCard}>
                  <View style={{
                    ...styles.shopTitle,
                    top: 5,
                    left: 5
                  }}>
                    <TouchableWithoutFeedback onPress={() => this.buttonClick(this.state.clickedIndex)}><Text style={styles.shopTitleText}>{stuff[this.state.clickedIndex].name}</Text></TouchableWithoutFeedback>
                    <View style={{ ...styles.starBox, }}><Text style={styles.stars}><Icon name="star" size={12} color="#FFFF00" /> {stuff[this.state.clickedIndex].stars}/5</Text></View>
                  </View>
                  <View style={styles.ddImageWrap}>
                    <View style={styles.scrollWrap}>
                      <ScrollView horizontal={true} style={styles.imageScroller}>
                        {stuff[this.state.clickedIndex].img.map((e, i) => {
                          return (<Image key={i} style={{ height: 400, width: 400 }} source={{ uri: e }} />
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                </View>
                <View style={styles.ddInfo}>
                  <View style={{ ...styles.pwBox }}>
                    <View style={styles.infoBox}>
                      <View style={{ ...styles.lockBox, backgroundColor: ((stuff[this.state.clickedIndex].password.has) ? "#1BC458" : "#FF4F6F") }}><Icon style={styles.centerIcon} name="lock" size={18} color="#FFFFFF" /></View>
                      <View style={styles.wordBox}><Text style={{ ...styles.shopTitleText, minWidth: "100%", fontWeight: "normal", fontSize: 14 }} numberOfLines={1}>Wifi Available</Text></View>
                    </View>
                  </View>
                  <View style={{ ...styles.pwBox, position: "absolute", left: "50%" }}>
                    <View style={styles.infoBox}>
                      <View style={{ ...styles.lockBox, backgroundColor: "#fbff00" }}><Icon style={styles.centerIcon} name="compass" size={24} color="#101010" /></View>
                      <View style={{ ...styles.wordBox, }}><Text style={{ ...styles.shopTitleText, minWidth: "100%", fontWeight: "normal", fontSize: 14 }} numberOfLines={1}>{stuff[this.state.clickedIndex].loc}</Text></View>
                    </View>
                  </View>
                </View>
                <View style={styles.ddDesc}>
                  <View
                    style={{
                      borderRadius: 10, minWidth: "33%", width: "66%", left: "16.5%", top: -15,
                      position: "absolute", zIndex: 10, backgroundColor: "#8ca6bd", alignItems: "center",
                      height: 30, justifyContent: 'center'
                    }}
                  >
                    <Text size={32} style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF" }}>DESCRIPTION</Text>
                  </View>
                  <View
                    style={{
                      borderRadius: 10, minWidth: "33%", width: "66%", left: "17%", top: -11,
                      position: "absolute", zIndex: 9, backgroundColor: "#000000",
                      height: 30
                    }}
                  />
                  <View style={{ minWidth: "95%", width: "95%", marginLeft: "2.5%", top: 20}}>
                    <Text>{stuff[this.state.clickedIndex].description}</Text>
                  </View>
                  <View>

                  </View>
                </View>
              </ScrollView>
            </Animated.View>)
          }
        </View>
        {/* <Animated.View style={{
          position: "absolute",
          width: this.state.circleSize,
          height: this.state.circleSize,
          minWidth: this.state.circleSize,
          minHeight: this.state.circleSize,
          borderRadius: isNaN(this.state.circleSize / 2) ? 0 : (this.state.circleSize / 2),
          top: 10,
          left: 100,
          backgroundColor: "#090FF0"
        }}>
          <Text>hi</Text>
        </Animated.View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ddDesc: {
    backgroundColor: "#FFFFFF",
    height: 500,
    minWidth: "95%",
    width: "95%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    top: 40,
    borderRadius: 10
  },
  centerIcon: {
    left: "25%",
    top: "15%"
  },
  lockBox: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "18%",
    height: "100%",
    backgroundColor: "#000000"
  },
  wordBox: {
    paddingLeft: "2.5%",
    position: "absolute",
    top: '-5%',
    left: "18%",
    width: "82%",
    minWidth: "82%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  infoBox: {
    width: "90%",
    minWidth: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    height: "80%",
    minHeight: "80%",
    marginTop: "3%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    position: 'relative',
    top: 0
  },
  scrollWrap: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    overflow: "hidden"
  },
  pwBox: {
    width: "50%",
    minWidth: "50%",
    height: "100%",
    minHeight: "100%",
    position: "absolute",
    overflow: 'hidden',
  },
  ddInfo: {
    display: "flex",
    width: "100%",
    top: 15,
    overflow: 'hidden',
    height: 40,
    minHeight: 40,
  },
  imageScroller: {
    width: "100%",
    minWidth: "100%",
    height: "100%",
    minHeight: "100%"
  },
  ddImageWrap: {
    position: 'absolute',
    marginLeft: "2.5%",
    marginRight: "2.5%",
    width: "95%",
    height: 500,
    minHeight: 500,
    zIndex: 1,
    top: 50,
    borderRadius: 50
  },
  ddTitleCard: {
    height: 450,
    minHeight: 450,
    width: "100%",
    minWidth: "100%",
    paddingTop: 30
  },
  main: {
    backgroundColor: "rgb(48, 54, 71)",
    minWidth: "100%",
    width: "100%",
    minHeight: "100%",
    width: "100%",
    height: "100%",
    alignItems: 'center',
    overflow: 'scroll',
    position: "relative"
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
    overflow: "hidden",
    zIndex: 2
  },
  starBox: {
    backgroundColor: "#3E627A",
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
  tapItem: {
    width: "100%",
    minWidth: "100%",
    height: 80,
    minHeight: 80
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
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%"
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
