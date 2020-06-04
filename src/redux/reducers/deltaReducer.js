import { SET_DELTA } from "../actionTypes";

let initial_state = { latitudeDelta: 0.0922, longitudeDelta: 0.0421 };

export default (state = initial_state, action) => {
  //console.log(state);
  switch (action.type) {
    case SET_DELTA:
      return {
        latitudeDelta: action.payLoad.latitudeDelta,
        longitudeDelta: action.payLoad.longitudeDelta,
      };

    default:
      return state;
  }
};
