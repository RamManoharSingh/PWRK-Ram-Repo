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

const CreateModule = ({ mode, setCreationState, moduleData }) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [moduleId, setModuleId] = useState(0);
  const [maduleName, setMaduleName] = useState("");

  const [moduleNameError, setModuleNameError] = useState("");
  const [moduleNameShort, setModuleNameShort] = useState("");
  const [moduleNameShortError, setModuleNameShortError] = useState("");
  const [moduleUrl, setModuleUrl] = useState("");
  const [moduleUrlError, setModuleUrlError] = useState("");
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
    moduleData = location.state.moduleData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setModuleId(moduleData.moduleId);
      setMaduleName(moduleData.maduleName);
      setModuleNameShort(moduleData.moduleNameShort);
      setModuleUrl(moduleData.moduleUrl);
      setIsActive(moduleData.isActive);
      setipAddress(moduleData.ipAddress);
      setupdateby(moduleData.updateby);
      setupdateon(moduleData.updateon);
    }
  }, []);

  useEffect(() => {
    handleChangeModuleName();
  }, [maduleName])
  const handleChangeModuleName = () => {
    if (!maduleName) return;
    if (maduleName.length <= 3 || maduleName.length >= 150) {
      setModuleNameError("module Name must be between 3 to 150 charecters");
      setFormValid(false)
    } else {
      setModuleNameError("");
      setFormValid(true)
    }
  }
  useEffect(() => {
    handleChangeModuleNameShort();
  }, [moduleNameShort])
  const handleChangeModuleNameShort = () => {
    if (!moduleNameShort) return;
    if (moduleNameShort.length <= 3 || moduleNameShort.length >= 50) {
      setModuleNameShortError("module Name Short must be between 3 to 50 charecters");
      setFormValid(false)
    } else {
      setModuleNameShortError("");
      setFormValid(true)
    }
  }






  const handleSubmit = (e) => {
    e.preventDefault();
    if (maduleName === "") {
      setModuleNameError("module name is Required")
    }
    else if (maduleName.length <= 3 || moduleNameShort.length >= 150) {
      setModuleNameError("madule Name must be between 3 to 150 charecters");
    } else {
      setModuleNameError("")
    }
    if (moduleNameShort === "") {
      setModuleNameShortError("module name is Required")
    }
    else if (moduleNameShort.length <= 3 || moduleNameShort.length >= 50) {
      setModuleNameShortError("madule Name Short must be between 3 to 50 charecters");
    } else {
      setModuleNameShortError("")
    }


    if (formValid) {
      const payload = {
        moduleId: moduleId,
        maduleName: maduleName,
        moduleNameShort: moduleNameShort,
        moduleUrl: moduleUrl,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: "0",
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Module/SetModule`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Module Saved Sucessfully", "Success");

            navigate(routeNames.MODULE);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["titleId"] = location.state.moduleData.moduleId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Module/UpdateModule`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "module Updated Sucessfully", "Success");
            navigate(routeNames.MODULE);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Module</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Module Name
          </label>
          {moduleNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameError}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={maduleName}
            onChange={(e) => {
              setMaduleName(e.target.value);
              setModuleNameError("");
              handleChangeModuleName();
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Module Name Short
          </label>
          {moduleNameShortError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{moduleNameShortError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={moduleNameShort}
            onChange={(e) => {
              setModuleNameShort(e.target.value);
              setModuleNameShortError("");
              handleChangeModuleNameShort();
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Module Url
          </label>
          {moduleUrlError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{moduleUrlError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={moduleUrl}
            onChange={(e) => {
              setModuleUrl(e.target.value);
              setModuleUrlError("");
            }}
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
            to={routeNames.MODULE}
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
export default CreateModule;
