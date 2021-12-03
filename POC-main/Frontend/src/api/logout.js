import axios from "axios";
import { useHistory } from "react-router";
import { updateAuth, updateIsLoggedOut } from "../state/actions/userAction";
import store from "../state/store/store";

const logout = async () => {
  store.dispatch(updateAuth(false));
  try {
    await axios.post(
      "http://localhost:9001/api/v1/auth/logout",
      {
        userName: "praval123",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    // setTimeout(() => {
    localStorage.clear();
    store.dispatch(updateIsLoggedOut(true));
    //window.location.href = "/login";

    // }, 5000);
    // console.log(response);

    // window.location.reload();
  } catch (e) {
    window.location.href = "/login";
    console.log(e);
  }
};

export default logout;
