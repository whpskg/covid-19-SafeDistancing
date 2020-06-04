import { LOADING_POINTS, SET_LOADING_STATUS } from "../actionTypes";

export const loadingPoints = (fetching) => ({
  type: LOADING_POINTS,
  payLoad: {
    fetching,
  },
});

export const setLoadingStatus = (failed, noPoints) => ({
  type: SET_LOADING_STATUS,
  payLoad: {
    failed,
    noPoints,
  },
});
