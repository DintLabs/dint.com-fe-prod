import React from 'react'
import { useSelector } from "frontend/redux/store";
import {
    Avatar,
    Box,
    Button,
    CardHeader,
    IconButton,
    Typography,
  } from "@mui/material";
  import { Stack, useTheme } from "@mui/system";
  import { AiOutlineArrowLeft } from "react-icons/ai";
  import { useNavigate, useLocation } from "react-router-dom";
  import AddIcon from "@mui/icons-material/Add";
  import { useEffect, useState } from "react";
  import _axios from "frontend/api/axios"

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
  const backPageTitle = { display: "flex" };
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


const AddCloseFriend = () => {
    const userData = useSelector((state: any) => state.user);
    const navigate = useNavigate(); 
    const [selected, setSelected] = useState<any>([]);
    console.log("Userdata---", userData);
const [user, setUser] =useState();

    const [showButton, setShowButton] = useState(true);
    const onSelect = (list: any) => {
        if (selected.includes(list.id)) {
          const data = selected.filter((item: any) => {
            return item !== list.id;
          });
          setShowButton(true);  
          setSelected(data);
        } else{
          // {member: "",  user_custom_lists: state.id}
          setSelected([list.id]);
          setShowButton(false);
          setUser(list.id)
        //   const obj: any = {
        //     user_block_type: "restrict",
        //     main_user: userData?.userData?.id,
        //     confine_user: list.id,   
        //   };
        
          
      }
      };
      console.log("USER---", user);
    const addButtonClick = async () => {
        if (user){
          await _axios
            .post(`/api/add-member-in-list/`)
            .then((response: any) => {
              console.log("response", response.data);
              navigate(-1)
            })
        
            .catch((error: any) => {
              console.log(error);
            });
        }
      };

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
      sx={{ p: 1, justifyContent: "space-between" }}
    >
      <Box sx={backPageTitle}>
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
          Add User To Restrict
        </Typography>
      </Box>
      <Box sx={ButtonWrapper}>
        <Button disabled={showButton} onClick={addButtonClick}>
          Add
        </Button>
      </Box>
    </Stack>
    <Box sx={listWrapper}>
      { userData.following && userData.following[0] && userData.following.map((list: any, ind: any) => {
        return (
          <Box
            className={`listInnerWrapper ${
              selected.includes(list.id) ? "listSelect" : ""
            }`}
            onClick={() => {
              onSelect(list);
            }}
            key={ind}
            // onClick={() => onSelect(list)}
          >
            <CardHeader
              avatar={
                <Avatar>
                  <Typography
                    component={"img"}
                    src={
                      list.profile_image
                    }
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
  )
}


export default AddCloseFriend