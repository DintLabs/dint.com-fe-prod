import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme, Stack, Box, Divider } from '@mui/material';
import { LikePostInterface, PostInterface } from 'frontend/interfaces/postInterface';
import { RootState } from 'frontend/redux/store';
import { isImage, isVideo } from 'frontend/utils';
import PostHeader from './PostHeader';
import PostContentText from './PostContentText';
import PostContentImage from './PostContentImage';
import PostContentVideo from './PostContentVideo';
import PostActions from './PostActions';
import PostDescription from './PostDescription';
import PostCommentsSection from './PostCommentsSection';
import AddCommentForm from '../AddCommentForm';

type PostItemProps = {
  post: PostInterface;
  onPostChange?: () => void;
  onPostDelete?: (postId: number) => void;
  onPostLike?: (likes: LikePostInterface[], postId: number) => void;
  onClickMedia?: (post: PostInterface) => void;
  isBookmarked?: boolean;
};

function PostItem({
  post: data,
  onPostChange,
  onPostDelete,
  isBookmarked,
  onPostLike,
  onClickMedia = () => {},
}: PostItemProps) {
  const theme = useTheme();
  const loggedInUser = useSelector((state: RootState) => state.user.userData);

  const [post, setPost] = React.useState<PostInterface>(data);

  const renderPostContent = () => {
    if (post.type === 'text') {
      return <PostContentText text={post.content} />;
    }

    if (post.type === 'image' && post.media && isImage(post.media)) {
      return (
        <PostContentImage
          src={post.media}
          alt={post.content}
          onClick={() => onClickMedia(post)}
        />
      );
    }

    if (post.type === 'video' && post.media && isVideo(post.media)) {
      return (
        <PostContentVideo
          src={post.media}
          onClick={() => onClickMedia(post)}
        />
      );
    }

    return <span>Failed to load the post</span>;
  };

  return (
    <Stack
      flexDirection="column"
      width="95%"
      maxWidth="500px"
      border={`1px solid ${theme.palette.grey[400]}`}
      borderRadius="10px"
      margin="0 2.5% 30px"
    >
      <PostHeader author={post.user} createdAt={post.created_at} />
      {renderPostContent()}
      <PostActions
        post={post}
        setPost={setPost}
        onPostChange={onPostChange}
        onPostDelete={onPostDelete}
        isBookmarked={isBookmarked}
        onPostLike={onPostLike}
      />
      <PostDescription
        likesCount={post.total_likes ?? 0}
        userName={post.user.custom_username}
        showDescription={!!post.media && (isVideo(post.media) || isImage(post.media))}
        descriptionText={post.content}
      />

      <PostCommentsSection comments={post.post_comment ?? []} />
      <Divider sx={{ mx: 2 }} />
      <Box sx={{ px: 2, py: 1 }}>
        <AddCommentForm
          postId={post.id}
          emojiPickerPlacement="top"
          onAfterSaveComment={({ comment }) => {
            setPost((prevState) => ({
              ...prevState,
              post_comment: [
                ...(prevState.post_comment || []),
                { ...comment, user: loggedInUser as any },
              ],
            }));
          }}
        />
      </Box>
    </Stack>
  );
}

export default PostItem;
