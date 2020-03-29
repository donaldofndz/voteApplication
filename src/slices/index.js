import { combineReducers } from "redux";

import apiRootReducer from "./apiRoot";
import questListReducer from "./questList";

const rootReducer = combineReducers({
  apiRoot: apiRootReducer,
  questList: questListReducer
});

export default rootReducer;
