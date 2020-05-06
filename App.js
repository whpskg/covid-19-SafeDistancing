import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { getCurrentFrame } from "expo/build/AR";

//--------------------------------------------------------
import Toggle from "./src/components/Toggle";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
    this.getLocation = function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          x: position.coords.latitude,
          y: position.coords.longitude,
        });
      });
    };
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <Toggle />
        <MapView
          region={{
            latitude: this.state.x,
            longitude: this.state.y,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.mapStyle}
        ></MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    zIndex: -1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
