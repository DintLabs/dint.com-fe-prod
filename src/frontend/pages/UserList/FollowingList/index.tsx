import React from "react";
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
import PlaceHolder from "../../../assets/img/web3/images.jpeg";

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

const FollowingList = () => {
  const userData = useSelector((state: any) => state.user);

  const [allFollowing, setAllFollowing] = useState([]);
  const [allAddedUser, setAllAddedUser] = useState([]);
  const [addUser, setAddUser] = useState([]);
  const [userToAdd, setUserToAdd] = useState([]);

 
  const { state } = useLocation();

  console.log("state", state);

  useEffect(() => {
    console.log("addUser", addUser)
  }, [addUser])

  const [user, setUser] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [selected, setSelected] = useState([]);

  const onSelect = (list: any) => {
    // if (selected.includes(list.id)) {
    //   // const data = selected.filter((item) => {
    //   //   return item !== list.id;
    //   // });

    //   setSelected(data);
    
      
    // } else{
      // {member: "",  user_custom_lists: state.id}
      setSelected([list.id]);
      const obj: any = {
        member: list.id,
        user_custom_lists: state.id,  
      };
      setUser(obj);
      
      
  // }
  };

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
  //   const {state} = useParams()
  // const { state } = useLocation();
  // console.log("state", state);
  // to fetch the page's subscribers details
//   const handlechange = (index: any) => {
//     // console.log("clicked", index);
//     // console.log("lll", allFollowing[index]);
//     setAddUser(userToAdd[index]);
// setSelected(userToAdd);
//     const obj: any = {
//       member: addUser.id,
//       user_custom_lists: state.id,  
//     };
//     setUser(obj);
//     console.log("datatat", user);
//   };

  const navigate = useNavigate();

  const addButtonClick = async () => {
    if (user) {
      await _axios
        .post(`https://bedev.dint.com/api/add-member-in-list/`, user)
        .then((response: any) => {
          console.log("response", response.data);
          navigate(-1)
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  // const fetchListData = async () => {
  //   try {
  //     const { data } = await _axios.get(
  //       "https://bedev.dint.com/api/user-list/"
  //     );

  //     console.log("data", data);
  //     setListdata([...data]);
  //     setMemberId(listData[0]?.user);
  //     setListId(listData[0]?.id);
  //   } catch (err: any) {
  //     console.error("err ===>", err.message);
  //   }
  //   setIsLoading(false);
  // };

  // useEffect(() => {
  //   fetchListData();
  // }, []);


  const fetchListedUserData = async () => {
    try {
      const { data } = await _axios.get(`api/user-list/${state.id}`);

      console.log("users added", data);
      setAllAddedUser(data.data);
    } catch (err: any) {
      console.error("err ===>", err.message);
    }
  };

  useEffect(() => {
    fetchListedUserData();
  }, []);
  const filterData = (allFollowing: any, allAddedUser: any)=>{
    let res = [];
    res = allFollowing.filter(el => {
      return !allAddedUser.find(element => {
         return element.member_details.id === el.id;
        });
      });
      console.log("res", res);
setUserToAdd(res)
      return res;
      
      
  }
console.log("lllllll",  user, addUser.id, userToAdd);
console.log("slected-----", user);

useEffect(()=>{
  filterData(allFollowing, allAddedUser)
},[allFollowing, allAddedUser])


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
            Add User To {state?.name}
          </Typography>
        </Box>
        <Box sx={ButtonWrapper}>
          <Button disabled={false} onClick={addButtonClick}>
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
                // handlechange(ind);
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
                        list.profile_image ? list.profile_image : PlaceHolder
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
  );
};

export default FollowingList;