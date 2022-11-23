import React from 'react'
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

// const fullImageContainer = {
//         minHeight: "50px",
//         backgroundImage: `url(${listedUsers.member_details.profile_image})`,
//       };
      console.log("listed USers", listedUsers);
//     const filteredRestrictedUser = listedUsers.filter((listedUsers: any) => {
//         return listedUsers.user_block_type === "block";
//       });
// console.log(filteredRestrictedUser);
  return (
    <>
     <Box
        className="page-cover-picture-container full-image-container"
        // sx={fullImageContainer}
      />
      <Stack direction="column" className="page-detail-body" spacing={1}>
        {/* page profile details */}
        <Stack direction="row" spacing={1}>
          <Avatar
            className="page-profile-container"
            // src={listedUsers.member_details.profile_image}
          />
          <Stack direction="column">
            <Typography
              component={"p"}
            //   style={{ color: toggle ? "#FFFFFF" : "#121212" }}
            >
              {listedUsers.confine_user_details.display_name}
            </Typography>
            <Typography
              variant="caption"
              className="link-text-color cursor-pointer"
              component={"p"}
              // onClick={() => {
              //   navigateOnPage(subscription?.page?.page_name);
              // }}
            >
              {/* {`@${getStrippedWord(subscription?.page?.title)}`} */}
              {`@${listedUsers.confine_user_details.custom_username}`}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default AllRestrictedUser