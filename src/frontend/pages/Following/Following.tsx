import React from "react";
import _axios from "frontend/api/axios";
import { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Box,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { RootState, useDispatch, useSelector } from "frontend/redux/store";
import { ThemeContext } from "../../contexts/ThemeContext";
import Sidebar from "../Lounge/Sidebar";

const listWrapper = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  p: "10px",
  "& .listInnerWrapper": {
    mr: "10px",
    ml: "10px",
    mb: "15px",
    border: "1px solid #000",
    borderRadius: "50px",
    cursor: "pointer",
    "& > .MuiCardHeader-root": {
      p: "7px 20px",
      "& .MuiCardHeader-avatar > .MuiAvatar-circular": {
        border: "2px solid #ffffff",
      },
      "& img": { width: "100%", height: "100%" },
    },
  },
  "& .listSelect": {
    backgroundColor: "#000",
    border: "1px solid #000",
    "& > .MuiCardHeader-root": {
      "& img": { width: "100%", height: "100%" },
      "& .MuiCardHeader-content > span": { color: "#ffffff" },
    },
  },
};
const Following = () => {
  const dispatch = useDispatch();
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
  const navigate = useNavigate();
  const { selectedMenu } = useSelector(
    (rootState: RootState) => rootState.newHome
  );
  const user = useSelector((state: RootState) => state.user.userData);

  const [showMoreDrawer, setShowMoreDrawer] = useState(false);

  const [clicked, setClicked] = useState(false);
  

  const translate = () => {
    setTimeout(() => {
      const selectedLanguage = localStorage.getItem("selectedLanguage");
      if (selectedLanguage !== null && selectedLanguage !== "en") {
        const languageDropdown = $(".goog-te-combo");
        languageDropdown.val(selectedLanguage);
        languageDropdown[0].dispatchEvent(new Event("change"));
      }
    }, 10);
  };
  const { toggle } = useContext(ThemeContext);

  useEffect(() => {
    if (clicked) {
      // do something meaningful, Promises, if/else, whatever, and then
      window.location.assign("https://paydev.dint.com");
    }
  });
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <Sidebar />
        </Grid>
        <Grid item md={9}>
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
                Following
              </Typography>
            </Stack>
            <Box sx={listWrapper}>
              {allFollowing.map((list: any, ind) => {
                return (
                  <Box
                    // className={`listInnerWrapper ${
                    //   selected.includes(list.id) ? "listSelect" : ""
                    // }`}
                    // key={ind}
                    // onClick={() => onSelect(list)}
                  >
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
        </Grid>
      </Grid>
    </>
  );
};

export default Following;
