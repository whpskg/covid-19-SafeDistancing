import { LOADING_POINTS, SET_LOADING_STATUS } from "../actionTypes";

let initial_state = { fetching: false, failed: false, noPoints: false };

export default (state = initial_state, action) => {
  switch (action.type) {
    case LOADING_POINTS:
      return {
        ...state,
        fetching: action.payLoad.fetching,
      };

    case SET_LOADING_STATUS:
      return {
        ...state,
        failed: action.payLoad.failed,
        noPoints: action.payLoad.noPoints,
      };

    default:
      return state;
  }
};
