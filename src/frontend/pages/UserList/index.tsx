import React from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "frontend/redux/store";
import { useEffect, useState } from "react";
import _axios from "frontend/api/axios";
import FollowingSelectList from "./FollowingSelectList";

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

const UserList = (props: any) => {
  //   const {state} = useParams()
  const { state } = useLocation();
  const [allAddedUser, setAllAddedUser] = useState([]);
  console.log("state", state);
  console.log("state id", state.list);

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const { data } = await _axios.get(`api/user-list/${state.list}`);

      console.log("users added", data);
      setAllAddedUser(data.data);
    } catch (err: any) {
      console.error("err ===>", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("add users", allAddedUser);
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
      <Box sx={CardWrapper}>
        <Grid container spacing={2}>
          {allAddedUser?.map((listedUsers: any) => (
            <Grid key={listedUsers?.id} item sm={12} md={6} lg={4}>
              <FollowingSelectList listedUsers={listedUsers} />
            </Grid>
          ))}
          <Grid item sm={12} md={6} lg={4}>
            <Box sx={addIconWrapper}>
              <Typography
                component={"span"}
                onClick={() =>
                  navigate("/following-list", {
                    state: { name: state.name, id: state.list },
                  })
                }
              >
                <AddIcon />
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default UserList;
