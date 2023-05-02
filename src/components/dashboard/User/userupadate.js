import React, { useEffect, useState } from "react";
import axios from "axios";
import Createuser from "./createuser";
import { Modes } from "../../common/Constants/Modes";

export default function userupdate({ subjectID }) {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get(`http://122.176.101.76:8098/Get/${userId}`)
      .then((response) => {
        // console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <Createuser
          mode={Modes.edit}
          userData={userData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
