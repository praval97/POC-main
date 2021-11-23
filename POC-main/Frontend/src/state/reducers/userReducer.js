import { IS_LOGGEDOUT, UPDATE_AUTH } from "../actions/types";

const INITIAL_STATE = {
  isAuth: false,
  isLoggedOut: false,
};
export default function userReducer(state = INITIAL_STATE, action) {
  console.log("from userReducer", state);
  console.log("from userReducer", action);
  if (action.type === UPDATE_AUTH) {
    return {
      ...state,
      isAuth: action.payload,
    };
  }
  if (action.type === IS_LOGGEDOUT) {
    return {
      ...state,
      isLoggedOut: action.payload,
    };
  }
  return state;
}
