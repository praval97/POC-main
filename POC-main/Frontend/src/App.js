import { Switch, Route, Redirect } from "react-router-dom";
import { Home, Login, Navbar, PrivateRoute, CreateUser } from "./components";
import { useEffect, useState } from "react";
import refreshToken, { fetchToken, timer_ID } from "./api/token";
import { useSelector } from "react-redux";
import { updateAuth } from "./state/actions/userAction";
import store from "./state/store/store";
import { decode } from "jsonwebtoken";
import { ADMIN } from "./service/Authorization/roles";

function App() {
  const { isAuth, isLoggedOut } = useSelector((state) => state.user);

  useEffect(() => {
    (async () => {
      const getToken = localStorage.getItem("token");

      if (getToken && getToken !== undefined) {
        let token = decode(getToken);
        if (token && token.iss === "AUTH_SERVICE") {
          const response = await fetchToken();
          console.log("response", response);
          if (response !== "UNAUTHORIZED") {
            store.dispatch(updateAuth(true));

            refreshToken();

            window.addEventListener("visibilitychange", () => {
              if (document.hidden) {
                clearInterval(timer_ID);
                console.log("Tab is inactive");
              } else {
                console.log("Tab is active");
                console.log("timer_ID", timer_ID);

                refreshToken();
              }
            });
          }
          console.log("app file");
          console.log("response", response);
        }
      }
    })();
  }, []);
  if (isLoggedOut) {
    window.location.href = "/login";
    return null;
  }
  if (!isAuth && localStorage.getItem("token") && !isLoggedOut) {
    console.log("Loading Component");
    return <div>Loading...</div>;
  }
  return (
    // All the components we need place here
    // We need to wrap all our elements or components inside one div
    <>
      {isAuth && <Navbar />}

      <Switch>
        {/* <Route path="/login" component={Login} /> */}
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuth ? <Login {...props} /> : <Redirect to="/" />
          }
        />
        <PrivateRoute exact path="/" component={Home} isAuth={isAuth} />
        <PrivateRoute
          exact
          path="/register"
          component={CreateUser}
          isAuth={isAuth}
          role={ADMIN}
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
