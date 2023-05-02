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
import { DisplaySettings } from "@mui/icons-material";

const CreateOffice = ({ mode, setCreationState, officeData }) => {
  const location = useLocation();

  //   const [officeId, setofficeId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [officeId, setofficeId] = useState(0);
  const [officeTypeId, setOfficeTypeId] = useState("");
  const [officeError, setofficeError] = useState("");
  const [officeName, setOfficeName] = useState("");
  const [officeNameHindi, setOfficeNameHindi] = useState("");
  const [officeCode, setOfficeCode] = useState("");
  const [address, setAddress] = useState("");
  const [stateId, setStateId] = useState("");
  const [disttId, setDisttId] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [stdCode, setStdCode] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [parentId1, setParentId1] = useState(0);
  const [parentId1WEF, setParentId1WEF] = useState(new Date());
  const [parentId2, setParentId2] = useState(0);
  const [parentId2WEF, setParentId2WEF] = useState(new Date());
  const [parentId3, setParentId3] = useState(0);
  const [parentId3WEF, setParentId3WEF] = useState(new Date());
  const [parentId4, setParentId4] = useState(0);
  const [parentId4WEF, setParentId4WEF] = useState(new Date());
  const [designationId, setdesignationId] = useState(0);

  const [officeLevelId, setOfficeLevelId] = useState(0);
  const [rtiDesigId, setRtiDesigId] = useState(0);
  const [rtiJuris, setRtiJuris] = useState("");
  const [jurisdiction, setJurisDiction] = useState("");
  const [comment, setComment] = useState("");
  const [seqId, setSeqId] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState(0);
  const [updateOfficeId, setUpdateOfficeId] = useState(0);
  const [ipAddress, setipAddress] = useState("");
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
    officeData = location.state.officeData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setOfficeTypeId(officeData.officeTypeId);
      setOfficeName(officeData.officeName);
      setOfficeNameHindi(officeData.officeNameHindi);
      setOfficeCode(officeData.officeCode);
      setAddress(officeData.address);
      setStateId(officeData.stateId);
      setDisttId(officeData.disttId);
      setPinCode(officeData.pinCode);
      setStdCode(officeData.stdCode);
      setContactNo(officeData.contactNo);
      setEmailId(officeData.emailId);
      setLongitude(officeData.longitude);
      setLatitude(officeData.latitude);
      setParentId1(officeData.parentId1);
      setParentId1WEF(officeData.parentId1WEF);
      setParentId2(officeData.parentId2);
      setParentId2WEF(officeData.parentId2WEF);
      setParentId3(officeData.parentId3);
      setParentId3WEF(officeData.parentId3WEF);
      setParentId4(officeData.parentId4);
      setParentId4WEF(officeData.parentId4WEF);
      setdesignationId(officeData.designationId);
      setofficeId(officeData.officeId);
      setOfficeLevelId(officeData.officeLevelId);
      setRtiDesigId(officeData.rtiDesigId);
      setRtiJuris(officeData.rtiJuris);
      setJurisDiction(officeData.jurisdiction);
      setComment(officeData.comment);
      setSeqId(officeData.seqId);
      setIsActive(officeData.isActive);
      setIsVisible(officeData.isVisible);
      setUpdateOfficeTypeId(officeData.updateOfficeTypeId);
      setUpdateOfficeId(officeData.updateOfficeId);
      setipAddress(officeData.ipAddress);
      setupdateby(officeData.updateby);
      setupdateon(officeData.updateon);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (titleName === "") {
    //   setofficeError("Title is Required");
    // } else {
    //   setofficeError("");
    // }

    if (true) {
      const payload = {
        officeId: officeId,
        officeTypeId: officeTypeId,
        officeName: officeName,
        officeNameHindi: officeNameHindi,
        officeCode: officeCode,
        address: address,
        stateId: stateId,
        disttId: disttId,
        pinCode: pinCode,
        stdCode: stdCode,
        contactNo: contactNo,
        emailId: emailId,
        longitude: longitude,
        latitude: latitude,
        parentId1: parentId1,
        parentId1WEF: parentId1WEF,
        parentId2: parentId2,
        parentId2WEF: parentId2WEF,
        parentId3: parentId3,
        parentId3WEF: parentId3WEF,
        parentId4: parentId4,
        parentId4WEF: parentId4WEF,
        designationId: designationId,
        officeId: officeId,
        officeLevelId: officeLevelId,
        rtiDesigId: rtiDesigId,
        rtiJuris: rtiJuris,
        jurisdiction: jurisdiction,
        comment: comment,
        seqId: seqId,
        isActive: isActive,
        isVisible: isVisible,
        updateby: updateby,
        updateOfficeTypeId: updateOfficeTypeId,
        updateOfficeId: updateOfficeId,
        updateon: updateon,
        ipAddress: "0",
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Office/SetOffice`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Office Saved Sucessfully", "success");

            navigate(routeNames.OFFICE);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["officeId"] = location.state.officeData.officeId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}Office/UpdateOffice`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Office Updated Sucessfully", "success");
            navigate(routeNames.OFFICE);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Office</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            OfficeTypeId
          </label>
          {officeError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{officeError}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={officeTypeId}
            onChange={(e) => {
              setOfficeTypeId(e.target.value);
              setofficeError("");
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Name
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Name Hindi
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeNameHindi}
            onChange={(e) => setOfficeNameHindi(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Code
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeCode}
            onChange={(e) => setOfficeCode(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Address
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            State Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Distt Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={disttId}
            onChange={(e) => setDisttId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Pin Code
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Std Code
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={stdCode}
            onChange={(e) => setStdCode(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Contact No
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Email Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Longitude
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Latitude
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Parent Id 1
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId1}
            onChange={(e) => setParentId1(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Parent Id 1 WEF
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId1WEF}
            onChange={(e) => setParentId1WEF(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            parentId2
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId2}
            onChange={(e) => setParentId2(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Parent Id 2 WEF
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId2WEF}
            onChange={(e) => setParentId2WEF(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Parent Id 3
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId3}
            onChange={(e) => setParentId3(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Parent Id 3 WEF
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId3WEF}
            onChange={(e) => setParentId3WEF(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Parent Id 4
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId4}
            onChange={(e) => setParentId4(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Parent Id 4 WEF
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={parentId4WEF}
            onChange={(e) => setParentId4WEF(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Designation Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={designationId}
            onChange={(e) => setdesignationId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Level Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeLevelId}
            onChange={(e) => setOfficeLevelId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            RTI Designation Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={rtiDesigId}
            onChange={(e) => setRtiDesigId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            RTI juris
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={rtiJuris}
            onChange={(e) => setRtiJuris(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Juris Diction
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={jurisdiction}
            onChange={(e) => setJurisDiction(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Comment
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Seq Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={seqId}
            onChange={(e) => setSeqId(e.target.value)}
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
            Is Visible
          </label>
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
            checked={isVisible}
            onChange={(e) => setIsVisible(e.target.checked)}
            value={isActive}
            id="defaultCheck1"
          />
          <label style={{ marginLeft: 46, paddingTop: 4 }} class="form-check-label" for="defaultCheck1">
            IsActive
          </label>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Update Office Type Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={updateOfficeTypeId}
            onChange={(e) => setUpdateOfficeTypeId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Update Office Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={updateOfficeId}
            onChange={(e) => setUpdateOfficeId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
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
            to={routeNames.OFFICE}
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
export default CreateOffice;
