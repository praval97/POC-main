import React from "react";
import store from "../../state/store/store";

const Authorization = (allowedRoles) => (Component, props) => {
  let userRoles = store.getState().user.roles;
  console.log("Authorizing user");
  console.log(allowedRoles);
  console.log(userRoles.some((role) => allowedRoles.includes(role)));
  if (userRoles.some((role) => allowedRoles.includes(role))) {
    return <Component {...props} />;
  }
  return <h1>Not Authorized</h1>;
};
export default Authorization;
