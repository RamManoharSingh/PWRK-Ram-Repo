import { React } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation, useParams } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { Alert } from "react-bootstrap";
import { red } from "@mui/material/colors";
import validator from "validator";

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [userID, setUserID] = useState("");
  const routPrams = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [PasswordResetKey, setPasswordResetKey] = useState("");
  const [passwordShown1, setPasswordShown1] = useState(true);
  // handle button click of login form
  const handlePassword = async (e) => {
    e.preventDefault();
    let payload = {
      Password: password,
      UserID: Number.parseInt(routPrams.userId),
      PasswordResetKey: routPrams.resetKey,
    };
    console.log(routPrams);
    let result = await axios
      .post("http://122.176.101.76:8081/Api/Account/ResetPassword", payload)
      .then((res) => {
        console.log("out-------", res.data);
        if (typeof res.data == "string") {
          if (res.data === "Password updated successfully") {
            setSuccessMessage(res.data);
            setTimeout(() => {
              navigate(routeNames.LOGIN);
            }, 2000);
          } else setError(res.data);
        }
        if (res.data && res.data.token) {
          let token = res.data.token;
          localStorage.setItem("token", token);
          navigate("/");
        }
      })
      .catch((err) => {
        //setError(err.message);
      });
  };

  useEffect(() => {
    console.log(routPrams, "my props");
  }, []);

  const checkcnf = (value) => {
    console.log(value);
    console.log(password);
    if (value === "") {
      setErrorMessage("");
    } else if (password !== value) {
      setErrorMessage("Password and Confirm Password should match!");
    } else if (password === value) {
      console.log("object");
      setErrorMessage("");
    }
  };

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Is Strong Password");
    } else {
      if (value === "") {
        setErrorMessage("");
      } else {
        setErrorMessage(
          "Is Not Strong Password(Must contain min 8 letter,Upper letter,any Symbol,Number)"
        );
      }
    }
  };

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  return (
    <div className="Auth-form-container2">
      <form
        className="Auth-form"
        onSubmit={(e) => {
          handlePassword(e);
        }}
      >
        <div className="Auth-form-content2">
          <h3 className="Auth-form-title">Reset Password</h3>
          {error !== "" ? (
            <Alert key={"danger"} variant={"danger"}>
              {error}
            </Alert>
          ) : errorMessage !== "" ? (
            <Alert key={"danger"} variant={"danger"}>
              {errorMessage}
            </Alert>
          ) : (
            <div></div>
          )}

          {successMessage !== "" ? (
            <Alert key={"danger"} variant={"success"}>
              {successMessage}
            </Alert>
          ) : (
            <div></div>
          )}

          <div className="form-group mt-3">
            <label>New Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                setPassword(e.target.value);
                validate(e.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type={passwordShown1 ? "password" : "text"}
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => {
                setCnfPassword(e.target.value);
                checkcnf(e.target.value);
              }}
            />
            <input type="checkbox" id="topping" onClick={togglePassword1} />
            Show Password
          </div>

          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={(e) => handlePassword(e)}
            >
              Save New Password
            </button>
            {errorMessage === "" || errorMessage === "Is Strong Password" ? (
              <span
                style={{
                  fontWeight: "bold",
                  color: "green",
                }}
              >
                {errorMessage}
              </span>
            ) : (
              <span
                style={{
                  fontWeight: "bold",
                  color: "red",
                }}
              >
                {errorMessage}
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
