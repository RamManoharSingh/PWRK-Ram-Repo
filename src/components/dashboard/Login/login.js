import { React } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { Alert } from "react-bootstrap";
import { red } from "@mui/material/colors";
import Password from "antd/es/input/Password";
import { header } from "../../common/Header/header";

import Captcha from "../Captcha/Captcha";

const Login = (props) => {
  const [captcha, setCaptcha] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const [passwordShown, setPasswordShown] = useState(true);
  const [loading, setLoading] = useState(false);
  let captchaVerified;
  const navigate = useNavigate();
  console.log(captcha);
  // handle button click of login form
  const handleLogin = async (e) => {
    e.preventDefault();
    let payload = {
      emailID: email,
      password: password,
    };

    if (validateEmail(email) && password != "" && captchaVerified) {
      let result = await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}Account/SingIn`, payload)
        .then((res) => {
          console.log("out-------", res.data);
          console.log(res.data.message);
          if (res.data.message != "") {
            setError(res.data.message);
          } else {
          }

          if (res.data && res.data.token) {
            let token = res.data.token;
            let userId = res.data.userID;
            localStorage.setItem("token", token);
            localStorage.setItem("UserId", userId);
            // navigate("/");
            navigate(routeNames.DASHBOARD)
          }
        })
        .catch((err) => {
          // setError(err.message);
        });
    } else {
      if (email != "") {
        if (validateEmail(email) == null) {
          setError("Please Enter Valid Email Address");
        } else if (password === "") {
          setError("Please Enter your Password");
        } else if (!captchaVerified) {
          setError("Please Verify Captcha");
        }
      } else {
        setError("Please Enter Email and Password");
      }
    }
    // else if (email == "") {
    //   alert("plase Enter your Email ");
    // } else {
    //   alert("Please Enter A Valid Email ");
    // }
  };

  const getCapchaVerified = (isVerified) => {
    console.log(isVerified, "verified function");
    captchaVerified = isVerified;
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="Auth-form-container" style={{ marginTop: "-37px" }}>
      <header />
      <form
        className="Auth-form"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Log In</h3>
          {error !== "" ? (
            <Alert key={"danger"} variant={"danger"}>
              {error}
            </Alert>
          ) : (
            <div></div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              style={{ width: 324 }}
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type={passwordShown ? "password" : "text"}
              style={{ width: 324 }}
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="checkbox"
              style={{ margin: 9 }}
              id="topping"
              onClick={togglePassword}
            />
            Show Password
          </div>
          <label>Captcha</label>
          <div className="form-group ">
            <Captcha
              userCaptcha={captcha}
              setUserCaptcha={setCaptcha}
              getCapchaVerified={getCapchaVerified}
            />
          </div>
          {/* <Hcaptcha />  */}
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={(e) => handleLogin(e)}>
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <Link to={routeNames.FORGOTPASSWORD}> Forgot password?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
