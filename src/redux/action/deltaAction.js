import { SET_DELTA } from "../actionTypes";

export const setDelta = (latitudeDelta, longitudeDelta) => ({
  type: SET_DELTA,
  payLoad: {
    latitudeDelta,
    longitudeDelta,
  },
});
