import React from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "frontend/redux/store";
import { useEffect, useState } from "react";
import _axios from "frontend/api/axios";
import FollowingSelectList from "./FollowingSelectList";
import DeleteIcon from "@mui/icons-material/Delete";


const addIconWrapper = {
  minHeight: "112px",
  height: "100%",
  "& span": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  // cursor: "pointer",
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
const DeleteViewBtnWrapper = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  pl: "10px",
  pr: "10px",
  pb: "10px",

  "& svg": { cursor: "pointer" }, 
};

const UserList = (props: any) => {
  const { state } = useLocation();
  const [allAddedUser, setAllAddedUser] = useState([]);
  const [selected, setSelected] = useState<any>([]);

  

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const { data } = await _axios.get(`api/user-list/${state.list}`);

      setAllAddedUser(data.data);
    } catch (err: any) {
      console.error("err ===>", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const deleteUser = async (listedUsers: any) => {
    if (listedUsers.id) {
      await _axios
        .delete(`/api/add-member-in-list/${listedUsers.id}`, listedUsers.id)
        .then((response: any) => {
          console.log("response", response.data);
          fetchData();
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  
  console.log("listed----", allAddedUser )
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
            {state.name}
          </Typography>
        </Box>
       
      </Stack>
      <Box sx={CardWrapper}>
        <Grid container spacing={2}>
          {allAddedUser?.map((listedUsers: any) => (
            <Grid
              key={listedUsers?.id}
              item
              sm={12}
              md={6}
              lg={4}
            >
              <Box
                className={`page-detail-card ${
                  selected.includes(listedUsers.id) ? "UserSelect" : ""
                }`}
                sx={pageDetailCard}
              >
                <FollowingSelectList
                  listedUsers={listedUsers}
                  selectedUsers={selected}
                />
                 <Box sx={DeleteViewBtnWrapper}>
                  <Box sx={ButtonWrapper}>
                    <Button
                      onClick={() =>
                        navigate(`/${listedUsers?.member_details.custom_username}`)
                      }>
                      View{" "}
                    </Button>
                  </Box>
                  <DeleteIcon
                    onClick={() => {
                      deleteUser(listedUsers);
                    }}
                  />
                </Box>
              </Box>
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
