import React, { useState, useEffect, useRef } from "react";
import {
  Slider,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from "react-native";

import { connect } from "react-redux";
import { setRadius, radiusOnChange } from "../redux/action/radiusAction";

//import Slider from "@react-native-community/slider";

const mapStateToProps = (state) => ({
  radius: state.radiusReducer.radius,
  color: state.radiusReducer.color,
});

function RadiusSlider(props) {
  const initialRadius = 2;

  return (
    <>
      <Slider
        minimumValue={0}
        maximumValue={5000}
        step={1}
        value={initialRadius}
        onValueChange={(value) => props.setRadius(value)}
        style={styles.slider}
        thumbTintColor={props.color}
        minimumTrackTintColor={props.color}
        onTouchMove={() => {
          props.radiusOnChange(false);
        }}
        onSlidingComplete={() => {
          props.radiusOnChange(true);
        }}
      />
    </>
  );
}

const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  slider: {
    color: "red",
    position: "absolute",
    width: "50%",
    left: 0,
    bottom: "4%",

    // marginTop: height * 0.57,
    // width: height * 0.67,
    //transform: [{ rotateZ: "-90deg" }],
    //marginLeft: 125,
  },
});

export default connect(mapStateToProps, { setRadius, radiusOnChange })(
  RadiusSlider
);
