import { combineReducers } from "redux";

import apiRootReducer from "./apiRoot";

const rootReducer = combineReducers({
  apiRoot: apiRootReducer
});

export default rootReducer;
