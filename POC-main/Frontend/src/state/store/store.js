import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const INITIAL_STATE = {};
const middlewares = [thunk];
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  applyMiddleware(...middlewares)
);

export default store;
