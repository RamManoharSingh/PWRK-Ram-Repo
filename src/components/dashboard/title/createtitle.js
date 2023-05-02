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

const CreateTitle = ({ mode, titleData }) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [titleId, setTitleId] = useState(0);
  const [titleName, setTitleName] = useState("");
  //    officeTypeId = parseInt(jsonObject.officeTypeId);
  const [titleNameError, setTitleNameError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [ipAddressErorr, setipAddressError] = useState("");
  const [updateby, setupdateby] = useState(0);
  const [formValid, setFormValid] = useState(false);
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
    titleData = location.state.titleData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setTitleId(titleData.titleId);
      setTitleName(titleData.titleName);
      setIsActive(titleData.isActive);
      setipAddress(titleData.ipAddress);
      setupdateby(titleData.updateby);
      setupdateon(titleData.updateon);
    }
  }, []);
  useEffect(() => {
    handleChangeTitleName();
  }, [titleName])
  const handleChangeTitleName = () => {
    if (!titleName) return;
    if (titleName.length > 50) {
      setTitleNameError("Designation Name must be between 50 words");
      setFormValid(false)
    } else {
      setTitleNameError("");
      setFormValid(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (titleName === "") {
      setTitleNameError("Title is Required");
    }
    else if (titleName.length > 50) {
      setTitleNameError("Designation Name must be between 50 words");
    } else

      if (ipAddress === "") {
        setipAddressError("IP Address is Required");
      } else {
        setipAddressError("");
      }

    if (formValid) {
      const payload = {
        titleId: titleId,
        titleName: titleName,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Title/SetTitle`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Saved Sucessfully", "success");

            navigate(routeNames.TITLE);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["titleId"] = location.state.titleData.titleId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Title/SetTitle`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Updated Sucessfully", "success");
            navigate(routeNames.TITLE);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Title</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Title
          </label>
          {titleNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleNameError}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={titleName}
            onChange={(e) => {
              setTitleName(e.target.value);
              setTitleNameError("");
              handleChangeTitleName()
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
            onChange={(e) => {
              setIsActive(e.target.checked);

            }}
            value={isActive}
            id="defaultCheck1"
          />
          <label style={{ marginLeft: 46, paddingTop: 4 }} class="form-check-label" for="defaultCheck1">
            IsActive
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

        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            IP Address
          </label>
          {ipAddressErorr && (
            <p style={{ color: "red", fontSize: "15px" }}>*{ipAddressErorr}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={ipAddress}
            onChange={(e) => {
              setipAddress(e.target.value);
              setipAddressError("");

            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>

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
            to={routeNames.TITLE}
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
export default CreateTitle;
