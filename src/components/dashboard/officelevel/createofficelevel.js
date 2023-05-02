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


const CreateOfficeLevel = ({ mode, setCreationState, officeLevelData }) => {
  const location = useLocation();

  //   const [designationId, setdesignationId] = useState(0);
  const [pageMode, setPageMode] = useState("create");
  const [id, setId] = useState(0);
  const [officeTypeid, setOfficeTypeId] = useState(0);
  const [officeTypeDropdownData, setOfficeTypeDropdownData] = useState([]);
  
  const [officeLevelId, setOfficeLevelId] = useState(0);
  const [officeLevel, setOfficeLevel] = useState("");
 
  const [ipAddress, setIpAddress] = useState("");
  const [updateBy, setUpdateBy] = useState(0);
  const [updateOn, setUpdateOn] = useState(new Date()); // initialize with current date and time


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
  const getAllOfficeType = async () => {
    let result = await Axios.get(
      `${process.env.REACT_APP_API_BASE_URL}OfficeType/GetOfficeType`
    );
    setOfficeTypeDropdownData(result.data);
  };

  useEffect(() => {
   
    getAllOfficeType();
   
    
  }, []);

  useEffect(() => {
    
    mode = location.state.mode;
    officeLevelData = location.state.officeLevelData;
    setPageMode(mode);

    if (mode === Modes.edit) {
        setId(officeLevelData.id);
        setOfficeTypeId(officeLevelData.officeTypeid);
        setOfficeLevelId(officeLevelData.officeLevelId);
        setOfficeLevel(officeLevelData.officeLevel);
      
      setIpAddress(officeLevelData.ipAddress);
      setUpdateBy(officeLevelData.updateBy);
      setUpdateOn(officeLevelData.updateOn);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    

    if (true) {
      const payload = {
        id: id,
        officeTypeid: officeTypeid,
        officeLevelId: officeLevelId,
        officeLevel: officeLevel,

        updateBy: updateBy,
        updateOn: updateOn,
        ipAddress: "0",
      };

      if (pageMode === Modes.create) {
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}OfficeLevel/SetOfficeLevel`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "Module Saved Sucessfully", "Success");

            navigate(routeNames.OFFICELEVEL);
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (pageMode === Modes.edit) {
        payload["id"] = location.state.officeLevelData.id;
        Axios.post(
          `${process.env.REACT_APP_API_BASE_URL}OfficeLevel/UpdateOfficeLevel`,
          payload
        )

          .then((response) => {
            console.log(response.data);
            Swal.fire("Save", "module Updated Sucessfully", "Success");
            navigate(routeNames.OFFICELEVEL);
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
        <h1>{pageMode === Modes.create ? "Add New" : "Edit"} Office Level</h1>
        <div className="mb-3 A1">
          <label for="exampleFormControlInput1" className="form-label" required>
          Office Level Name
          </label>
          {/* {moduleError && (
            <p style={{ color: "red", fontSize: "15px" }}>*{moduleError}</p>
          )} */}
          <input
            required="this field required"
            type="email"
            value={officeLevel}
            onChange={(e) => setOfficeLevel(e.target.value)}
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter value here"
          />
        </div>
        <div class="mb-3 A1">
          <label for="inputEmail3" class="form-label">
            Office Type
          </label>

          <Select
            value={officeTypeid}
            onChange={(e) => setOfficeTypeId(e.target.value)}
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
            to={routeNames.OFFICELEVEL}
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
export default CreateOfficeLevel;
