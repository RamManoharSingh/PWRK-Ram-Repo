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
import { Title } from "@mui/icons-material";
// import PhoneInput from "react-phone-number-input";

const Createuser = ({ mode, setCreationState, userData }) => {
  const location = useLocation();

  const [pageMode, setPageMode] = useState("create");
  const [userId, setUserId] = useState(0);
  const [empId, setempId] = useState(0);
  const [empIDError, setEmpIDError] = useState("");
  const [officeTypeId, setofficeTypeId] = useState(0);
  const [officeTypeError, setOfficeTypeError] = useState("");
  const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
  const [titleId, settitleId] = useState(0);
  const [titleDropdownData, setTitleDropdownData] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [userName, setuserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [designationId, setdesignationId] = useState("");
  const [designationDropdownData, setDesignationDropdownData] = useState([]);
  const [designationError, setDesignationError] = useState("");
  const [mobileNo1, setmobileNo1] = useState(0);
  const [mobileNo2, setmobileNo2] = useState(0);
  const [mobileNo2Error, setMobileNo2Error] = useState("");
  const [emailId, setemailId] = useState("");
  const [resiAdd, setresiAdd] = useState("");
  const [resiAddError, setresiAddError] = useState("");
  const [stateId, setstateId] = useState(0);
  const [stateDropdownData, setStateDropdownData] = useState([]);
  const [disttId, setdisttId] = useState(0);
  const [disttDropdownData, setDisttDropdownData] = useState([]);
  const [pinCode, setpinCode] = useState(0);
  const [pinCodeError, setPinCodeError] = useState("");
  const [loginId, setloginId] = useState("");
  const [password, setpassword] = useState("");
  const [invalidLoginCount, setinvalidLoginCount] = useState("");
  const [updateOfficeTypeId, setupdateOfficeTypeId] = useState("");
  const [updateOfficeId, setupdateOfficeId] = useState("");
  const [isActive, setisActive] = useState(true);
  const [ipAddress, setIpAddress] = useState("0");
  const [updateby, setupdateby] = useState("");
  const [loginLockedDate, setloginLockedDate] = useState("0");
  const [lastLoginDateTime, setlastLoginDateTime] = useState("0");
  const [value, setValue] = useState("0");

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

  const handleDisttChange = (event) => {
    setdisttId(event.target.value);


    setDesignationError("");
  };
  const handleTitleChange = (event) => {
    settitleId(event.target.value);
    setTitleError("");
  };
  const handleOfficeTypeChange = (event) => {
    setofficeTypeId(event.target.value);

    setOfficeTypeError("");
  };
  const handleDesignationChange = (event) => {
    setdesignationId(event.target.value);
    setDesignationError("");
  };

  const handleStateChange = (event) => {
    setstateId(event.target.value);
    setUserNameError("");
  };
  const navigate = useNavigate();

  const getAllTitle = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}title/GetTitle`
    );
    setTitleDropdownData(result.data);
  };
  const getAllOfficeType = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}OfficeType/GetOfficeType`
    );
    setOfficeTypeDropdownData(result.data);
  };
  const getAllDesignation = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}Designation/GetDesignation`
    );
    setDesignationDropdownData(result.data);
  };

  const getAllState = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}State/GetState`
    );
    setStateDropdownData(result.data);
  };
  const getAllDistt = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}District/GetDistrict`
    );
    setDisttDropdownData(result.data);
  };
  useEffect(() => {
    getAllTitle();
    getAllOfficeType();
    getAllDesignation();
    getAllState();

    getAllDistt();
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
    userData = location.state.userData;
    setPageMode(mode);

    if (mode === Modes.edit) {
      setUserId(userData.userId);
      setempId(userData.empId);
      setofficeTypeId(userData.officeTypeId);
      settitleId(userData.titleId);
      setuserName(userData.userName);
      setdesignationId(userData.designationId);
      setmobileNo1(userData.mobileNo1);
      setmobileNo2(userData.mobileNo2);
      setemailId(userData.emailId);
      setresiAdd(userData.resiAdd);
      setstateId(userData.stateId);
      setdisttId(userData.disttId);
      setpinCode(userData.pinCode);
      setloginId(userData.loginId);
      setpassword(userData.password);
      setinvalidLoginCount(userData.invalidLoginCount);
      setloginLockedDate(userData.loginLockedDate);
      setlastLoginDateTime(userData.lastLoginDateTime);
      setisActive(userData.isActive);
      setinvalidLoginCount(userData.invalidLoginCount);
      setupdateOfficeTypeId(userData.updateOfficeTypeId);
      setupdateOfficeId(userData.updateOfficeId);
      setIpAddress(userData.ipAddress);
      setupdateby(userData.updateby);
      setupdateon(userData.updateon);
    }
  }, []);

  useEffect(() => {
    handleChange();
  }, [mobileNo2])
  const handleChange = () => {
    if (mobileNo2.length !== 10) {
      setMobileNo2Error("Mobile Number  must be of 10 letter");
    } else {
      setMobileNo2Error("");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (empId === "") {
      setEmpIDError("Employee Id is Required");
    } else {
      setEmpIDError("");
    }
    if (officeTypeId === 0 || officeTypeId == null) {
      setOfficeTypeError("Office Type Id is Required");
    } else {
      setOfficeTypeError("");
    }
    if (userName === "") {
      setUserNameError("userName is Required");
    } else if (userName.length <= 3 && userName.length >= 100) {
      setUserNameError("User Name must be between 3 and 100 Characters");
    } else {
      setUserNameError("");
    }
    if (titleId === "") {
      setTitleError("Title is Required");
    } else {
      setTitleError("");
    }
    if (designationId === "") {
      setDesignationError("Designation is Required");
    } else {
      setDesignationError("");
    }

    if (true) {
      const payload = {
        userId: userId,
        empId: empId,
        officeTypeId: officeTypeId,
        titleId: titleId,
        userName: userName,
        designationId: designationId,
        mobileNo1: mobileNo1,
        mobileNo2: mobileNo2,
        emailId: emailId,
        resiAdd: resiAdd,
        stateId: stateId,
        disttId: disttId,
        pinCode: pinCode,
        loginId: loginId,
        password: password,
        invalidLoginCount: invalidLoginCount,
        loginLockedDate: loginLockedDate,
        lastLoginDateTime: lastLoginDateTime,
        isActive: isActive,
        updateon: updateon,
        updateOfficeTypeId: updateOfficeTypeId,
        updateOfficeId: updateOfficeId,
        ipAddress: ipAddress,
        updateby: updateby,
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}UserProfile/UpdateUserProfile`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Saved Sucessfully", "success");

            navigate(routeNames.USER);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["userId"] = location.state.userData.userId;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}UserProfile/UpdateUserProfile`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Title Updated Sucessfully", "success");
            navigate(routeNames.USER);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} User</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
            Employee Id
          </label>
          {empIDError ? (
            <p style={{ color: "red", fontSize: "15px" }}>*{empIDError}</p>
          ) : (
            <p></p>
          )}
          <input
            required="this field required"
            type="email"
            value={empId}
            onChange={(e) => {
              setempId(e.target.value);
              setEmpIDError("");
            }}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Type
          </label>
          {officeTypeError ? (
            <p style={{ color: "red", fontSize: "15px" }}>*{officeTypeError}</p>
          ) : (
            <p></p>
          )}
          <Select
            value={officeTypeId}
            onChange={handleOfficeTypeChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {officeTypeDropdownData.map((ele) => {
              return (
                <MenuItem value={ele.officeTypeId}>
                  {ele.officeTypeName}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Tittle
          </label>
          {titleError ? (
            <p style={{ color: "red", fontSize: "15px" }}>*{titleError}</p>
          ) : (
            <p></p>
          )}
          <Select
            value={titleId}
            onChange={handleTitleChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {titleDropdownData.map((ele) => {
              return <MenuItem value={ele.titleId}>{ele.titleName}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            User Name
          </label>
          {userNameError ? (
            <p style={{ color: "red", fontSize: "15px" }}>*{userNameError}</p>
          ) : (
            <p></p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            value={userName}
            onChange={(e) => {
              setuserName(e.target.value);
              setUserNameError("");
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Designation
          </label>
          {designationError ? (
            <p style={{ color: "red", fontSize: "15px" }}>
              *{designationError}
            </p>
          ) : (
            <p></p>
          )}
          <Select
            value={designationId}
            onChange={handleDesignationChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {designationDropdownData.map((ele) => {
              return (
                <MenuItem value={ele.designationId}>
                  {ele.designationName}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Mobile No 1
          </label>
          <input
            disabled
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={mobileNo1}
            onChange={(e) => setmobileNo1(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Mobile No 2
          </label>
          {mobileNo2Error ? (
            <p style={{ color: "red", fontSize: "15px" }}>*{mobileNo2Error}</p>
          ) : (
            <p></p>
          )}
          <input
            min="0"
            max="10"
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={mobileNo2}
            onChange={(e) => {
              setmobileNo2(e.target.value);
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Email Id
          </label>

          <input
            disabled
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={emailId}
            onChange={(e) => setemailId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Registered Address
          </label>
          {resiAddError ? (
            <p style={{ color: "red", fontSize: "15px" }}>*{resiAddError}</p>
          ) : (
            <p></p>
          )}
          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            id="inputEmail3"
            value={resiAdd}
            onChange={(e) => {
              setresiAdd(e.target.value);
              setresiAddError("");
            }}
          />
        </div>
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
            District
          </label>
          <hr />

          <Select
            value={disttId}
            onChange={handleDisttChange}
            inputProps={{ "aria-label": "Without label" }}
            className="form-control"
          >
            {disttDropdownData.map((ele) => {
              return <MenuItem value={ele.disttId}>{ele.distName}</MenuItem>;
            })}
          </Select>
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Pin Code
          </label>
          {pinCodeError ? (
            <p style={{ color: "red", fontSize: "15px" }}>*{pinCodeError}</p>
          ) : (
            <p></p>
          )}
          <input
            placeholder="enter value here"
            type="number"
            class="form-control"
            id="inputEmail3"
            value={pinCode}
            onChange={(e) => {
              setpinCode(e.target.value);
              setEmpIDError("");
            }}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Login Id
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
            value={loginId}
            onChange={(e) => setloginId(e.target.value)}
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            IP Address
          </label>

          <input
            placeholder="enter value here"
            type="text"
            class="form-control"
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
            to={routeNames.USER}
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
export default Createuser;
