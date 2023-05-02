import { React } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import routeNames from "../../../routes/routeName";
import { Alert } from "react-bootstrap";
import { red } from "@mui/material/colors";
import Password from "antd/es/input/Password";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const [passwordShown, setPasswordShown] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handle button click of login form
  const handleSignUp = async (e) => {
    e.preventDefault();

    let payload = {
      emailID: email,
      password: password,
      mobileNo1: mobile,
      userName: "UserName",
      roleId: 2,
    };
    console.log(payload);
    if (validateEmail(email) && password != "" && mobile != "") {
      let result = await axios
        .post(`${process.env.REACT_APP_API_BASE_URL}Account/SignUp`, payload)
        .then((res) => {
          console.log("out-------", res.data);
          console.log(res.data.message);
          if (res.data.message != "") {
            setError(res.data.message);
          }

          Swal.fire("Save", "SignUp Successfull", "success");
          navigate(routeNames.LOGIN);
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

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  //   const handleMobile = (e) => {
  //     if (mobile.length < 11) {
  //       console.log(mobile.length);
  //       setMobile(e.target.value);
  //       console.log(e.target.value);
  //     } else {
  //       return;
  //     }
  //   };
  return (
    <div className="Auth-form-container">
      <form
        className="Auth-form"
        onSubmit={(e) => {
          handleSignUp(e);
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
              style={{width:324}}
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Mobile</label>
            <input
              type="number"
              style={{width:324}}
              className="form-control mt-1"
              placeholder="Enter Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type={passwordShown ? "password" : "text"}
              style={{width:324}}
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
          <div className="d-grid gap-2 mt-3">
            <button
              className="btn btn-primary"
              onClick={(e) => handleSignUp(e)}
            >
              SignUp
            </button>
          </div>
          {/* <p className="forgot-password text-right mt-2">
            <Link to={routeNames.FORGOTPASSWORD}> Forgot password?</Link>
          </p> */}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
