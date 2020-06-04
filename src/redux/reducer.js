import { combineReducers } from "redux";

import radiusReducer from "./reducers/radiusReducer";
import deltaReducer from "./reducers/deltaReducer";
import loadingReducer from "./reducers/loadingReducer";

export default combineReducers({
  radiusReducer,
  deltaReducer,
  loadingReducer,
});
