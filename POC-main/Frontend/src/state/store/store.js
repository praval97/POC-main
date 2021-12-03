import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import {
  createStateSyncMiddleware,
  initStateWithPrevTab,
} from "redux-state-sync";
import { IS_LOGGEDOUT, UPDATE_TOKEN } from "../actions/types";

const config = {
  // TOGGLE_TODO will not be triggered in other tabs
  whitelist: [UPDATE_TOKEN, IS_LOGGEDOUT],
};
const INITIAL_STATE = {};
const middlewares = [thunk, createStateSyncMiddleware(config)];
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(...middlewares)
);
initStateWithPrevTab(store);
export default store;
