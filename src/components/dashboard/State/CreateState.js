import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import routeNames from "../../../routes/routeName";
import { Modes } from "../../common/Constants/Modes";
import { useLocation } from "react-router-dom";
import { MenuItem, Select, TextField } from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { DatePicker } from "antd";

const CreateState = ({ mode, stateData }) => {
  const location = useLocation();

  const [pageMode, setPageMode] = useState("create");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");
  const [stateName, setStateName] = useState("");
  const [stateError, setStateError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [updateby, setupdateby] = useState(0);
  const [formValid, setFormValid] = useState("");
  const jsonData = {
    updateby: "123",
  };

  // Convert the "updateby" field to an integer
  const updateByInt = parseInt(jsonData.updateby);

  if (isNaN(updateByInt)) {
    console.log("Error: Invalid value for 'updateby'");
  } else {
    console.log(`'updateby' as integer: ${updateByInt}`);
  }

  const [updateon, setupdateon] = useState(new Date()); // initialize with current date and time

  const jsonString = '{"isActive": true}';
  const jsonObject = JSON.parse(jsonString);

  console.log(jsonObject.isActive);

  const navigate = useNavigate();

  useEffect(() => {
    mode = location.state.mode;
    stateData = location.state.stateData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setCountry(stateData.country);
      setStateName(stateData.stateName);
      setIsActive(stateData.isActive);
      setipAddress(stateData.ipAddress);
      setupdateby(stateData.updateby);
      setupdateon(stateData.updateon);
    }
  }, []);
  useEffect(() => {
    handleChangeCountry();
  }, [country])
  const handleChangeCountry = () => {
    if (!country) return;
    if (country.length <= 3 || country.length >= 100) {
      setCountryError("country name must be between 3 letter to 100 letters");
      setFormValid(false)
    } else {
      setCountryError("");
      setFormValid(true)
    }
  }
  const handleChangeState = () => {
    if (!stateName) return;
    if (stateName.length <= 3 || stateName.length >= 150) {
      setStateError("state name must be between 3 letter to 150 letters");
      setFormValid(false)
    } else {
      setStateError("");
      setFormValid(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (country === "") {
      setCountryError("country Name is Required");
    } else if (country.length <= 3 || country.length >= 100) {
      setCountryError("country name must be between 3 letter to 100 letters");
    } else {
      setCountryError("");
    }
    if (stateName === "") {
      setStateError("State Name is Required");
    } else if (stateName.length <= 3 || stateName.length >= 150) {
      setStateError("state name must be between 3 letter to 150 letters");
    }
    else { setStateError(""); }


    if (formValid) {
      const payload = {
        country: country,
        stateName: stateName,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}State/SetState`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "State Saved Sucessfully", "success");

            navigate(routeNames.STATE);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["stateId"] = location.state.stateData.stateId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}State/UpdateState`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "State Updated Sucessfully", "success");
            navigate(routeNames.STATE);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };
  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} State</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Country
          </label>
          {countryError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{countryError}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
              setCountryError("")
              handleChangeCountry()
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            State Name
          </label>
          {stateError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{stateError}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={stateName}
            onChange={(e) => {
              setStateName(e.target.value);
              setStateError("");
              handleChangeState()
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="form-check">
          <input
            style={{
              marginLeft: 17,
              width: 20,
              height: 20
            }}
            class="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            value={isActive}
            id="defaultCheck1"
          />
          <label style={{ marginLeft: 46, paddingTop: 4 }} class="form-check-label" for="defaultCheck1">
            Is Active
          </label>
        </div>
        {/*<div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            ipAddress
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={ipAddress}
            onChange={(e) => setipAddress(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
          updateby
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={updateby}
            onChange={(e) => setupdateby(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
          updateon
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={updateon}
            onChange={(e) => setupdateon(e.target.value)}
          />
        </div> */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary A2"
        >
          {pageMode === Modes.create ? "Save" : "Update"}
        </button>
        &nbsp;
        <button class="btn btn-secondary me-md-5" type="button">
          <Link
            to={routeNames.STATE}
            style={{
              textDecoration: "none",
              color: "White",
              paddingBottom: "20px",
            }}
          >
            Cancel
          </Link>
        </button>
      </div>
    </div>
  );
};
export default CreateState;
