import axios from "axios";
import { decode } from "jsonwebtoken";
import { updateToken } from "../state/actions/tokenAction";
import {
  updateAuth,
  updateIsLoggedOut,
  updateUserInfo,
} from "../state/actions/userAction";
import store from "../state/store/store";

export const fetchToken = async () => {
  const token = localStorage.getItem("token");
  console.log("token", token);
  let response;
  try {
    response = await axios.get(
      "http://localhost:9001/api/v1/auth/token/refresh_token",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data.errorCode === "UNAUTHORIZED") {
      localStorage.clear();
      console.log("from token.js");
      store.dispatch(updateIsLoggedOut(true));
      return response.data.errorCode;
    }
    store.dispatch(updateToken(response.data.access_token));
    let { sub: userName, roles } = decode(response.data.access_token);
    store.dispatch(updateUserInfo({ userName, roles }));
    localStorage.setItem("token", response.data.refresh_token);
  } catch (error) {
    if (error.response.data.errorCode === "INTERNAL_SERVER_ERROR") {
      store.dispatch(updateAuth(false));
      //store.dispatch(updateIsLoggedOut(true));

      console.log(error);
    }
  }
  // axios
  //   .get("http://localhost:9001/api/v1/auth/token/refresh_token", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       //   Authorization:
  //       //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqZWVsYW5pMTIiLCJpc3MiOiJBVVRIX1NFUlZJQ0UiLCJleHAiOjE2MzcyMzE0OTF9.UR8zi8HxU2KGP4oYu6wui-aUi2Z2u3RMhMdhJEQJfiY",
  //     },
  //   })
  //   .then((response) => {
  //     console.log("displaying response");
  //     store.dispatch(updateToken(response.data.access_token));

  //     localStorage.setItem("token", response.data.refresh_token);
  //   });
  return response;
};
const refreshToken = () => {
  setInterval(() => {
    fetchToken();
    console.log("From setTimeout");
  }, 20000);
};
export default refreshToken;
