import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";

export default function Toggle() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const Stores = ["store1", "store2", "store3"];

  return (
    <>
      <Switch
        style={styles.toggleStyle}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => {
          toggleSwitch();

          !isEnabled && setModalVisible(true);
        }}
        value={isEnabled}
      />
      <Text style={styles.toggleMsgStyle}>
        Toggle {isEnabled ? "off" : "on"} to Check {isEnabled ? "out" : "in"}{" "}
        the store
      </Text>

      {/* modal view */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalView}>
          <Text>Please select store you are going</Text>
          {Stores.map((element, i) => {
            return (
              <TouchableHighlight
                key={i}
                style={styles.storeButton}
                onPress={() => {
                  setModalVisible(false);
                }}
                underlayColor="white"
              >
                <Text>{element}</Text>
              </TouchableHighlight>
            );
          })}

          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              toggleSwitch();
            }}
          >
            <Text>X</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  toggleStyle: {
    position: "absolute",
    top: "10%",
    left: "10%",
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
  },
  toggleMsgStyle: {
    position: "absolute",
    top: "15%",
    left: "10%",
  },

  modalView: {
    position: "absolute",
    width: "96%",
    bottom: "1%",
    left: "2%",
    backgroundColor: "white",
    opacity: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  storeButton: {
    backgroundColor: "grey",
    marginBottom: 6,
    width: "40%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
  },
  // openButton: {
  //   position: "absolute",
  //   top: "100%",
  //   backgroundColor: "#F194FF",
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center",
  // },
});
