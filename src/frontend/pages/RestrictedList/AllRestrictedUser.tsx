import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";

const pageDetailCard = {
  color: "#121212",
  border: "1px solid #121212",
  borderRadius: "5px",
  overflow: "hidden",
  "&.UserSelect": {
    backgroundColor: "#000",
    border: "1px solid #000",
    "& > .MuiCardHeader-root": {
      "& img": { width: "100%", height: "100%" },
      "& .MuiCardHeader-content > span": { color: "#ffffff" },
    },
  },

  "& .page-detail-body": { p: "10px 10px" },
};

const AllRestrictedUser = ({ listedUsers, selectedUsers }: any) => {
  return (
    <>
      <Box className="page-cover-picture-container full-image-container" />
      <Stack direction="column" className="page-detail-body" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Avatar className="page-profile-container" />
          <Stack direction="column" sx={{ width: "100%" }}>
            <Typography
              component={"p"}
              sx={{
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "145px",
                overflow: "hidden",
              }}>
              {listedUsers.confine_user_details.display_name}
            </Typography>
            <Typography
              variant="caption"
              className="link-text-color cursor-pointer"
              component={"p"}>
              {`@${listedUsers.confine_user_details.custom_username}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default AllRestrictedUser;
