import { React, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty, isEmail } from "validator";
import store from "../../state/store/store";
import "./CreateUserStyles.css";

export default function CreateUser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rolesToUser, setRolesToUser] = useState([]);
  const [error, setError] = useState(false);
  const [inputErrors, setInputErrors] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    userName: "",
    password: "",
    rolesToUser: "",
  });
  // const unSubscribe = store.subscribe(() =>
  //   console.log("store changed", store.getState())
  // );
  const access_token = useSelector((state) => state.token.access_token);
  console.log("state access_token", access_token);
  const handleCheckBox = (event) => {
    let isChecked = event.target.checked;
    let selectedRole = event.target.value;

    if (isChecked) {
      setRolesToUser((prevState) => [...prevState, { roleName: selectedRole }]);
    } else {
      let newRoles = rolesToUser.filter(
        (role) => role.roleName !== selectedRole
      );
      setRolesToUser(newRoles);
    }
  };

  const handleInputError = (fieldName, msg) => {
    setInputErrors((prevState) => {
      return { ...prevState, [fieldName]: msg };
    });
  };

  const validateInputs = () => {
    let formError = false;

    if (!isEmpty(firstName)) {
      handleInputError("firstName", "");
    } else {
      handleInputError("firstName", "Enter fistName");
      formError = true;
    }

    if (!isEmpty(lastName)) {
      handleInputError("lastName", "");
    } else {
      handleInputError("lastName", "Enter lastName");
      formError = true;
    }

    if (!isEmpty(emailId)) {
      handleInputError("emailId", "");
      if (isEmail(emailId)) {
        handleInputError("");
      } else {
        handleInputError("emailId", "Enter Valid Email Address");
        formError = true;
      }
    } else {
      handleInputError("emailId", "Enter Email Id");
      formError = true;
    }

    if (!isEmpty(userName)) {
      handleInputError("userName", "");
      if (userName.match(/^[a-zA-Z]+[!@#$%*]?[0-9]+$/)) {
        handleInputError("userName", "");
      } else {
        handleInputError("userName", "Check username policy");
        formError = true;
      }
    } else {
      handleInputError("userName", "Enter username");
      formError = true;
    }

    if (!isEmpty(password)) {
      handleInputError("password", "");
      if (password.match(/^[A-Z]{1,2}[a-z]+[%+_!~-]{1,2}[0-9]+$/)) {
        handleInputError("password", "");
      } else {
        handleInputError("password", "Check password policy");
        formError = true;
      }
    } else {
      handleInputError("password", "Enter password");
      formError = true;
    }

    if (rolesToUser.length === 0) {
      handleInputError("rolesToUser", "Please select Roles");
      formError = true;
    } else {
      handleInputError("rolesToUser", "");
    }

    return formError;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      let credentials = {
        firstName,
        lastName,
        emailId,
        city,
        state,
        country,
        userName,
        password,
        rolesToUser,
      };

      try {
        const data = await fetch(
          "http://localhost:9001/api/v1/auth/user/save",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${access_token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );

        const result = await data.json();
        // console.log("Success:", result);
        if (data.status === 201) {
          // props.history.push({ pathname: "/" });
          console.log("Success:", result);
        } else if (data.status === 302) {
          if (result.errorMessage === "username already exist") {
            handleInputError("userName", "Username already taken");
          } else if (result.errorMessage === "emailId already exist") {
            handleInputError("emailId", "emailId already exist");
          }
          setError(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="register-container">
      <div className="register-f-container">
        <form>
          <p>Register</p>
          <div className="register-form-container">
            <input
              className="register-input-field"
              type="text"
              name="FirstName"
              value={firstName}
              placeholder="firstname"
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            ></input>
            {error &&
              (inputErrors.firstName.length > 0 ? (
                <p>{inputErrors.firstName}</p>
              ) : (
                ""
              ))}
            <input
              className="register-input-field"
              type="text"
              name="LastName"
              value={lastName}
              placeholder="lastname"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            {error &&
              (inputErrors.lastName.length > 0 ? (
                <p>{inputErrors.lastName}</p>
              ) : (
                ""
              ))}
            <input
              className="register-input-field"
              type="email"
              name="EmailId"
              value={emailId}
              placeholder="emailid"
              onChange={(e) => setEmailId(e.target.value)}
            ></input>
            {error &&
              (inputErrors.emailId.length > 0 ? (
                <p>{inputErrors.emailId}</p>
              ) : (
                ""
              ))}
            <input
              className="register-input-field"
              type="text"
              name="City"
              value={city}
              placeholder="city"
              onChange={(e) => setCity(e.target.value)}
            ></input>
            <input
              className="register-input-field"
              type="text"
              name="State"
              value={state}
              placeholder="state"
              onChange={(e) => setState(e.target.value)}
            ></input>
            <input
              className="register-input-field"
              type="text"
              name="country"
              value={country}
              placeholder="country"
              onChange={(e) => setCountry(e.target.value)}
            ></input>
            <br></br>
            <input
              className="register-input-field"
              type="text"
              name="UserName"
              value={userName}
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
            {error &&
              (inputErrors.userName.length > 0 ? (
                <p>{inputErrors.userName}</p>
              ) : (
                ""
              ))}
            <input
              className="register-input-field"
              type="password"
              name="Password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {error &&
              (inputErrors.password.length > 0 ? (
                <p>{inputErrors.password}</p>
              ) : (
                ""
              ))}
            <br></br>
            <input
              className="register-input-field"
              type="checkbox"
              name="ROLE_ADMIN"
              id="admin"
              value="admin"
              onClick={handleCheckBox}
            ></input>
            Admin
            <input
              className="register-input-field"
              type="checkbox"
              name="ROLE_USER"
              id="user"
              value="user"
              onClick={handleCheckBox}
            ></input>
            User
            {error &&
              (inputErrors.rolesToUser.length > 0 ? (
                <p>{inputErrors.rolesToUser}</p>
              ) : (
                ""
              ))}
            <br></br>
            <input
              type="submit"
              value="submit"
              onClick={handleSubmit}
              className="register-input-field"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
