import React, { useEffect, useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  fetching: state.loadingReducer.fetching,
  failed: state.loadingReducer.failed,
  noPoints: state.loadingReducer.noPoints,
});

function LoadingScreen(props) {
  const [timeoutID, setTimeoutID] = useState("");
  const [statusText, setStatusText] = useState("");
  let TextUI = (props) => (
    <Text
      style={{
        position: "absolute",
        alignSelf: "center",
        fontSize: 15,
      }}
    >
      {props.statusText}
    </Text>
  );
  useEffect(() => {
    clearTimeout(timeoutID);
    if (!props.fetching && props.noPoints) {
      setStatusText("nice, looks we don't have someone here");
    } else if (!props.fetching && props.failed) {
      setStatusText("oops, looks like loading failed, try again!");
    }
    setTimeoutID(
      setTimeout(() => {
        setStatusText("");
      }, 1000)
    );
  }, [props.fetching]);

  return (
    <>
      {props.fetching && (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
      <TextUI statusText={statusText} />
    </>
  );
}

// function AfterLoadText(props) {
//   const [animFinised, setanimfinished] = useState(true);
//   const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
//   const animDuration = 1000;

//   useEffect(() => {
//     //setFadeAnim(new Animated.Value(1))
//     console.log(props);
//     //!props.fetching && console.log("triggered");
//   }, [props]);

//   return animFinised ? (
//     <></>
//   ) : (
//     <Animated.View
//       style={[
//         styles.fadingContainer,
//         {
//           opacity: fadeAnim, // Bind opacity to animated value
//         },
//       ]}
//     >
//       <Text>test</Text>
//     </Animated.View>
//   );
// }

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "grey",
    opacity: 0.3,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default connect(mapStateToProps)(LoadingScreen);
