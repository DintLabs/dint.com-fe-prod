import React from "react";
import { Avatar, Box, CardHeader, IconButton, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import _axios from "frontend/api/axios";

const listWrapper = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  p: "10px",
  "& .listInnerWrapper": {
    mr: "10px",
    ml: "10px",
    mb: "15px",
    border: "1px solid #000",
    borderRadius: "50px",
    "& > .MuiCardHeader-root": {
      p: "7px 20px",
      "& img": { width: "100%", height: "100%" },
    },
  },
};

const FollowingList = () => {
  const [allFollowing, setAllFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await _axios.get("api/connection/get-following-list/");
      if (data.code === 200) {
        setAllFollowing(data.data);
      }
    } catch (err: any) {
      console.error("err ===>", err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log("allFollowing", allFollowing);
  //   const {state} = useParams()
  const { state } = useLocation();
  console.log("state", state);
  // to fetch the page's subscribers details

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
          Add User To List {state?.name}
        </Typography>
      </Stack>
      <Box sx={listWrapper}>
        {allFollowing.map((list: any, ind) => {
          return (
            <Box className="listInnerWrapper" key={ind}>
              <CardHeader
                avatar={
                  <Avatar>
                    <Typography
                      component={"img"}
                      src={list.profile_image}
                      alt=""
                    />
                  </Avatar>
                }
                title={list.display_name}
                subheader={list.custom_username}
              />
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};

export default FollowingList;
