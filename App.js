import React from "react";

import { StyleSheet, View } from "react-native";

//--------------------------------------------------------

import Maps from "./src/components/Maps";
import RadiusSlider from "./src/components/RadiusSlider";
import RadiusCircle from "./src/components/RadiusCircle";
import LoadingScreen from "./src/components/LoadingScreen";
//---------------------------------------------
import api_services from "./src/services/api-services";
import asyncStorage from "./src/utlis/asyncStorage";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
//import registerFetchTask from "./src/services/background-task";

//--------------------------------------
import { Provider } from "react-redux";

import store from "./src/redux/store";

//---------------------------
// TaskManager.defineTask("taskExample", async ({ data, error }) => {
//   if (error) {
//     console.log(error.message);
//     return;
//   }
//   if (data) {
//     let dateValue = new Date().toString();
//     asyncStorage.storeData({ key: "backGroundDate", value: dateValue });
//     asyncStorage.getData("backGroundDate").then((data) => {
//       console.log(data);
//     });
//   }
// });

//---------------------------

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: { lat: 0, lon: 0 },
      time: new Date().toDateString,
    };
  }

  async componentDidMount() {
    await this.getLocation();

    // this.userDocUpdate(
    //   this.state.coordinates.lat,
    //   this.state.coordinates.lon,
    //   this.state.time
    // );
    //asyncStorage.removeData("userDoc");
    // asyncStorage.getData("userDoc").then((data) => {
    //   console.log(data);
    // });
    // let dateValue = new Date().toString();
    // asyncStorage.storeData({ key: "backGroundDate", value: dateValue });
  }

  getLocation = async () => {
    const position = await Location.getCurrentPositionAsync({});
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const time = position.timestamp;
    this.setState({ coordinates: { lat: lat, lon: lon }, time: time });
  };

  userDocUpdate = async (lat, lon, time) => {
    const userDoc = JSON.parse(await asyncStorage.getData("userDoc"));

    if (userDoc === null) {
      const res = await api_services("newUserDoc", [lat, lon, time]);
      if (res.id) {
        asyncStorage.storeData({
          key: "userDoc",
          value: JSON.stringify({
            _id: res.id,
            _rev: res.rev,
            coordinates: [lat, lon],
          }),
        });
      }
    } else {
      const res = await api_services("updateUserDoc", [
        userDoc._id,
        userDoc._rev,
        lat,
        lon,
        time,
      ]);
      console.log(res);
      if (res.id) {
        asyncStorage.storeData({
          key: "userDoc",
          value: JSON.stringify({
            _id: res.id,
            _rev: res.rev,
            coordinates: [lat, lon],
          }),
        });
      }
    }
  };

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {/* <Toggle /> */}
          <Maps coordinates={this.state.coordinates} />
          <RadiusSlider />
          <RadiusCircle />
          <LoadingScreen />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
  },
});
