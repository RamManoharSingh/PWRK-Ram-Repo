import "bootstrap/dist/css/bootstrap.min.css";
// import captchaImg from './captcha.jpg';
// import studentIMG from './2.png';
import React, { useState, useEffect } from "react";
function Captcha(props) {
  const [user, setUser] = useState({
    username: "",
  });

  const characters = "abc123";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const captcha = generateString(6); // Function called here and save in captcha variable
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);
    console.log(user);
  };
  const onSubmit = (e) => {
    var element = document.getElementById("succesBTN");
    var inputData = document.getElementById("inputType");
    element.style.cursor = "wait";
    element.innerHTML = "Checking...";
    inputData.disabled = true;
    element.disabled = true;
    console.log(props);
    if (captcha == user.username) {
      props.getCapchaVerified(true);
      element.style.backgroundColor = "green";
      element.innerHTML = "Captcha Verified";
      element.disabled = true;
      element.style.cursor = "not-allowed";
      inputData.style.display = "none";
      captcha.innerHTML = "";
    } else {
      element.style.backgroundColor = "red";
      element.style.cursor = "not-allowed";
      element.innerHTML = "Not Matched";
      element.disabled = true;
      //  element.disabled = true;
      var myFunction = function () {
        element.style.backgroundColor = "#007bff";
        element.style.cursor = "pointer";
        element.innerHTML = "Verify Captcha";
        element.disabled = false;
        inputData.disabled = false;
        inputData.value = "sssss";
      };
      props.getCapchaVerified(false);
      setTimeout(myFunction, 3000);
    }
  };

  return (
    <div class="container" style={{ paddingTop: "0px" }}>
      {/* <h4 className="text-center mt-4 text-info"><b> Validate Captcha using REACT JS</b></h4> */}
      <div class="row mt-4">
        <div class="col-md-4"></div>

        <div class="col-md-8" style={{ marginLeft: "1px" }}>
          <h4
            id="captcha"
            style={{
              marginTop: "0px",
              marginLeft: "160px",
              position: "absolute",
            }}
          >
            {captcha}
          </h4>

          {/* <div class="form-group row">
              <img src={studentIMG} className="mt-3 mb-3" height="90"/> <span class="font-weight-bold ml-3"  style={{ marginTop:"50px"}} >Mariah Benchos</span>
            </div> */}
          {/* <div class="form-group row">
              <img src={captchaImg} className="mt-3 mb-3" height="50"/> 
            </div> */}
          <div class="form-group row">
            <input
              type="text"
              id="inputType"
              className="form-control"
              placeholder="Enter Captcha"
              name="username"
              onChange={handleChange}
              autocomplete="off"
              style={{
                width: "80%",
                marginLeft: "0px",
                marginBottom: "10px",
              }}
            />
            <button
              type="button"
              id="succesBTN"
              onClick={onSubmit}
              class="btn btn-primary  btn-sm "
              style={{ width: "124px" }}
            >
              Verify Captcha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Captcha;
