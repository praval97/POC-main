import Login from "./components/Login/Login";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateUser from "./components/Navbar/CreateUser";
import { useEffect, useState } from "react";
import refreshToken, { fetchToken } from "./utils/token/token";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useSelector } from "react-redux";
import { updateAuth } from "./state/actions/userAction";
import store from "./state/store/store";
import { decode } from "jsonwebtoken";

function App() {
  const { isAuth, isLoggedOut } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchDataAndCheckAuth = async () => {
      const getToken = localStorage.getItem("token");

      if (getToken && getToken !== undefined) {
        let token = decode(getToken);
        if (token && token.iss === "AUTH_SERVICE") {
          const response = await fetchToken();
          if (response !== "UNAUTHORIZED") store.dispatch(updateAuth(true));
        }
      } else {
      }
    };
    fetchDataAndCheckAuth();
  }, []);
  if (!isAuth && localStorage.getItem("token") && !isLoggedOut) {
    return <div>Loading...</div>;
  }
  return (
    // All the components we need place here
    // We need to wrap all our elements or components inside one div
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Home} isAuth={isAuth} />
        <PrivateRoute
          exact
          path="/register"
          component={CreateUser}
          isAuth={isAuth}
        />
        {/* <Home />
        </Route> */}

        {/* <Login />
        </Route> */}
      </Switch>
    </>
  );
}

export default App;
