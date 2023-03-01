import { Avatar, Modal, Typography } from "@mui/material";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import ShowStories from "frontend/pages/Lounge/ShowStories";
import { RootState } from "frontend/redux/store";
import { useContext, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Stories from "react-insta-stories";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";

const StoriesUserOwn = ({createUserStories}: any) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { toggle } = useContext(ThemeContext);
  const { userOwnStories } = useSelector((state: RootState) => state.lounge);
  const { userData } = useSelector((state: RootState) => state.user);
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);

  const objStoriesItem = {
    custom_username: userData?.custom_username,
    display_name: userData?.display_name,
    id: userData?.id,
    profile_image: userData?.profile_image,
    user_stories: userOwnStories,
  };

   useLayoutEffect(() => {
      function updateWidth() {
          setWidthScreen(window.screen.width);
      }
      window.addEventListener('resize', updateWidth);
      updateWidth();
      return () => window.removeEventListener('resize', updateWidth);
    }, []);

  if (!userOwnStories || userOwnStories.length === 0) return null;

  return (
    <>
      <div
        // style={{ textAlign: "center", width: "fit-content" }}
        // className="user-story"
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <Avatar
          className="story-avatar"
          src={userData?.profile_image}
          sx={{
            width: 92,
            height: 92,
            borderWidth: "3px",
            borderStyle: "solid",
            borderColor: toggle ? "#4AA081" : "#4AA081",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "600",
            marginTop: "10px",
            color: toggle ? "text.primary" : "#161C24",
          }}
        >
          {userData?.display_name}
        </Typography>
      </div>
      {openModal && (
        <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        >
          {/* <ShowStories
            widthScreen={widthScreen}
            item={objStoriesItem}
            image={userOwnStories}
            setOpenModal={setOpenModal}
          /> */}
          <Box 
            sx={{
              position: 'relative',
              outline: 'none',
              '@media screen and (max-width: 899px)': {
                height: '100%', width: '100%', display: 'flex', alignItems: 'center'
              },
            }}
          >
            <Stories
              keyboardNavigation
              stories={createUserStories(objStoriesItem)}
              onStoryEnd={(s: any, st: any) => console.log("story ended", s, st)}
              onAllStoriesEnd={(s: any, st: any) => setOpenModal(false)}
              onStoryStart={(s: any, st: any) => console.log("story started", s, st)}
              width={widthScreen < 900 ? "100%" : undefined}
              height={widthScreen < 900 ? "100%" : undefined}
            />
            <CloseIcon
              onClick={() => setOpenModal(false)} 
              style={{ 
                cursor: 'pointer',
                color: 'white',
                zIndex: 9999,
                position: 'absolute',
                top: '25px',
                right: '15px'
              }} 
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default StoriesUserOwn;
