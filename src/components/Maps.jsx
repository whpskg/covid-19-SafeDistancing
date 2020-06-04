import React, { useState, useEffect, useRef } from "react";
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";

import MapView from "react-native-map-clustering";

import { Marker } from "react-native-maps";

import api_services from "../services/api-services";

import { connect } from "react-redux";
import { setDelta } from "../redux/action/deltaAction";
import { loadingPoints, setLoadingStatus } from "../redux/action/loadingAction";

const mapStateToProps = (state) => ({
  radius: state.radiusReducer.radius,
  delta: state.deltaReducer,
});

const personIcon = require("../../assets/personIcon.png");

function Maps(props) {
  const [points, setPoints] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    //Initial setup user location
    (() => {
      mapRef.current.animateToRegion(
        {
          latitude: props.coordinates.lat,
          longitude: props.coordinates.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000
      );
    })();
  }, [props.coordinates]);

  const fetchNearPoints = (location) => {
    mapRef.current.animateToRegion(
      {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      300
    );

    props.loadingPoints(true);

    api_services("getNearPoints", [
      location.latitude,
      location.longitude,
      props.radius - 1000, // adjust for back end service query
    ]).then((res) => {
      if (res.points === undefined) {
        props.setLoadingStatus(true, false);
      } else if (res.points.length === 0) {
        props.setLoadingStatus(false, true);
      } else {
        props.setLoadingStatus(false, false);
        setPoints(
          res.points.map((x) => {
            let x_ = { latitude: x.lat, longitude: x.lon };
            return x_;
          })
        );
      }
      props.loadingPoints(false);
    });
  };

  return (
    <>
      <>
        <MapView
          ref={mapRef}
          initialRegion={{
            latitude: props.coordinates.lat,
            longitude: props.coordinates.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          style={styles.mapStyle}
          clusterColor={"#cbf3f7"}
          onPress={(e) => {
            fetchNearPoints(e.nativeEvent.coordinate);
          }}
          onRegionChangeComplete={(e) => {
            props.setDelta(e.latitudeDelta, e.longitudeDelta);
          }}
          om
        >
          {points.map((point, i) => (
            <Marker key={i} coordinate={point} image={personIcon} />
          ))}
        </MapView>
      </>
    </>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    zIndex: -1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 1.2,
  },
});

export default connect(mapStateToProps, {
  setDelta,
  loadingPoints,
  setLoadingStatus,
})(Maps);
