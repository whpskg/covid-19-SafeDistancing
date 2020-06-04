import { SET_RADIUS, RADIUS_ONCHANG } from "../actionTypes";
import gradientColors from "../../../assets/gradientColors";

let initial_state = {
  radius: 1,
  color: gradientColors[0],
  changeFinished: true,
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case SET_RADIUS:
      const radius = action.payLoad.radius;

      return {
        ...state,
        radius: radius,
        color: gradientColors[Math.round(radius / 50) - 1], // denominator dependes on scale of radius
      };
    case RADIUS_ONCHANG:
      return {
        ...state,
        changeFinished: action.payLoad.changeFinished,
      };

    default:
      return state;
  }
};
