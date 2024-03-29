import { Grid, Stack } from "@mui/material";
import { Col } from 'react-bootstrap';

import Submenu from 'frontend/components/submenu';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import React, { useEffect, useState } from 'react';
import _axios from '../../../api/axios';
import { GetUserBookmark } from "../../../hooks/bookmark";
import { postTypes } from "../../../data";
import MediaList from "../../../components/view-page/MediaList";

const Videos = () => {
  const {data:bookmarkedPosts, loading:isLoading} = GetUserBookmark(postTypes.video.value)
  return (
    <Grid container>
      <Submenu title="VIDEOS" username="" routes={[]} noTag md={12} />

      {/*<FlexRow fWrap="wrap">
        {!isLoading && bookmarkedPosts.map((video, i) => (
          <Col lg={4} md={6} sm={12} key={`${video}_${i}`} style={{height:"200px"}}>
            <video height="auto" width="100%" controls>
              <source src={video?.media} id="video_here" height="100%"/>
              <track src={video?.media} kind="captions" srcLang="en" label="english_captions"/>
            </video>
          </Col>
        ))}
      </FlexRow>*/}
      <Stack
        direction="column"
        className="center-page-container"
        id="media-infinite-scroll-container"
        sx={{ width: '100%' }}
      >
        {bookmarkedPosts[0] && bookmarkedPosts?.length &&
          <MediaList
            mediaList={bookmarkedPosts}
            totalMedia={bookmarkedPosts?.length}
            mediaType="image"
            fetchMoreMedia={()=>{}}
            loader={isLoading}
          />
        }
      </Stack>
    </Grid>
  );
};

export default Videos;
