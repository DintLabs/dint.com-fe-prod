import React, { useMemo } from 'react'
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
  import { useSelector } from "frontend/redux/store";
  
  import _axios from "frontend/api/axios";
import { setUserData } from 'frontend/redux/slices/user';
import AllFollowers from '../Followers/AllFollowers';

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


const AddBlockedUsers = () => {

const navigate = useNavigate(); 
const [allFollowers, SetAllFollowers] = useState([]);
const userData = useSelector((state: any) => state.user);
const [user, setUser] = useState([]);
const [selected, setSelected] = useState<any>([]);
const [showButton, setShowButton] = useState(true);
const { state } = useLocation();
const allAddedUsers = state.addedUsers;
const [userToAdd, setUserToAdd] = useState([]);
const [confineUser, setConfineUser] = useState([]);

const onSelect = (list: any) => {
    if (selected.includes(list.id)) {
      const data = selected.filter((item: any) => {
        return item !== list.id;
      });
      setShowButton(true);  
      setSelected(data);
    } else{
      setSelected([list.id]);
      setShowButton(false);
      const obj: any = {
        user_block_type: "block",
        main_user: userData?.userData?.id,
        confine_user: list.id,   
      };
      setUser(obj); 
      
  }
  };

  const fetchData = async () => {
    try {
      const { data } = await _axios.get("api/connection/get-follower-list/");
      if (data.code === 200) {
        SetAllFollowers(data.data);
      }
    } catch (err: any) {
      console.error("err ===>", err.message);
    }
   
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchConfineData = async () => {
    try {
      const { data } = await _axios.get(`api/confine-user`);

      console.log("users added", data);
      setConfineUser(data);

    } catch (err: any) {
      console.error("err ===>", err.message);
    }
  };

  useEffect(() => {
    fetchConfineData();
  }, []);
  const filteredBlockedUser = useMemo(()=> confineUser?.filter((confineUser: any) => confineUser.user_block_type === "block"),[confineUser])
  const addButtonClick = async () => {
    if (user) {
      await _axios
        .post(`/api/confine-user/`, user)
        .then((response: any) => {
          console.log("response", response.data);
          navigate(-1)
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };
  const filterData = (allFollowers: any, filteredBlockedUser: any)=>{
    let res = [];
    res = allFollowers?.filter((el: any) => {
      return !filteredBlockedUser?.find((element: any) => {
         return element.confine_user_details.id === el.id
         ;
        });
      });
      console.log("res", res);
setUserToAdd(res)
      return res; 
  }
 

useEffect(()=>{
  filterData(allFollowers, filteredBlockedUser)
},[allFollowers, filteredBlockedUser])

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
          Add User To Block
        </Typography>
      </Box>
      <Box sx={ButtonWrapper}>
        <Button disabled={showButton} onClick={addButtonClick}>
          Add
        </Button>
      </Box>
    </Stack>
    <Box sx={listWrapper}>
      { userToAdd && userToAdd[0] && userToAdd.map((list: any, ind) => {
        return (
          <Box
            className={`listInnerWrapper ${
              selected.includes(list.id) ? "listSelect" : ""
            }`}
            onClick={() => {
              onSelect(list);
            }}
            key={ind}
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

export default AddBlockedUsers