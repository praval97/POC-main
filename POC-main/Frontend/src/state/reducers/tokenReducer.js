import { UPDATE_TOKEN } from "../actions/types";

const INITIAL_STATE = {
  access_token: "",
};
export default function tokenReducer(state = INITIAL_STATE, action) {
  // console.log("from tokenReducer", state);
  // console.log("from tokenReducer", action);
  if (action.type === UPDATE_TOKEN) {
    return {
      ...state,
      access_token: action.payload,
    };
  }
  return state;
}
