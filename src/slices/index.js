import { combineReducers } from "redux";

import apiRootReducer from "./apiRoot";
import questListReducer from "./questList";
import questReducer from "./quest";

const rootReducer = combineReducers({
  apiRoot: apiRootReducer,
  questList: questListReducer,
  quest: questReducer,
});

export default rootReducer;
