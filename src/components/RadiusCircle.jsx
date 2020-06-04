import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Dimensions, Animated } from "react-native";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  radius: state.radiusReducer.radius,
  color: state.radiusReducer.color,
  deltaLon: state.deltaReducer.longitudeDelta,
  radiusChangeFinished: state.radiusReducer.changeFinished,
});

function RadiusCircle(props) {
  const [hide, setHide] = useState(true);
  const [timeOutId, setTimeOutId] = useState("");
  const [fadeValue, setFadeValue] = useState(new Animated.Value(1));

  useEffect(() => {
    if (!props.radiusChangeFinished) {
      setFadeValue(new Animated.Value(1));
      clearTimeout(timeOutId);
      setHide(props.radiusChangeFinished);
    } else {
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 1000,
      }).start();
      let id = setTimeout(() => {
        setHide(props.radiusChangeFinished);
      }, 1000);
      setTimeOutId(id);
    }
  }, [props.radiusChangeFinished]);

  let circleSize = (screenWidth * props.radius) / (props.deltaLon * 111 * 1000);
  let leftPositon = (screenWidth - circleSize) / 2;
  const styles = StyleSheet.create({
    circle: {
      backgroundColor: "rgba(201, 201, 201,0.4)",
      position: "absolute",
      left: leftPositon,
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize,
      borderColor: props.color,
      borderWidth: 1,
    },
  });
  return (
    <>
      {!hide && (
        <Animated.View style={{ ...styles.circle, opacity: fadeValue }} />
      )}
    </>
  );
}

const screenWidth = Dimensions.get("window").width;

export default connect(mapStateToProps)(RadiusCircle);
