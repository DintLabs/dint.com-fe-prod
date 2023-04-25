import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { FaHeart } from 'react-icons/fa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { LikePostInterface, PostInterface } from 'frontend/interfaces/postInterface';
import {
  addBookmarkForPost,
  addLikeForPost,
  deleteBookmarkForPost,
  postDelete,
  unlikeForPost,
} from 'frontend/redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'frontend/redux/store';
import TipPopUp from 'frontend/components/tip/TipPopUp';
import { useNavigate } from 'react-router';

type PostActionsProps = {
  post: PostInterface;
  onPostBookmark: (postId: number, bookmarked: boolean) => void;
  onPostLike: (postId: number, likes: LikePostInterface[]) => void;
  onPostDelete: (postId: number) => void;
};

function PostActions({
  post,
  onPostLike,
  onPostBookmark,
  onPostDelete,
}: PostActionsProps) {
  const loggedInUser = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [likeInProgress, setLikeInProgress] = React.useState<boolean>(false);
  const [liked, setLiked] = React.useState<boolean>(false);
  const [bookmarked, setBookmarked] = React.useState<boolean>(post.is_bookmarked ?? false);

  const [showSendTip, setShowSendTip] = React.useState<boolean>(true);
  const [canDeletePost, setCanDeletePost] = React.useState(false);
  const [tipDialogOpened, setTipDialogOpened] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (loggedInUser && loggedInUser.id === post.user.id) {
      setShowSendTip(false);
      setCanDeletePost(true);
    }
  }, [loggedInUser, post.user.id]);

  React.useEffect(() => {
    if (loggedInUser) {
      if (
        post?.like_post?.length > 0 &&
        post?.like_post?.find((item) => {
          if (!item) return false;
          return typeof item.user !== 'number'
            ? item.user?.id === loggedInUser.id
            : item.user === loggedInUser.id
        })
      ) {
        setLiked(true);
      }
    }
  }, [loggedInUser, post?.like_post]);

  React.useEffect(() => {
    const unsubscribe = toast.onChange((payload) => {
      if (payload.status === 'removed') {
        if (payload.content === 'Please login to continue') {
          navigate('/auth/login');
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLike = async () => {
    if (!loggedInUser || !loggedInUser.id) {
      toast.error('Please login to continue');
      return;
    }

    const currentTotalLikes = post?.total_likes ?? 0;

    if (liked) {
      setLikeInProgress(true);
      await dispatch(
        unlikeForPost(loggedInUser.id, post.id),
      );

      const newLikes = post.like_post.filter((item) => {
        if (typeof item.user === 'number') {
          return item.user !== loggedInUser.id;
        }

        return item.user.id !== loggedInUser.id;
      })
      const updatedPost = {
        ...post,
        like_post: newLikes,
        total_likes: currentTotalLikes - 1,
      };

      setLiked(false);
      onPostLike(updatedPost.id, newLikes)
      setLikeInProgress(false);
    } else {
      setLikeInProgress(true);
      const likeResp: LikePostInterface = await dispatch(
        addLikeForPost(loggedInUser.id, post.id)
      );

      const newLikes = [...(post?.like_post || []), likeResp];

      const updatedPost = {
        ...post,
        like_post: newLikes,
        total_likes: currentTotalLikes + 1,
      };
      setLiked(true);
      onPostLike(updatedPost.id, newLikes)
      setLikeInProgress(false);
    }
  };

  const sendBookmark = async () => {
    if (bookmarked) {
      toast.warn("You have Already bookmarked this post");
      return;
    }

    if (!loggedInUser || !loggedInUser.id) {
      toast.error('Please login to continue');
      return;
    }

    await dispatch(addBookmarkForPost(post.id));

    setBookmarked(true);
    onPostBookmark(post.id, true);
  };

  const deleteBookmark = async () => {
    if (!loggedInUser || !loggedInUser.id) {
      toast.error('Please login to continue');
      return;
    }

    await dispatch(deleteBookmarkForPost(post.id));

    setBookmarked(false);
    onPostBookmark(post.id, false);
  };

  const handlePostDelete = async () => {
    if (!canDeletePost) {
      toast.error(`User can't delete the post`);
      return;
    }

    if (!loggedInUser || !loggedInUser.id) {
      toast.error('Please login to continue');
      return;
    }

    await dispatch(postDelete(post.id));
    onPostDelete(post.id);

    toast.success('Post has been successfully deleted.');
  };

  return (
    <Box
      sx={{ px: 2, paddingTop: 2, paddingBottom: 1 }}
      className="d-flex align-items-center justify-content-between"
    >
      <Stack width="100%" direction="row" justifyContent="space-between">
        <Box sx={{ display: "flex" }}>
          {/* "Like" button */}
          <IconButton
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
              !likeInProgress && handleLike();
            }}
          >
            {liked ? (
              <FaHeart color="red" />
            ) : (
              <FavoriteBorderRoundedIcon />
            )}
          </IconButton>

          {/* "Send tip" button */}
          {showSendTip && (
            <IconButton
              onClick={() => setTipDialogOpened(true)}
              sx={{ fontSize: "12px" }}
            >
              <MonetizationOnIcon />
              SEND TIP
            </IconButton>
          )}
        </Box>

        {/* "Bookmark" button */}
        <IconButton
          className="d-flex align-items-center justify-content-center"
          onClick={bookmarked ? deleteBookmark : sendBookmark}
        >
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </Stack>

      {/* "Delete" button */}
      {canDeletePost && (
        <IconButton onClick={handlePostDelete}>
          <MdDelete />
        </IconButton>
      )}

      {tipDialogOpened && (
        <TipPopUp
          user={post.user}
          onClose={() => setTipDialogOpened(false)}
          open={tipDialogOpened}
        />
      )}
    </Box>
  );
}

export default PostActions;
