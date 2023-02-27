

import { Avatar, Box, Typography } from "@mui/material";
import DINT_LOGO from "../../assets/img/logos/logo.png";
import '../../material/signup.css'
import { useEffect } from "react";

const Loading = () => {
    useEffect(()=>{
        document.getElementById("secondary-footer")?.classList.add('d-none')
    })
  return (
    <Box
      sx={{
        height: "100vh",

        margin: "auto",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Typography>This is loading page </Typography> */}
        <div className="linear">

        <Avatar
          src={DINT_LOGO}
        />
        </div>
        
      </Box>
    </Box>
  );
};

export default Loading;
