import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory()
  const handleSubmit = async () => {
    var config = {
      method: "post",
      url: "/api/v1/openvidu/create",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      data: {},
    };

    const {data} = await axios(config)
    
    history.push(`/call/${data}`)
  };

  return (
    <div>
      <h1>HOMEPAGE</h1>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className=""
        onClick={handleSubmit}
      >
      Start Call
      </Button>
    </div>
  );
}

export default Home;