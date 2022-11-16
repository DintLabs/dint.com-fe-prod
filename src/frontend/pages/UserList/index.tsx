import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const addIconWrapper = {
  p: "10px",
  "& span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "150px",
    height: "150px",
    border: "1px solid #000",
    borderRadius: "5px",
    backgroundColor: "#0000000f",
    transition: "all 0.5s ease",
    cursol: "pointer",
    "&:hover": {
      backgroundColor: "#212b364d",
    },
    "&:hover svg": {
      color: "#fff",
    },
  },
};

const UserList = () => {
  //   const {state} = useParams()
  const { state } = useLocation();
  console.log("state", state);

  const navigate = useNavigate();

  return (
    <Stack
      className="subscriptions-page-container"
      sx={{
        borderLeft: `1px solid #000`,
        borderRight: `1px solid #000`,
        position: "relative",
      }}
    >
      {/* main header */}
      <Stack
        direction="row"
        alignItems="center"
        className="container-header"
        spacing={2}
        sx={{ p: { xs: 1, md: 1, xl: 1 } }}
      >
        <IconButton
          className="primary-text-color"
          size="small"
          onClick={() => navigate(-1)}
        >
          <AiOutlineArrowLeft className="primary-text-color" />
        </IconButton>
        <Typography
          className="primary-text-color"
          textTransform="uppercase"
          variant="subtitle1"
          sx={{ pt: 0.25, ml: "10px !important" }}
        >
          {state.name}
        </Typography>
      </Stack>
      <Box sx={addIconWrapper}>
        <Typography
          component={"span"}
          onClick={() => navigate("/following-list") }
        >
          <AddIcon 
/>
        </Typography>
      </Box>
    </Stack>
  );
};

export default UserList;
