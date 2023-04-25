import { Box, Grid, useTheme } from '@mui/material';
import Submenu from 'frontend/components/submenu';
import { postTypes } from "../../../data";
import PostItem from 'frontend/pages/Lounge/PostItem/PostItem';
import PostItemSkeleton from "../../../components/common/skeletons/PostItemSkeleton";
import { FlexRow } from "../../../reusable/reusableStyled";
import { GetUserBookmark } from "../../../hooks/bookmark";

const Other = () => {
  const theme = useTheme();
  const { data = [], loading, setData } = GetUserBookmark(postTypes.text.value);

  return (
    <Grid container
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`
      }}
    >
      <Submenu title="OTHER" username="" routes={[]} noTag md={12} />
      <FlexRow gap="5px" fWrap="wrap" style={{ width: "100%"}}>
        <Box style={{ width: '100%', paddingTop: '10px' }}>
          {data.map((post: any) => (
            <PostItem
              key={post?.id}
              post={post}
              onPostCommentsChange={(postId, comments) => {
                setData(data.map((post) => {
                  if (post.id !== postId) {
                    return post;
                  }

                  return { ...post, post_comment: comments };
                }));
              }}
              onPostLike={(postId, likes) => {
                setData(data.map((post) => {
                  if (post.id !== postId) {
                    return post;
                  }

                  return {
                    ...post,
                    like_post: likes,
                    total_likes: likes.length,
                  };
                }));
              }}
              onPostBookmark={(postId, bookmarked) => {
                if (!bookmarked) {
                  setData(data.filter((post) => post.id !== postId));
                }
              }}
              onPostDelete={(postId) => {
                setData(data.filter((post) => post.id !== postId));
              }}
            />
          ))}

          {loading && (
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          )}
        </Box>
      </FlexRow>
    </Grid>
  );
};

export default Other;
