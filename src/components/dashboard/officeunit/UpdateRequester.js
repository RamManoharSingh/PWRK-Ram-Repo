import React, { useEffect, useState } from "react";
import axios from "axios";
import Createrequester from "./createofficeunit";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateRequester({ requesterID }) {
  const [requesterData, setRequesterData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}Requester/GetRequesterByID?RequesterID=${requesterID}`
      )
      .then((response) => {
        // console.log(response.data);
        setRequesterData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <Createrequester
          mode={Modes.edit}
          requesterData={requesterData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
