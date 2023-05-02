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

const CreateTitle = ({ mode, ddoData }) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [ddoType, setDdoType] = useState("");
  // const [ddoTypeError, setDdoTypeError] = useState("");
  const [ddoTypeId, setDdoTypeId] = useState(0);
  const [ddoTypeError, setDdoTypeError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [ipAddressError, setIpaddressError] = useState("");
  const [formValid, setFormValid] = useState("");
  const [updateby, setupdateby] = useState(0);

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
    ddoData = location.state.ddoData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setDdoTypeId(ddoData.ddoTypeId);
      setDdoType(ddoData.ddoType);
      setIsActive(ddoData.isActive);
      setipAddress(ddoData.ipAddress);
      setupdateby(ddoData.updateby);
      setupdateon(ddoData.updateon);
    }
  }, []);

  useEffect(() => {
    handleChangeDDoType();
  }, [ddoType])
  const handleChangeDDoType = () => {
    if (!ddoType) return;
    if (ddoType.length >= 50) {
      setDdoTypeError("ddo type does no more the 50 letters");
      setFormValid(false)
    } else {
      setDdoTypeError("");
      setFormValid(true)
    }
  }




  const handleSubmit = (e) => {
    e.preventDefault();

    if (ddoType === "") {
      setDdoTypeError("DdoType is Required");
    } else if (ddoType.length >= 50) {
      setDdoTypeError("ddo type does no more the 50 letters");
    }
    else {
      setDdoTypeError("");
    }

    if (formValid) {
      const payload = {
        ddoTypeId: ddoTypeId,
        ddotype: ddoType,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: "0",
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}DDOType/SetDDOType`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "ddoType Saved Sucessfully", "success");

            navigate(routeNames.DDOTYPE);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["ddoTypeId"] = location.state.ddoData.ddoTypeId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}DDOType/UpdateDDOType`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "ddoType Updated Sucessfully", "success");
            navigate(routeNames.DDOTYPE);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} DDO Type</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            DDO Type
          </label>
          {ddoTypeError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{ddoTypeError}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={ddoType}
            onChange={(e) => {
              setDdoType(e.target.value);
              setDdoTypeError("");
              handleChangeDDoType()
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
            IsActive
          </label>
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
            to={routeNames.DDOTYPE}
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
