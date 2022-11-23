import { Box } from '@mui/material';
import React, {useState, useEffect} from 'react'
import { Button } from 'react-bootstrap';
import _axios from "frontend/api/axios";
const CloseFriend = () => {
    const [allFollowing, setAllFollowing] = useState([]);
    const fetchData = async () => {
        
        try {
          const { data } = await _axios.get("api/connection/get-following-list/");
          if (data.code === 200) {
            setAllFollowing(data.data);
          }
        } catch (err: any) {
          console.error("err ===>", err.message);
        }
      
      };
    
      useEffect(() => {
        fetchData();
      }, []);

    const addButtonClick = async () => {
        if (user) {
          await _axios
            .post(`/api/add-member-in-list/`, user)
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
    <Box>
    <Button  onClick={addButtonClick}>
      Add
    </Button>
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
  </Box>
  )
}

export default CloseFriend;