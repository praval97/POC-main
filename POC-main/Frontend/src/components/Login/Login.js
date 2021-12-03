import { React, useState, useEffect } from "react";
import "./LoginStyles.css";
import { FaTimes, FaEyeSlash, FaEye } from "react-icons/fa";
import loginBg from "../../assets/images/login_bg.jpg";
import refreshToken, { timer_ID } from "../../api/token";
import store from "../../state/store/store";
import { updateAuth, updateUserInfo } from "../../state/actions/userAction";
import { decode } from "jsonwebtoken";
import { updateToken } from "../../state/actions/tokenAction";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passIcon, setPassIcon] = useState(false);
  // const [isEmpty, setIsEmpty] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({
    isError: false,
    isEmpty: false,
  });

  const handleCloseBtn = () => {
    // setIsError(false);
    // setIsEmpty(false);
    setErrors({
      isError: false,
      isEmpty: false,
    });
  };

  const handleSubmit = async (event) => {
    console.log("errorrrrrrrrrrr");
    event.preventDefault();
    // setIsEmpty(false);
    // setIsError(false);
    setErrors({
      isError: false,
      isEmpty: false,
    });

    if (userName !== "" && password !== "") {
      let credentials = {
        userName,
        password,
      };

      var formBody = [];

      for (var property in credentials) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(credentials[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      try {
        const data = await fetch("http://localhost:9001/api/v1/auth/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: formBody,
        });
        console.log(data);
        const result = await data.json();
        console.log("Success:", result);
        if (
          data.status === 200 &&
          result.hasOwnProperty("access_token") &&
          result.hasOwnProperty("refresh_token")
        ) {
          localStorage.setItem("token", result.refresh_token);
          let { sub: userName, roles } = decode(result.access_token);
          store.dispatch(updateToken(result.access_token));
          store.dispatch(updateAuth(true));
          store.dispatch(updateUserInfo({ userName, roles }));

          refreshToken();

          window.addEventListener("visibilitychange", () => {
            if (document.hidden) {
              clearInterval(timer_ID);
              console.log("timer_ID", timer_ID);
              console.log("Tab is inactive");
            } else {
              console.log("Tab is active");
              console.log("timer_ID", timer_ID);

              refreshToken();
            }
          });
          props.history.push({ pathname: "/" });
        } else if (
          data.status === 400 &&
          result.errorMessage === "bad credentials"
        ) {
          //setIsError(true);
          setErrors((prevState) => {
            return { ...prevState, isError: true };
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // setIsError(true);
      // setIsEmpty(true);
      setErrors({
        isError: true,
        isEmpty: true,
      });
    }
  };

  useEffect(() => {
    let clearIntervalId;
    if (errors.isError) {
      clearIntervalId = setTimeout(handleCloseBtn, 4000);
    }
    return () => clearInterval(clearIntervalId);
  }, [errors.isError]);

  return (
    <div className="container">
      <div className="image-container">
        <img className="login-bg" src={loginBg} alt="login"></img>
      </div>
      <div className="form-container">
        <form>
          <p className="form-control title">Sign in</p>
          <div className="form-control">
            <input
              type="text"
              name="UserName"
              value={userName}
              className="form-field userName"
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>
          <div className="form-control">
            <input
              type={!passIcon ? "password" : "text"}
              name="Password"
              value={password}
              className="form-field password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {password.length > 0 && (
              <i
                className="eye-icon"
                onClick={() => setPassIcon((prevState) => !prevState)}
              >
                {!passIcon ? <FaEyeSlash /> : <FaEye />}
              </i>
            )}
          </div>
          <div className="form-control">
            <input
              type="submit"
              value="Login"
              className="form-field submit-btn"
              onClick={handleSubmit}
            ></input>
          </div>
        </form>
        {errors.isError && (
          <div className="form-control error-message">
            <div className="content">
              {errors.isEmpty ? (
                <p>please enter username and password</p>
              ) : (
                <p>Invalid username or password!</p>
              )}
            </div>
            <div className="icon">
              <FaTimes onClick={handleCloseBtn} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
