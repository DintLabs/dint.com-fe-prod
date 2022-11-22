import React from "react";
import SubscribeButton from "frontend/components/view-page/SubscribeButton";
import { Avatar, Box, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";

const pageDetailCard = {
  color: "#121212",
  border: "1px solid #121212",
  borderRadius: "5px",
  overflow: "hidden",

  "& .page-detail-body": { p: "10px 10px" },
};

const FollowingSelectList = ({ listedUsers }: any) => {
  const fullImageContainer = {
    minHeight: "50px",
    backgroundImage: `url(${listedUsers.member_details.profile_image})`,
  };
  console.log("listed USers", listedUsers);
  return (
    <Box
      className="page-detail-card"
      sx={pageDetailCard}
      // ref={lastBundleRef}
    >
      {/* page cover image */}
      <Box
        className="page-cover-picture-container full-image-container"
        sx={fullImageContainer}
      />
      <Stack direction="column" className="page-detail-body" spacing={1}>
        {/* page profile details */}
        <Stack direction="row" spacing={1}>
          <Avatar
            className="page-profile-container"
            src={listedUsers.member_details.profile_image}
          />
          <Stack direction="column">
            <Typography
              variant="body2"
              // style={{ color: toggle ? "#FFFFFF" : "#121212" }}
            >
              {listedUsers.member_details.display_name}
            </Typography>
            <Typography
              variant="caption"
              className="link-text-color cursor-pointer"
              component="div"
              // onClick={() => {
              //   navigateOnPage(subscription?.page?.page_name);
              // }}
            >
              {/* {`@${getStrippedWord(subscription?.page?.title)}`} */}
              {listedUsers.member_details.custom_username}
            </Typography>
          </Stack>
        </Stack>
        <SubscribeButton
          leftTitle="SUBSCRIBED"
          rightTitle={
            // subscription?.total_amount
            //   ? `$ ${subscription?.total_amount}`
            //   : "FOR FREE"
            "testing"
          }
          disabled
        />
        {/* expiry details */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" className="secondary-text-color">
            Expires
          </Typography>
          <Typography
            variant="caption"
            // style={{ color: toggle ? "#FFFFFF" : "#121212" }}
          >
            Oct 9, 2021
          </Typography>
        </Stack>
        {/* view more bundles */}
        {/* {subscription?.page?.subscription_tier_page?.length > 0 ? (
          <ViewMoreDivider
            title="View bundles"
            handleToggleView={handleToggleView}
            showLess={showLess}
          />
        ) : null}
        {!showLess ? (
          <Stack direction="column" spacing={2}>
            {subscription?.page?.subscription_tier_page?.map((bundle: any) => (
              <SubscribeButton
                key={bundle?.id}
                leftTitle={`${bundle?.validity_in_months} months (${bundle?.discount}% off)`}
                rightTitle={`$${bundle?.discount_price} total`}
                disabled
              />
            ))}
          </Stack>
        ) : null} */}
      </Stack>
    </Box>
  );
};

export default FollowingSelectList;
