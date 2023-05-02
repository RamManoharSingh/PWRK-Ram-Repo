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

const CreateOfficeUnit = ({ mode, setCreationState, officeUnitData }) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [officeUnitId, setOfficeUnitId] = useState(0);
  const [officeTpyeId, setOfficeTypeId] = useState("");
  const [officeTpyeIdError, setOfficeTypeIdError] = useState("");
  const [officeUnitError, setOfficeUnitError] = useState("");
  const [officeId, setOfficeId] = useState();
  const [designationId, setDesignationId] = useState();
  const [designationDData, SetDesignationDData] = useState([]);
  const [unitName, setUnitName] = useState("");
  const [unitNameError, setUnitNameError] = useState("");
  const [unitAddress, setUnitAddress] = useState("");
  const [unitAddressError, setUnitAddressError] = useState("");
  const [emailId, setEmailId] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNo, setContactNo] = useState(0);
  const [contactError, setContactError] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setlatitude] = useState("");
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [seqId, setSeqId] = useState("");
  const [updateOfficeTypeId, setUpdateOfficeTypeId] = useState("");
  const [updateOfficeId, setUpdateOfficeId] = useState();
  const [ipAddress, setIpAddress] = useState(0);
  const [updatedby, setUpdatedBy] = useState(0);
  const [formValid, setFormValid] = useState(0);
  const jsonData = {
    updateby: "123",
  };
  const validateEmail = (emailId) => {
    return emailId.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  // Convert the "updateby" field to an integer
  const updateByInt = parseInt(jsonData.updateby);

  if (isNaN(updateByInt)) {
    console.log("Error: Invalid value for 'updateby'");
  } else {
    console.log(`'updateby' as integer: ${updateByInt}`);
  }
  const handleDesignationChange = (event) => {
    setDesignationId(event.target.value);
    //setUserNameError("");
  };
  const getAllDesignation = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Designation/GetDesignation`
    );
    SetDesignationDData(result.data);
  };
  const [updateon, setupdateon] = useState(new Date()); // initialize with current date and time

  const jsonString = '{"isActive": true}';
  const jsonObject = JSON.parse(jsonString);

  console.log(jsonObject.isActive);

  const navigate = useNavigate();


  useEffect(() => {
    // getAllTitle();
    //getAllOfficeType();
    getAllDesignation();
    //getAllState();

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
    officeUnitData = location.state.officeUnitData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setOfficeTypeId(officeUnitData.officeTpyeId);
      setOfficeUnitId(officeUnitData.officeUnitId);
      setOfficeId(officeUnitData.officeId);
      setDesignationId(officeUnitData.designationId);
      setUnitName(officeUnitData.unitName);
      setUnitAddress(officeUnitData.unitAddress);
      setEmailId(officeUnitData.emailId);
      setContactNo(officeUnitData.contactNo);
      setLongitude(officeUnitData.longitude);
      setlatitude(officeUnitData.latitude);
      setComment(officeUnitData.comment);
      setSeqId(officeUnitData.seqId);
      setUpdateOfficeTypeId(officeUnitData.officeTpyeId);
      setUpdateOfficeId(officeUnitData.updateOfficeId);
      setIpAddress(officeUnitData.ipAddress);
      setUpdatedBy(officeUnitData.updatedby);
    }
  }, []);
  useEffect(() => {
    handleContactChange();
  }, [contactNo])

  const handleContactChange = () => {
    if (!contactNo) return;
    if (contactNo.length <= 8 || contactNo.length >= 10) {
      setContactError("Invalid Mobile Number(Mobile Number  must be 8 to 10 Characters)");
    }
    else {
      setContactError("");
    }
  }
  useEffect(() => {
    handleEmailChange();
  }, [emailId])
  const handleEmailChange = () => {
    if (!emailId) return;
    if (validateEmail(emailId) == null)
      if (emailId != "") {
        setEmailError("Please Enter Valid Email Address");
      } else {
        setEmailError("")
      }
  }

  useEffect(() => {
    handleChangeUnitName();
  }, [unitName])
  const handleChangeUnitName = () => {
    if (!unitName) return;
    if (unitName.length <= 3 || unitName.length >= 150) {
      setUnitNameError("unit Name must be between 3 to 150 Characters");
      setFormValid(false)
    } else {
      setUnitNameError("");
      setFormValid(true)
    }
  }
  useEffect(() => {
    handleChangeUnitAddress();
  }, [unitAddress])
  const handleChangeUnitAddress = () => {
    if (!unitAddress) return;
    if (unitAddress.length <= 3 || unitAddress.length >= 500) {
      setUnitAddressError("unit Address must be between 3 to 500 Characters");
      setFormValid(false)
    } else {
      setUnitAddressError("");
      setFormValid(true)
    }
  }
  useEffect(() => {
    handleChangeComment();
  }, [comment])
  const handleChangeComment = () => {
    if (!comment) return;
    if (comment.length <= 3 || comment.length >= 500) {
      setCommentError("Comment must be between 3 to 500 Characters");
      setFormValid(false)
    } else {
      setCommentError("");
      setFormValid(true)
    }
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (unitName === "") { setUnitNameError("unit Name Requeried"); }
    else if (unitName.length <= 3 || unitName.length >= 150) {
      setUnitNameError("unit Name must be between 3 to 150 Characters");
    } else {
      setEmailError("")
    }
    if (unitName === "") {
      setUnitNameError("unit Name Requeried");
    }
    else if (unitName.length <= 3 || unitName.length >= 150) {
      setUnitNameError("unit Name must be between 3 to 150 Characters");
    }

    if (unitAddress === "") {
      setUnitAddressError("unit Address Requeried");
    }
    else if (unitAddress.length <= 3 || unitAddress.length >= 500) {
      setUnitAddressError("unit Address must be between 3 to 500 Characters");
    }


    if (emailId === "") {
      setEmailError("Email Is Requeried")
    } else {
      setEmailError("")
    }
    if (comment === "") {
      setCommentError("comment Is Requeried")
    }
    else if (comment.length <= 3 || comment.length >= 500) {
      setCommentError("Comment must be between 3 to 500 Characters");
    } else {
      setCommentError("")
    }

    if (formValid) {
      const payload = {
        officeUnitId: officeUnitId,
        officeTpyeId: officeTpyeId,
        officeId: officeId,
        designationId: designationId,
        unitName: unitName,
        unitAddress: unitAddress,
        emailId: emailId,
        contactNo: contactNo,
        longitude: longitude,
        latitude: latitude,
        comment: comment,
        seqId: seqId,
        updateOfficeTypeId: updateOfficeTypeId,
        updateOfficeId: updateOfficeId,
        ipAddress: "0",
        updatedOn: updateon,
        updatedBy: updatedby,
      };
      if (validateEmail(emailId)) {
        if (pageMode === Modes.create) {
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}OfficeUnit/SetOfficeUnit`,
            payload
          )

            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "OfficeUnit Saved Sucessfully", "success");

              navigate(routeNames.OFFICEUNIT);
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (pageMode === Modes.edit) {
          payload["officeUnitId"] = location.state.officeUnitData.officeUnitId;
          Axios.post(
            `${process.env.REACT_APP_API_BASE_URL}OfficeUnit/UpdateOfficeUnit`,
            payload
          )

            .then((response) => {
              console.log(response.data);
              Swal.fire("Save", "OfficeUnit Updated Sucessfully", "success");
              navigate(routeNames.OFFICEUNIT);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    }
  };
  return (
    <div>
      <div className="MainDiv">
        <hr />
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Office Unit</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Office Type Id
          </label>
          {officeUnitError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{officeUnitError}</p>
          )}
          <input
            required="this field required"
            type="email"
            value={officeTpyeId}
            onChange={(e) => {
              setOfficeTypeId(e.target.value);
              setOfficeTypeIdError("");
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={officeId}
            onChange={(e) => setOfficeId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Designation
          </label>

          <Select

            value={designationId}
            onChange={handleDesignationChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {designationDData.map((ele) => {
              return <MenuItem value={ele.designationId}>{ele.designationName}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Unit Name
          </label>
          {unitNameError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{unitNameError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={unitName}
            onChange={(e) => {
              setUnitName(e.target.value);
              handleChangeUnitName();
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Unit Address
          </label>
          {unitAddressError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{unitAddressError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={unitAddress}
            onChange={(e) => {
              setUnitAddress(e.target.value);
              handleChangeUnitAddress();
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Email Id
          </label>
          {emailError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{emailError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={emailId}
            onChange={(e) => { setEmailId(e.target.value); setEmailError(""); handleEmailChange() }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Contact No
          </label>
          {contactError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{contactError}</p>
          )}
          <input
            placeholder="enter value here"
            type="number"
            class="form-control"
            id="inputEmail3"
            value={contactNo}
            onChange={(e) => {
              setContactNo(e.target.value);
              handleContactChange();
            }}
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
            onChange={(e) => setlatitude(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Comment
          </label>
          {commentError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{commentError}</p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              handleChangeComment();
            }}
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
            to={routeNames.OFFICEUNIT}
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
export default CreateOfficeUnit;
