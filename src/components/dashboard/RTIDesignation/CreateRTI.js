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

const CreateRTI = ({ mode, setCreationState, rtiData }) => {
  const location = useLocation();


  const [pageMode, setPageMode] = useState("create");
  const [rtiDesigId, setrtiDesigId] = useState(0);
  const [rtiDesignation, setrtiDesignation] = useState("");
  //    officeTypeId = parseInt(jsonObject.officeTypeId);
  const [rtiDesignationError, setRtiDesignationError] = useState("");
  //   const [officeTypeNameShort, setofficeTypeNameShort] = useState("");
  //   const [designationShort, setdesignationShort] = useState("");
  //   const [designationOrderId, setdesignationOrderId] = useState( );
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [ipAddressError, setipAddresserror] = useState("");
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
    rtiData = location.state.rtiData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setrtiDesigId(rtiData.rtiDesigId);
      setrtiDesignation(rtiData.rtiDesignation);
      //   setofficeTypeNameShort(rtiData.officeTypeNameShort);
      //   setdesignationOrderId(rtiData.designationOrderId);
      setIsActive(rtiData.isActive);
      setipAddress(rtiData.ipAddress);
      setupdateby(rtiData.updateby);
      setupdateon(rtiData.updateon);
    }
  }, []);

  useEffect(() => {
    handleChangeRtiDesignation();
  }, [rtiDesignation])
  const handleChangeRtiDesignation = () => {
    if (!rtiDesignation) return;
    if (rtiDesignation.length < 3 ||
      rtiDesignation.length > 100) {
      setRtiDesignationError("RTI Designation Must Be Between 3 to 100 Letter");
      setFormValid(false)
    } else {
      setRtiDesignationError("");
      setFormValid(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rtiDesignation === "") {
      setRtiDesignationError("RTI Designation is Required");
    } else if (rtiDesignation.length < 3 ||
      rtiDesignation.length > 100) {
      setRtiDesignationError("RTI Designation Must Be Between 3 to 100 Letter");
    }

    else {
      setRtiDesignationError("");
    }

    if (ipAddress === "") {
      setipAddresserror("ipAddress is Required");
    } else {
      setipAddresserror("");
    }

    if (formValid) {
      const payload = {
        rtiDesigId: rtiDesigId,
        rtiDesignation: rtiDesignation,
        //  officeTypeNameShort:officeTypeNameShort,
        // designationOrderId:designationOrderId,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {

        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}RTIDesignation/SetRTIDesignation`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "RTIDesignation Saved Sucessfully", "success");

            navigate(routeNames.RTIDESIGNATION);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["rtiDesigId"] = location.state.rtiData.rtiDesigId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}RTIDesignation/UpdateRTIDesignation`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "RTIDesignation Updated Sucessfully", "success");
            navigate(routeNames.RTIDESIGNATION);
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
        <h1>
          {pageMode === Modes.create ? "Add New" : "Edit"} RTI Designation
        </h1>
        {/* <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            RTI Designation Id
          </label>
          {rtiDesignationError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{rtiDesignationError}
            </p>
          )}
          <input
            required="this field required"
            type="email"
            value={rtiDesigId}
            onChange={(e) => {
              setrtiDesigId(e.target.value);
              setRtiDesignationError("");
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
          </div>*/}
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            RTIDesignation
          </label>
          {rtiDesignationError && (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{rtiDesignationError}
            </p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={rtiDesignation}
            onChange={(e) => {
              setrtiDesignation(e.target.value);
              setRtiDesignationError("");
              handleChangeRtiDesignation()
            }}
          />
        </div>
        {/* <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
          Office Type Name Short
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeTypeNameShort}
            onChange={(e) => setofficeTypeNameShort(e.target.value)}
          />
        </div> */}
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
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            ipAddress
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
              setipAddresserror("");
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
            to={routeNames.RTIDESIGNATION}
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
export default CreateRTI;
