import { Button } from "@mui/material";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./scss/header.scss";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import routeNames from "../../../routes/routeName";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { Modes } from "../../common/Constants/Modes";
import { useEffect, useState } from "react";
import { Login } from "../../dashboard/Login/login";

export default function Header(props) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  // useEffect(() => {
  //   axios
  //     .get(`http://122.176.101.76:8098/api/UserProfile/Get/${props.Userid}`)
  //     .then((res) => {
  //       console.log(res.data, "abodptvjvhb");

  //       setUserData(res.data);
  //     });
  // }, []);

  const handleModal = async () => {
    let UserId = localStorage.getItem("UserId");
    console.log(UserId);
    if (UserId > 0) {
      let result = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}UserProfile/Get/${UserId}`
      );
      console.log(result, "Ram123");
      const option = {
        replace: true,
        state: {
          mode: Modes.edit,
          userData: result.data,
        },
      };
      navigate(routeNames.CREATEUSER, option);
    }
  };

  function Logout() {
    Swal.fire({
      title:
        "Select 'Logout' below if you are ready to end your current session.?",
      showCancelButton: true,
      icon: "warning",
      confirmButtonText: "Logout",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        navigate(routeNames.LOGIN).then((res) => {
          Swal.fire(res.data);
        });
      }
    });
  }

  return (
    <div className="header-main">
      <div id="content-wrapper" className="d-flex flex-column admin">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-dark bg-dark topbar static-top">
            {/* Sidebar Toggle (Topbar) */}

            <button
              id="sidebarToggleTop"
              className="btn btn-link d-lg-none rounded-circle mr-3"
            >
              <i className="fa fa-bars" />
            </button>
            <div
              style={{
                display: "flex",
                color: "white",
                marginLeft: "auto",
                position: "relative",
                right: "1vw",
              }}
            >
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">
                  <AdminPanelSettingsIcon />
                  Admin
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleModal()}>
                    <PersonIcon style={{ width: 18, height: 15 }} />
                    Edit Profile
                  </Dropdown.Item>

                  <hr style={{ marginTop: -1, marginBottom: -2 }} />
                  <Dropdown.Item>
                    <Button onClick={Logout}>LOGOUT</Button>
                    <LogoutIcon />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
