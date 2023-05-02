import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateTitle from "./createtitle";
import { Modes } from "../../common/Constants/Modes";

export default function UpdateTitle({ id }) {
  const [titleData, setTitleData] = useState({});
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_BASE_URL}Title/GetTitle/${id}`
      )
      .then((response) => {
        // console.log(response.data);
        setTitleData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {
        <CreateTitle
          mode={Modes.edit}
          titleData={titleData}
          style={{ overflow: "auto" }}
        />
      }
    </div>
  );
}
