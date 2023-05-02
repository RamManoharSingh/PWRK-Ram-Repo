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

const CreateDistrict = ({ mode, setCreationState, districtData }) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [disttId, setdisttId] = useState(0);
  const [stateId, setstateId] = useState(0);
  const [stateDropdownData, setStateDropdownData] = useState([]);
  //    officeTypeId = parseInt(jsonObject.officeTypeId);
  const [distNameError, setDistNameError] = useState("");
  const [distName, setdistName] = useState("");
  const [distShortName, setdistShortName] = useState("");
  const [distShortNameError, setDistShortNameError] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");
  const [ipAddressError, setipAddressError] = useState("");
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
  const handleStateChange = (event) => {
    setstateId(event.target.value);
    //setUserNameError("");
  };
  const getAllState = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}State/GetState`
    );
    setStateDropdownData(result.data);
  };
  const [updateon, setupdateon] = useState(new Date()); // initialize with current date and time

  const jsonString = '{"isActive": true}';
  const jsonObject = JSON.parse(jsonString);

  console.log(jsonObject.isActive);

  const navigate = useNavigate();

  useEffect(() => {
    // getAllTitle();
    //getAllOfficeType();
    //getAllDesignation();
    getAllState();

    //getAllDistt();
    // getAllAccountingStatus();
    // getAllStatus();
    // setDepartmentByPayerDropdownData(departmentByPayer);
    // setContactNoWarningDropdownData(contactNoWarning);
    // setContactNoMattersDropdownData(contactNoMatters);
    // setContactNoReportsDropdownData(contactNoReports);
    // setStatusDropdownData(status);
  }, []);


  useEffect(() => {
    mode = location.state.mode;
    districtData = location.state.districtData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setdisttId(districtData.disttId);
      setstateId(districtData.stateId);
      setdistName(districtData.distName);
      setdistShortName(districtData.distShortName);
      //   setdesignationOrderId(districtData.designationOrderId);
      setIsActive(districtData.isActive);
      setipAddress(districtData.ipAddress);
      setupdateby(districtData.updateby);
      setupdateon(districtData.updateon);
    }
  }, []);
  useEffect(() => {
    handleChangeDistName();
  }, [distName])
  const handleChangeDistName = () => {
    if (!distName) return;
    if (distName.length <= 3 || distName.length >= 150) {
      setDistNameError("District Name must be between 3 to 150 words");
      setFormValid(false)
    } else {
      setDistNameError("");
      setFormValid(true)
    }
  }
  useEffect(() => {
    handleChangeDistShortName();
  }, [distShortName])
  const handleChangeDistShortName = () => {
    if (!distShortName) return;
    if (distShortName.length <= 3 || distShortName.length >= 50) {
      setDistShortNameError("District Name must be between 3 to 150 words");
      setFormValid(false)
    } else {
      setDistShortNameError("");
      setFormValid(true)
    }
  }





  const handleSubmit = (e) => {
    e.preventDefault();

    if (distName === "") {
      setDistNameError("District name is Required");
    }
    else if (distName.length <= 3 || distName.length >= 150) {
      setDistNameError("District Name must be between 3 to 150 words");
    }

    else {
      setDistNameError("");
    }
    if (distShortName === "") {
      setDistShortNameError("District short name is Required");
    } else if (distShortName.length <= 3 || distShortName.length >= 50) {
      setDistShortNameError("District Name must be between 3 to 150 words");
    }
    else {
      setDistShortNameError("");
    }

    if (ipAddress === "") {
      setipAddressError("ipAddress is Required");
    }
    else {
      setipAddressError("");
    }

    if (formValid) {
      const payload = {
        disttId: disttId,
        stateId: stateId,
        distName: distName,
        distShortName: distShortName,
        // designationOrderId:designationOrderId,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}District/SetDistrict`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "District Saved Sucessfully", "success");

            navigate(routeNames.DISTRICT);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["disttId"] = location.state.districtData.disttId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}District/UpdateDistrict`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Updated Sucessfully", "success");
            navigate(routeNames.DISTRICT);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} District</h1>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            State
          </label>

          <Select

            value={stateId}
            onChange={handleStateChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {stateDropdownData.map((ele) => {
              return <MenuItem value={ele.stateId}>{ele.stateName}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            DistName
          </label>
          {distNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{distNameError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={distName}
            onChange={(e) => {
              setdistName(e.target.value);
              setDistNameError("");
              handleChangeDistName()
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            DistShortName
          </label>
          {distShortNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{distShortNameError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={distShortName}
            onChange={(e) => {
              setdistShortName(e.target.value);
              setDistShortNameError("");
              handleChangeDistShortName()
            }}
          />
        </div>
        {/* <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
          DesignationOrderId
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={designationOrderId}
            onChange={(e) => setdesignationOrderId(e.target.value)}
          />
        </div>



 */}
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
              setipAddressError("");
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
            to={routeNames.DISTRICT}
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
export default CreateDistrict;
