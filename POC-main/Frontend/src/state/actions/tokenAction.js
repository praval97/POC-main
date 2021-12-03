import { UPDATE_TOKEN } from "./types";

export const updateToken = (token) => {
  // console.log("From updateToken", token);
  return {
    type: UPDATE_TOKEN,
    payload: token,
  };
};
