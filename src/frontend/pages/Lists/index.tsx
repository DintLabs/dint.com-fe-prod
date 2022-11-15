import * as React from "react";

import {
  Avatar,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Submenu from "frontend/components/submenu";
import GridWithBoxConteiner from "frontend/reusable/GridWithBoxConteiner";
import { FlexCol, FlexRow } from "frontend/reusable/reusableStyled";
import SortIcon from "@mui/icons-material/Sort";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { useState } from "react";
import _axios from "frontend/api/axios";
import { useSelector } from "frontend/redux/store";
const PopupStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const PopupInnerContant = {
  position: "relative",
  "& h4": { color: "#ffffff", marginBottom: "25px" },
  "& .SaveBTN": { textAlign: "end", marginTop: "8px" },
  "& form": {
    "& .MuiFormControl-root.MuiTextField-root": { width: "100%" },
    "& label": {
      backgroundColor: "#212b36",
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
};

const Lists = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const goToProfile = () => {
    // navigate(`/${data?.follower?.custom_username}`);
  };
  const obj: any = {
    name: "",
    user: 2,
  };
  const [user, setUser] = React.useState<any>(obj);

  const [userList, setUserList] = useState([]);
  console.log("user", user);

  const handleChange = ({ target: { value, name } }: any) => {
    const newUser = { ...user };
    newUser[name] = value;
    setUser({ ...newUser });
  };
  const handleSubmit = async () => {
    await _axios
      .post(`https://bedev.dint.com/api/user-list/`, user)
      .then((response: any) => {
        console.log("response", response.data);
        setUserList([...userList, { ...response.data }] as any);
        handleClose()
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  const userId = useSelector((state) => state);

  // React.useEffect(()=>{
  //  _axios.get(`https://bedev.dint.com/api/user-list/`)
  //     .then((response) => {
     
  //       setUserList([...userList, { ...response.data }]);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },[])

  return (
    <>
      <Grid container>
        <>
          {isLargeScreen ? (
            <Submenu
              handleOpen={handleOpen}
              handleClose={handleClose}
              title="Lists"
              username=""
              routes={[]}
              md={12}
              isPlusIco
            />
          ) : (
            <>
              {location.pathname !== `/settings` && (
                <IconButton onClick={() => navigate(-1)}>
                  <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
                </IconButton>
              )}
            </>
          )}
        </>

        <Grid container sx={{ position: "relative" }}>
          <GridWithBoxConteiner sx={{ borderBottom: "none" }}>
            <FlexRow w="100%" jc="space-between" ai="center">
              <Typography
                className="primary-text-color"
                variant="caption"
                sx={{ fontWeight: "bold", fontSize: "13px" }}
              >
                CUSTOM ORDER
              </Typography>

              <SortIcon />
            </FlexRow>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Close Friends
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                1 person • 235 posts
              </Typography>
            </FlexCol>
            <Avatar
              onClick={goToProfile}
              src="/icons/img/example.jpg"
              sx={{ width: 50, height: 50, cursor: "pointer" }}
            />
          </GridWithBoxConteiner>

          <GridWithBoxConteiner
            onClick={() => {
              // dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.SUBSCRIPTIONS }));
              navigate("/lounge/subscriptions");
            }}
          >
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Subscriptions
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                10 person • 4,0K posts
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner
            onClick={() => navigate("/lounge/subscriptions")}
          >
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Following
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                10 person • 4,0K posts
              </Typography>
            </FlexCol>
            <Avatar
              onClick={goToProfile}
              src="/icons/img/example.jpg"
              sx={{ width: 50, height: 50, cursor: "pointer" }}
            />
          </GridWithBoxConteiner>

          <GridWithBoxConteiner
            onClick={() => {
              navigate("/followers");
            }}
          >
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Followers
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                10 person • 4,0K posts
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner onClick={() => navigate("/bookmarks")}>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Bookmarks
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                empty
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Restricted
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                empty
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                Blocked
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                empty
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>

          <GridWithBoxConteiner>
            <FlexCol>
              <Typography
                className="primary-text-color typo-label"
                variant="subtitle2"
              >
                test
              </Typography>
              <Typography
                className="primary-text-color typo-label"
                variant="caption"
              >
                empty
              </Typography>
            </FlexCol>
          </GridWithBoxConteiner>
          {/* <Routes>
          <Route
            path="/"
            element={isLargeScreen ? <></> : <Submenu title="Lists" username="" routes={[]} />}
          />
          Main routers
          <Route path="/bookmarks/all-bookmarks" element={<ProfileSettings />} />
        </Routes> */}
          {/* </Grid> */}
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={PopupStyle}>
            <Box sx={PopupInnerContant}>
              <Typography component="h4">Create New List</Typography>
              <Box component={"form"}>
                <TextField
                  onChange={handleChange}
                  label="Enter List Name"
                  type="text"
                  name="name"
                  value={user.name}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box className="SaveBTN">
                <Button>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Lists;
