/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Box, Card, CircularProgress, Grid, IconButton, Stack } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { SelectedMediaType } from './MediaList';

interface CustomInfiniteScrollForMediaProps {
  dataList: Array<Object>;
  totalData: number;
  fetchMoreData: () => void;
  onClickHandler: (media: SelectedMediaType) => void;
  loader: boolean;
  isModalOpen: boolean;
  selectedMedia: SelectedMediaType;
}

const CustomInfiniteScrollForMedia = ({
  dataList,
  totalData,
  onClickHandler,
  fetchMoreData,
  loader,
  isModalOpen,
  selectedMedia
}: CustomInfiniteScrollForMediaProps) => {
  return (
    <>
      {dataList && (
        <InfiniteScroll
          dataLength={dataList.length}
          next={fetchMoreData}
          loader={undefined}
          hasMore={dataList.length !== totalData}
          scrollableTarget="media-infinite-scroll-container"
        >
          <Grid container direction="row" spacing={0.5} className="page-media-container">
            {dataList.map((data: any) => (
              <>
                {data.type === 'image' ? (
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Card
                      className="image-cards card-container"
                      onClick={() =>
                        onClickHandler({
                          id: data.id,
                          media: data?.media,
                          type: data?.type,
                          userId: data?.user.id,
                          likePost: data?.like_post,
                          is_bookmarked: data?.is_bookmarked
                        })
                      }
                    >
                      <Box
                        className="full-image-container"
                        height={285}
                        sx={{ backgroundImage: `url(${data.media})` }}
                      />
                    </Card>
                  </Grid>
                ) : data.type === 'video' ? (
                  <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Card
                      className="video-cards card-container"
                      onClick={() =>
                        onClickHandler({
                          id: data.id,
                          media: data?.media,
                          type: data?.type,
                          userId: data?.user.id,
                          likePost: data?.like_post,
                          is_bookmarked: data?.is_bookmarked
                        })
                      }
                    >
                      {isModalOpen && selectedMedia?.id === data?.id ? null : (
                        <IconButton className="floating-play-icon">
                          <PlayArrowIcon />
                        </IconButton>
                      )}
                      <video width="100%" height="100%" autoPlay={false}>
                        <source src={data.media} id="video_here" />
                        Your browser does not support HTML5 video.
                      </video>
                    </Card>
                  </Grid>
                ) : (
                  <Stack justifyContent="center" alignItems="center" p={8}>
                    Type Formate of Media Doesn't Match
                  </Stack>
                )}
              </>
            ))}
            {loader
              ? Array.from({ length: 3 }, (e, i) => (
                  <Grid key={i} item xs={4} sm={4} md={4} lg={4} xl={4}>
                    <Stack
                      className="card-container loader-card"
                      justifyContent="center"
                      alignItems="center"
                      p={2}
                    >
                      <CircularProgress />
                    </Stack>
                  </Grid>
                ))
              : null}
          </Grid>
        </InfiniteScroll>
      )}
    </>
  );
};

export default CustomInfiniteScrollForMedia;
