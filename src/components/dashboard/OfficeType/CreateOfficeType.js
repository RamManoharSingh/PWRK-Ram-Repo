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

const CreateOfficeType = ({ mode, setCreationState, officeTypeData }) => {
  const location = useLocation();


  const [pageMode, setPageMode] = useState("create");
  const [officeTypeId, setofficeTypeId] = useState("");
  const [officeTypeError, setOfficeTypeError] = useState("");
  const [officeTypeName, setofficeTypeName] = useState("");
  const [officeTypeNameError, setOfficeTypeNameError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [officeTypeNameShort, setofficeTypeNameShort] = useState("");
  const [officeTypeNameShortError, setOfficeTypeNameShortError] = useState("");

  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [ipAddressError, setIpAddressError] = useState("");
  const [updateby, setupdateby] = useState(0);
  const [formValid, setFormValid] = useState(0);
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
    officeTypeData = location.state.officeTypeData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setofficeTypeId(officeTypeData.officeTypeId);
      setofficeTypeName(officeTypeData.officeTypeName);
      setofficeTypeNameShort(officeTypeData.officeTypeNameShort);
      //   setdesignationOrderId(officeTypeData.designationOrderId);
      setIsActive(officeTypeData.isActive);
      setipAddress(officeTypeData.ipAddress);
      setupdateby(officeTypeData.updateby);
      setupdateon(officeTypeData.updateon);
    }
  }, []);
  useEffect(() => {
    handleChangeOfficeTypeName();
  }, [officeTypeName])
  const handleChangeOfficeTypeName = () => {
    if (!officeTypeName) return;
    if (officeTypeName.length < 3 ||
      officeTypeName.length > 150) {
      setOfficeTypeNameError("office Type Name must be between 3 to 150 words");
      setFormValid(false)
    } else {
      setOfficeTypeNameError("");
      setFormValid(true)
    }
  }
  useEffect(() => {
    handleChangeOfficeTypeNameShort();
  }, [officeTypeNameShort])
  const handleChangeOfficeTypeNameShort = () => {
    if (!officeTypeNameShort) return;
    if (officeTypeNameShort.length < 3 ||
      officeTypeNameShort.length > 50) {
      setOfficeTypeNameShortError("office Type Short Name must be between 3 to 50 words");
      setFormValid(false)
    } else {
      setOfficeTypeNameShortError("");
      setFormValid(true)
    }
  }




  const handleSubmit = (e) => {
    e.preventDefault();
    if (officeTypeName.length < 3 ||
      officeTypeName.length > 150) {
      setOfficeTypeNameError("Office Type Name must be between 3 to 150 words");

    } else if (officeTypeName === "") {
      setOfficeTypeNameError("Office Type Name is Required");
    }
    else {
      setOfficeTypeNameError("");
    }


    if (officeTypeId === "") {
      setOfficeTypeError("Office ID is Required/Input Only Numeric Value");
    } else {
      setOfficeTypeError("");
    }
    if (officeTypeNameShort.length < 3 ||
      officeTypeNameShort.length > 50) {
      setOfficeTypeNameShortError("office Type Short Name must be between 3 to 50 words");
      setFormValid(false)
    }
    else if (officeTypeNameShort === "") {
      setOfficeTypeNameShortError("Office Short is Required");
    } else {
      setOfficeTypeNameShortError("");
    }
    if (ipAddress === "") {
      setIpAddressError("IpAddress ID is Required");
    } else {
      setIpAddressError("");
    }


    if (formValid) {
      const payload = {
        officeTypeId: officeTypeId,
        officeTypeName: officeTypeName,
        officeTypeNameShort: officeTypeNameShort,
        // designationOrderId:designationOrderId,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}OfficeType/SetOfficeType`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Saved Sucessfully", "success");

            navigate(routeNames.OFFICETYPE);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["officeTypeId"] = location.state.officeTypeData.officeTypeId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}OfficeType/UpdateOfficeType`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "OfficeType Updated Sucessfully", "success");
            navigate(routeNames.OFFICETYPE);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Office Type</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Office Type ID
          </label>
          {officeTypeError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{officeTypeError}
            </p>
          )}
          <input
            required="this field required"
            type="number"
            value={officeTypeId}
            onChange={(e) => {
              setofficeTypeId(e.target.value);
              setOfficeTypeError("");

            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Type Name
          </label>
          {officeTypeNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{officeTypeNameError}
            </p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeTypeName}
            onChange={(e) => {
              setofficeTypeName(e.target.value);
              setOfficeTypeNameError("");
              handleChangeOfficeTypeName()
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Type Name Short
          </label>
          {officeTypeNameShortError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{officeTypeNameShortError}
            </p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeTypeNameShort}
            onChange={(e) => {
              setofficeTypeNameShort(e.target.value);
              setOfficeTypeNameShortError("");
              handleChangeOfficeTypeNameShort();
            }}
          />
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            value={isActive}
            id="defaultCheck1"
          />
          <label class="form-check-label" for="defaultCheck1">
            Is Active
          </label>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Ip Address
          </label>
          {ipAddressError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{ipAddressError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={ipAddress}
            onChange={(e) => {
              setipAddress(e.target.value);
              setIpAddressError("");
            }}
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
            to={routeNames.OFFICETYPE}
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
export default CreateOfficeType;
