import React from "react";
import { Redirect, Route } from "react-router";

function PrivateRoute({ isAuth, component: Component, ...restProps }) {
  // console.log(restProps);
  return (
    <Route
      {...restProps}
      render={(props) => {
        // console.log(props);
        return isAuth ? (
          restProps.role !== undefined ? (
            restProps.role(Component, props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

export default PrivateRoute;
