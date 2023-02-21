import { Avatar, Modal, Typography } from "@mui/material";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import ShowStories from "frontend/pages/Lounge/ShowStories";
import { RootState } from "frontend/redux/store";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";

const StoriesUserOwn = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { toggle } = useContext(ThemeContext);
  const { userOwnStories } = useSelector((state: RootState) => state.lounge);
  const { userData } = useSelector((state: RootState) => state.user);
  const [widthScreen] = useState<number>(window.screen.width);

  const objStoriesItem = {
    custom_username: userData?.custom_username,
    display_name: userData?.display_name,
    id: userData?.id,
    profile_image: userData?.profile_image,
    user_stories: userOwnStories,
  };

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
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
        >
          <ShowStories
            widthScreen={widthScreen}
            item={objStoriesItem}
            image={userOwnStories}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}
    </>
  );
};

export default StoriesUserOwn;
