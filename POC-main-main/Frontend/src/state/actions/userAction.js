import { IS_LOGGEDOUT, UPDATE_AUTH } from "./types";

export const updateAuth = (isAuth) => {
  return {
    type: UPDATE_AUTH,
    payload: isAuth,
  };
};

export const updateIsLoggedOut = (isLoggedOut) => {
  return {
    type: IS_LOGGEDOUT,
    payload: isLoggedOut,
  };
};
