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

const CreateRole = ({ mode, roleData }) => {
  const location = useLocation();
  const [titleError, setTitleError] = useState("");
  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [roleId, setRoleId] = useState(0);
  const [officeTypeId, setofficeTypeId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [maker, setMaker] = useState("");
  const [checker, setChecker] = useState("");
  const [viewer, setViewer] = useState("");
  const [approver, setApprover] = useState("");
  const [updateby, setupdateby] = useState(0);
  const [updateon, setUpdateon] = useState(new Date()); // initialize with current date and time
  const [isActive, setIsActive] = useState(true);
  const [ipAddress, setipAddress] = useState("");

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

  const jsonString = '{"isActive": true}';
  const jsonObject = JSON.parse(jsonString);

  console.log(jsonObject.isActive);

  const navigate = useNavigate();

  useEffect(() => {
    mode = location.state.mode;
    roleData = location.state.roleData;
    console.log(mode);
    setPageMode(mode);

    if (mode === Modes.edit) {
      setRoleId(roleData.roleId);
      setofficeTypeId(roleData.officeTypeId);
      setRoleName(roleData.roleName);
      setMaker(roleData.maker);
      setChecker(roleData.checker);
      setIsActive(roleData.isActive);
      setipAddress(roleData.ipAddress);
      setupdateby(roleData.updateby);
      setUpdateon(roleData.updateon);
      setViewer(roleData.viewer);
      setApprover(roleData.approver);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (titleName === "") {
    //   setTitleError("Title is Required");
    // } else {
    //   setTitleError("");
    // }

    if (true) {
      const payload = {
        roleId: roleId,
        officeTypeId: officeTypeId,
        roleName: roleName,
        maker: maker,
        checker: checker,
        approver: approver,
        viewer: viewer,
        isActive: isActive,
        updateby: updateby,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {
        Axios.post(`${process.env.REACT_APP_API_BASE_URL}Role/SetRole`, payload)

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Saved Sucessfully", "success");

            navigate(routeNames.ROLE);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["setRoleId"] = location.state.roleData.roleId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Role/UpdateRole`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Updated Sucessfully", "success");
            navigate(routeNames.ROLE);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Role</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            OfficeTypeId
          </label>
          {titleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
          )}
          <input
            required="this field required"
            type="number"
            value={officeTypeId}
            onChange={(e) => {
              setofficeTypeId(e.target.value);
              setTitleError("");
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Role Name
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Maker
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={maker}
            onChange={(e) => setMaker(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Checker
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={checker}
            onChange={(e) => setChecker(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Approver
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={approver}
            onChange={(e) => setApprover(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Viewer
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={viewer}
            onChange={(e) => setViewer(e.target.value)}
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
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            IP Address
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
        {/* <div class="mb-3 A1">
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
        </div> */}
        {/* <div class="mb-3 A1">
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
            to={routeNames.ROLE}
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
export default CreateRole;