import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { FaHeart } from 'react-icons/fa';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  LikePostInterface,
  PostInterface,
  BookmarkPostInterface,
} from '../../../interfaces/postInterface';
import {
  addBookmarkForPost,
  addLikeForPost,
  deleteBookmarkForPost,
  postDelete,
  unlikeForPost,
} from '../../../redux/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { useLounge } from '../../../contexts/LoungeContext';
import TipPopUp from '../../../components/tip/TipPopUp';
import { useLocation, useNavigate } from 'react-router';

type PostActionsProps = {
  post: PostInterface;
  setPost:  React.Dispatch<React.SetStateAction<PostInterface>>;
  onPostChange?: () => void;
  onPostDelete?: (postId: number) => void;
  onPostLike?: (likes: LikePostInterface[], postId: number) => void;
  isBookmarked?: boolean;
};

function PostActions({
  post,
  setPost,
  onPostChange,
  onPostDelete,
  onPostLike,
  isBookmarked,
}: PostActionsProps) {
  const loggedInUser = useSelector((state: RootState) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();
  const { updatePost } = useLounge();
  const location = useLocation();
  const navigate = useNavigate();

  const [likeInProgress, setLikeInProgress] = React.useState<boolean>(false);
  const [liked, setLiked] = React.useState<boolean>(false);
  const [bookmarked, setBookmarked] = React.useState<boolean>(
    isBookmarked ?? post.is_bookmarked ?? false,
  );

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

  const isBookmarksPage = React.useMemo(() => {
    return location.pathname.includes('bookmarks');
  }, [location.pathname]);

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
      setPost(updatedPost);
      updatePost(updatedPost);
      if (onPostChange) onPostChange();
      if (onPostLike) onPostLike(newLikes, updatedPost.id)
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
      setPost(updatedPost);
      updatePost(updatedPost);
      if (onPostChange) onPostChange();
      if (onPostLike) onPostLike(newLikes, updatedPost.id)
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

    const bookmarkResp: BookmarkPostInterface = await dispatch(
      addBookmarkForPost(post.id)
    );
    if (bookmarkResp) {
      setBookmarked(true);
    }
  };

  const deleteBookmark = async () => {
    if (!loggedInUser || !loggedInUser.id) {
      toast.error('Please login to continue');
      return;
    }

    await dispatch(deleteBookmarkForPost(post.id));

    if (isBookmarksPage) {
      if (onPostDelete) {
        onPostDelete(post.id);
      }
    }

    setBookmarked(false);
  };

  const deletePost = async () => {
    if (!canDeletePost) {
      toast.error(`User can't delete the post`);
      return;
    }

    if (!loggedInUser || !loggedInUser.id) {
      toast.error('Please login to continue');
      return;
    }

    await dispatch(postDelete(post.id));

    if (onPostDelete) {
      onPostDelete(post.id);
    }
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
        <IconButton onClick={deletePost}>
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
