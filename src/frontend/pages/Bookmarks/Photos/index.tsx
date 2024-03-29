import { Grid,Stack } from '@mui/material';
import {Col} from  "react-bootstrap";
import Submenu from 'frontend/components/submenu';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import styled from 'styled-components';
import React, { useContext, useState } from 'react';
import {ThemeContext} from '../../../contexts/ThemeContext'
import { GetUserBookmark } from "../../../hooks/bookmark";
import { postTypes } from "../../../data";
import MediaList from "../../../components/view-page/MediaList";

const ImgStyled = styled.img`
  width: 100%;
`;

const Photos = () => {
  const { toggle } = useContext(ThemeContext);
  const {data:bookmarkedPosts, loading:isLoading} = GetUserBookmark(postTypes.image.value)
  const [isOpenFullMode, setIsOpenFullMode] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
/*
  const togglePhoto = (image:string) => {
    setIsOpenFullMode(!isOpenFullMode);
    setSelectedPhoto(image);
  }*/

  return (
    <Grid container>
      <Submenu title="PHOTOS" username="" routes={[]} noTag md={12} />
      <Stack
        direction="column"
        className="center-page-container"
        id="media-infinite-scroll-container"
        sx={{ width: "100%" }}
      >
        {bookmarkedPosts[0] && bookmarkedPosts.length && (
          <MediaList
            mediaList={bookmarkedPosts}
            totalMedia={bookmarkedPosts?.length}
            mediaType="image"
            fetchMoreMedia={() => {}}
            loader={isLoading}
          />
        )}
      </Stack>
      {/*<FlexRow fWrap="wrap" direction="row">
        {bookmarkedPosts && bookmarkedPosts.map((post, i) => (
          <Col key={`${post?.id}_${i}`} style={{width:"33%"}}>
            <ImgStyled
              onClick={() => togglePhoto(post?.media)}
              src={post?.media} alt="image"
              style={{border : !toggle && 'solid 1px #161C24', cursor: "pointer"}}
              width="100%" height="200px"
            />

            {isOpenFullMode && selectedPhoto && (
              <Stack
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: "0px",
                    left: "0",
                    top:"80px",
                    backgroundColor: toggle ? "black" : 'white',
                    cursor: "pointer"
                }}
                alignItems="center" justifyContent="center"
                onClick={() => setIsOpenFullMode(!isOpenFullMode)}>
              <ImgStyled

              src={selectedPhoto} alt="image"

              width="50%" height="80%"
            />
              </Stack>
            )}
          </Col>
        ))}
      </FlexRow>*/}
    </Grid>
  );
};

export default Photos;
