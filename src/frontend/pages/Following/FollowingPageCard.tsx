import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import coverPhoto from "../../material/images/create-page-cover-photo.png";
import { useNavigate } from "react-router";

const FollowingPageCard = ({ following }: any) => {
  const { toggle } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Box
      className="page-detail-card"
      style={{ color: toggle ? "#121212" : "#FFFFFF" }}
      onClick={() => navigate(`/${following?.custom_username}`)}
    >
      <Box
        className="page-cover-picture-container full-image-container"
        sx={{
          backgroundImage: `url(${following?.profile_image || coverPhoto})`,
        }}
      />
      <Stack direction="column" className="page-detail-body" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Avatar
            className="page-profile-container"
            src={following?.profile_image}
          />
          <Stack direction="column">
            <Typography
              variant="body2"
              style={{ color: toggle ? "#FFFFFF" : "#121212" }}
            >
              {following?.display_name}
            </Typography>
            <Typography
              variant="caption"
              className="link-text-color cursor-pointer"
              component="div"
              //   onClick={() => {
              //     navigateOnPage(subscription?.page?.page_name);
              //   }}
            >
              @{following?.custom_username}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FollowingPageCard;
