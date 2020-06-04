import { AsyncStorage } from "react-native";

const storeData = async (item) => {
  try {
    await AsyncStorage.setItem(item.key, item.value);
    //console.log("saved data in asyncstorage");
  } catch (e) {
    console.log(e);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.log(e);
  }
};

const removeData = async (key) => {
  try {
    const value = await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export default { storeData, getData, removeData };
