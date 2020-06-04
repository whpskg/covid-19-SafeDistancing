import { SET_RADIUS, RADIUS_ONCHANG } from "../actionTypes";

export const setRadius = (radius) => ({
  type: SET_RADIUS,
  payLoad: {
    radius,
  },
});

export const radiusOnChange = (changeFinished) => ({
  type: RADIUS_ONCHANG,
  payLoad: {
    changeFinished,
  },
});
