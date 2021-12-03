import { IS_LOGGEDOUT, UPDATE_AUTH, UPDATE_USERINFO } from "./types";

export const updateAuth = (isAuth) => {
  // console.log("From userAction updateAuth");
  return {
    type: UPDATE_AUTH,
    payload: isAuth,
  };
};

export const updateIsLoggedOut = (isLoggedOut) => {
  // console.log("From userAction updateIsLoggedOut");
  return {
    type: IS_LOGGEDOUT,
    payload: isLoggedOut,
  };
};

export const updateUserInfo = (userInfo) => {
  // console.log("From userAction updateUserInfo");
  return {
    type: UPDATE_USERINFO,
    payload: userInfo,
  };
};
