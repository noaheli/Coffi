import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  FlatList,
  Clipboard,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import vision from "react-cloud-vision-api";
import config from "../../assets/config.json";
import TopBar from "../components/TopBar";
vision.init({ auth: "AIzaSyA-tG5XXs6upv4I1QDsiB6_pQE396FRJ2U" });

export default class CameraModule extends Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    result: null,
    base64: null,
    googleVisionDeletion: null,
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    await this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  };

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    });
  };

  takePicture = async () => {
    const options = { base64: true, quality: 1.0 };
    let uri = await this.camera.takePictureAsync(options);
    console.log("uri", uri.base64);
    let photobase64 = uri.base64;
    await this.submitToGoogle(photobase64);
  };

  submitToGoogle = async (base64) => {
    let googleVisionRes = await fetch(
      config.googleCloud.api + config.googleCloud.apiKey,
      {
        method: "POST",
        body: JSON.stringify({
          requests: [
            {
              image: {
                content: base64,
              },
              features: [
                { type: "LABEL_DETECTION", maxResults: 10 },
                { type: "LOGO_DETECTION", maxResults: 5 },
                { type: "TEXT_DETECTION", maxResults: 5 },
                { type: "DOCUMENT_TEXT_DETECTION", maxResults: 5 },
              ],
            },
          ],
        }),
      }
    );

    await googleVisionRes
      .json()
      .then((googleVisionRes) => {
        console.log(googleVisionRes);
        if (googleVisionRes) {
          this.setState({
            loading: false,
            googleVisionDetetion: googleVisionRes.responses[0],
          });
          console.log("this.is response", this.state.googleVisionDetetion);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  keyExtractor = (item) => item.id;
  textAnnotations;

  render() {
    const { hasPermission } = this.state;

    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <TopBar navigation={this.props.navigation} />
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 30,
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onPress={this.takePicture}
              >
                <FontAwesome
                  name="camera"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: "flex-end",
                  alignItems: "center",
                  backgroundColor: "transparent",
                }}
                onPress={() => this.handleCameraType()}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: "#fff", fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
          <View style={styles.outputBox}>
            <Text>Touch to Copy to clipboard</Text>
            <Text>Wifi Password</Text>
            {this.state.googleVisionDetetion && (
              <FlatList
                data={this.state.googleVisionDetetion.textAnnotations}
                extraData={this.state}
                keyExtractor={this.keyExtractor}
                renderItem={({ item }) => (
                  <Text onPress={() => Clipboard.setString(item.description)}>
                    {item.description}
                  </Text>
                )}
              />
            )}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  outputBox: {
    paddingBottom: 90,
  },
});
