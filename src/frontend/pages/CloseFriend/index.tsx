import React, {useState, useEffect} from 'react'
import _axios from "frontend/api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { set } from 'react-hook-form';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { AiOutlineArrowLeft } from "react-icons/ai";
import AddIcon from "@mui/icons-material/Add";
import AllCloseFriend from './AllCloseFriend';

const addIconWrapper = {
  height: "100%",
  "& span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // width: "150px",
    // minHeight: "275px",
    height: "100%",
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
const CardWrapper = { p: "15px" };
const ButtonWrapper = {
  "& button": {
    backgroundColor: "#000000",
    color: "#ffffff",
    border: "1px solid #000",
    "&:hover": { backgroundColor: "#ffffff", color: "#000000" },
  },
  "& button.Mui-disabled": {
    backgroundColor: "#636363",
    border: "1px solid #636363",
    "&:hover": { color: "#919EAB", border: "1px solid #636363" },
  },
};
const pageDetailCard = {
  color: "#121212",
  border: "1px solid #121212",
  borderRadius: "5px",
  overflow: "hidden",
  cursor: "pointer",
  "&.UserSelect": {
    backgroundColor: "#000",
    border: "1px solid #000",
    "& p, span": { color: "#ffffff" },
    "& .disabled-outlined-button-div": { borderColor: "#ffffff" },
    "& .MuiAvatar-circular": { border: "2px solid #ffffff" },
  },

  "& .page-detail-body": { p: "10px 10px" },
};
const BackBTNWrapper = { display: "flex", alignItems: "center" };

const CloseFriend = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const[closeFriendList, setCloseFriendList] = useState<any>([]);

  const fetchCloseFriend = () => {
setCloseFriendList(state.allCloseFriend);
  }
  useEffect(() => {
    fetchCloseFriend();
  }, [state]);
  console.log("closef----", closeFriendList);

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
      justifyContent="space-between"
      spacing={2}
      sx={{ p: { xs: 1, md: 1, xl: 1 } }}
    >
      <Box sx={BackBTNWrapper}>
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
         Close Friends
        </Typography>
      </Box>
      {/* <Box sx={ButtonWrapper}>
        <Button disabled={showButton} onClick={deleteUser}>Remove</Button>
      </Box> */}
    </Stack>
    <Box sx={CardWrapper}>
      <Grid container spacing={2}>
        {closeFriendList?.map((listedUsers: any) => (
          <Grid
            key={listedUsers?.id}
            item
            sm={12}
            md={6}
            lg={4}
            // onClick={() => {
            //   onSelect(listedUsers);
            // }}
          >
            <Box
              // className={`page-detail-card ${
              //   selected.includes(listedUsers.id) ? "UserSelect" : ""
              // }`}
              // sx={pageDetailCard}
            >
              <AllCloseFriend
                listedUsers={listedUsers}
                // selectedUsers={selected}
              />
            </Box>
          </Grid>
        ))}
        <Grid item sm={12} md={6} lg={4}>
          <Box sx={addIconWrapper}>
            <Typography
              component={"span"}
              onClick={() =>
                navigate("/add-close-friends/", {state: { addedUsers: closeFriendList}})
              }
            >
              <AddIcon />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  </Stack>
  )
}

export default CloseFriend;