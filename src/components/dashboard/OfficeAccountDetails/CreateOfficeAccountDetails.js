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

const CreateOfficeAccountDetails = ({
  mode,
  setCreationState,
  officeAccountDetailsData,
}) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [officeId, setOfficeId] = useState(0);
  const [ddoTypeId, setDdoTypeId] = useState(0);
  const [ddoCode, setDdoCode] = useState("");
  const [ddoCodeName, setDdoCodeName] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGst] = useState("");
  const [bankAccNo, setBankAccNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [bankIFSC, setBankIFSC] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [updateBy, setUpdateBy] = useState(0);
  const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState(0);
  const [updateOfficeId, setUpdateOfficeId] = useState(0);
  const [updateon, setUpdateOn] = useState(new Date()); // initialize with current date and time
  const [ipAddress, setIpAddress] = useState("");

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
    officeAccountDetailsData = location.state.officeAccountDetailsData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setOfficeId(officeAccountDetailsData.officeId);
      setDdoTypeId(officeAccountDetailsData.ddoTypeId);
      setDdoCode(officeAccountDetailsData.ddoCode);
      setDdoCodeName(officeAccountDetailsData.ddoCodeName);
      setPan(officeAccountDetailsData.pan);
      setGst(officeAccountDetailsData.gst);
      setBankAccNo(officeAccountDetailsData.bankAccNo);
      setBankName(officeAccountDetailsData.bankName);
      setBankAddress(officeAccountDetailsData.bankAddress);
      setBankIFSC(officeAccountDetailsData.bankIFSC);
      setIsActive(officeAccountDetailsData.isActive);
      setUpdateBy(officeAccountDetailsData.updateBy);
      setUpdateOfficeTypeId(officeAccountDetailsData.updateOfficeTypeId);
      setUpdateOfficeId(officeAccountDetailsData.updateOfficeId);
      setIpAddress(officeAccountDetailsData.ipAddress);
      setUpdateOn(officeAccountDetailsData.updateon);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (titleName === "") {
    //   setmoduleError("Title is Required");
    // } else {
    //   setmoduleError("");
    // }

    if (true) {
      const payload = {
        officeId: officeId,
        ddoTypeId: ddoTypeId,
        ddoCode: ddoCode,
        ddoCodeName: ddoCodeName,
        pan: pan,
        gst: gst,
        bankAccNo: bankAccNo,
        bankName: bankName,
        bankAddress: bankAddress,
        bankIFSC: bankIFSC,
        isActive: isActive,
        updateBy: updateBy,
        updateOfficeTypeId: updateOfficeTypeId,
        updateOfficeId: updateOfficeId,
        updateon: updateon,
        ipAddress: ipAddress,
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}OfficeAccountDetails/SetOfficeAccountDetails`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Module Saved Sucessfully", "success");

            navigate(routeNames.OFFICEACCOUNTDETAILS);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["officeId"] = location.state.officeAccountDetailsData.officeId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}OfficeAccountDetails/UpdateOfficeAccountDetails`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "module Updated Sucessfully", "success");
            navigate(routeNames.OFFICEACCOUNTDETAILS);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Office Account</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            ddoCode
          </label>
          {/* {moduleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{moduleError}</p>
          )} */}
          <input
            required="this field required"
            type="email"
            value={ddoCode}
            onChange={(e) => {
              setDdoCode(e.target.value);
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            ddoCodeName
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={ddoCodeName}
            onChange={(e) => setDdoCodeName(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            PAN
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={pan}
            onChange={(e) => setPan(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Bank Account Number
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={bankAccNo}
            onChange={(e) => setBankAccNo(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Bank Name
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Bank IFSC Code
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={bankIFSC}
            onChange={(e) => setBankIFSC(e.target.value)}
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
            onChange={(e) => setIpAddress(e.target.value)}
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
            to={routeNames.OFFICEACCOUNTDETAILS}
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
export default CreateOfficeAccountDetails;
