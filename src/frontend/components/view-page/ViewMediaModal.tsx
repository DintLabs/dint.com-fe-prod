/* eslint-disable jsx-a11y/media-has-caption */
import {
  Box,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { FaHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dispatch, RootState, useSelector } from "frontend/redux/store";
import { MdDelete } from "react-icons/md";
import { ThemeContext } from "../../contexts/ThemeContext";
import TipPopUp from "../tip/TipPopUp";
import {
  LikePostInterface,
  BookmarkPostInterface,
  UnlikePostInterface,
} from "frontend/interfaces/postInterface";
import {
  addLikeForPost,
  addBookmarkForPost,
  deleteBookmarkForPost,
  postDelete,
  unlikeForPost,
} from "frontend/redux/actions/postActions";

type ViewMediaModalProps = {
  open: boolean;
  handleClose: () => void;
  isFirstPost: boolean;
  isLastPost: boolean;
  renderNextMedia: (mediaId: number) => void;
  renderPrevMedia: (mediaId: number) => void;
  loading: boolean;
  userDetails?: any;
  canDeletePost?: Boolean;
  getUserPostCounts?: (id: number) => void;
  onDelete?: (id: number) => void;
  selectedMedia: any;
  isPage?: Boolean;
  onLikePost?: (post: any[], id: number) => void;
  onBookmark?: (isBookmark: Boolean, id: number) => void;
};

const ViewMediaModal = (props: ViewMediaModalProps) => {
  const user: any = useSelector((state: RootState) => state.user.userData);
  const [post, setPost] = useState(props.selectedMedia);
  const [countLike, setCountLike] = useState(0);
  const [alreadyLike, setAlreadyLike] = useState(false);
  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);
  const { toggle } = useContext(ThemeContext);
  const [canHeDeletePost, setCanHeDeletePost] = useState(false);
  const [alreadyBookmark, setAlreadyBookmark] = useState(false);

  useEffect(() => {
    setPost(props?.selectedMedia);
    setAlreadyBookmark(props?.selectedMedia.is_bookmarked ?? false);
  }, [props?.selectedMedia]);

  useEffect(() => {
    if (props?.userDetails?.id) {
      if (
        post.like_post.length &&
        post?.like_post?.find((item: any) =>
          typeof item?.user !== "number"
            ? item?.user?.id === user?.id
            : item?.user === user?.id
        )
      ) {
        setAlreadyLike(true);
        setCountLike(post.like_post?.length);
      } else {
        setCountLike(post.like_post?.length);
        setAlreadyLike(false);
      }
      if (post?.userId === user?.id) {
        setCanHeDeletePost(true);
      }
    }
  }, [post, user, alreadyLike, countLike]);

  useEffect(() => {
    if (props?.userDetails?.id) {
      if (post?.is_bookmarked) {
        setAlreadyBookmark(true);
      } else {
        setAlreadyBookmark(false);
      }
    }
  }, [post, user, alreadyBookmark]);

  const handleLike = async () => {
    if (!props?.userDetails || !props?.userDetails?.id) {
      toast.error("Can't find User");
      return;
    }
    if (alreadyLike) {
      const unlikeResp: UnlikePostInterface = await dispatch(
        unlikeForPost(user?.id, post?.id)
      );
      setAlreadyLike(false);
      const unlikePost = post.like_post?.filter((item: any) =>
        typeof item.user !== "number"
          ? item.user?.id !== user?.id
          : item.user !== user?.id
      );
      setCountLike(unlikePost.length);
      props?.onLikePost && props.onLikePost(unlikePost, post?.id);
    } else {
      const likeResp: LikePostInterface = await dispatch(
        addLikeForPost(user?.id, post?.id)
      );
      const likePost = [...post.like_post, likeResp];
      setAlreadyLike(true);
      props?.onLikePost && props.onLikePost(likePost, post?.id);
    }
  };

  const deletePost = async () => {
    if (!props?.canDeletePost) {
      toast.error("User can't delte post");
      return;
    }

    if (user && !user.id) {
      toast.error("Can't find User");
      return;
    }

    await dispatch(postDelete(post.id));

    if (props?.onDelete) {
      props?.onDelete(post.id);
    }
    props.handleClose();
    toast.success("Post Deleted Successful!");
  };

  // for popup tip
  const handleClickOpen = () => {
    setOpenPopUpTip(true);
  };

  const handleCloseTip = () => {
    setOpenPopUpTip(false);
  };

  const sendBookmark = async () => {
    if (alreadyBookmark) {
      toast.warn("You have Already bookmarked this post");
      return;
    }

    if (!props?.userDetails || !props?.userDetails?.id) {
      toast.error("Can't find User");
      return;
    }
    const bookmarkResp: BookmarkPostInterface = await dispatch(
      addBookmarkForPost(post.id)
    );
    if (bookmarkResp) {
      setAlreadyBookmark(true);
      props?.onBookmark && props.onBookmark(true, post.id);
    }
  };

  const deleteBookmark = async () => {
    if (!user || !user.id) {
      toast.error("Can't find User");
      return;
    }

    const deleteBookmark = await dispatch(deleteBookmarkForPost(post.id));
    
    if (deleteBookmark.code === 200) {
      setAlreadyBookmark(false);
      props?.onBookmark && props.onBookmark(false, post.id);
    }
  };

  return (
    <Dialog
      open={props?.open}
      onClose={props?.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="view-media-modal"
    >
      {!props?.isFirstPost ? (
        <IconButton
          className="media-dialog-left-navigation-icon"
          onClick={() => {
            if (post?.id) props?.renderPrevMedia(post?.id);
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
      ) : null}
      {!props?.isLastPost ? (
        <IconButton
          className="media-dialog-right-navigation-icon"
          onClick={() => {
            if (post?.id) props?.renderNextMedia(post?.id);
          }}
          disabled={props?.loading}
        >
          <ArrowRightIcon />
        </IconButton>
      ) : null}
      {props?.loading ? (
        <Stack
          justifyContent="center"
          alignItems="center"
          width={300}
          height={300}
        >
          <CircularProgress />
        </Stack>
      ) : post?.type === "image" ? (
        <img src={post?.media} alt="Not Displayed" />
      ) : post?.type === "video" ? (
        <video key={post?.id} className="video-dialog" controls autoPlay>
          <source src={post?.media} id="video_here" />
          Your browser does not support HTML5 video.
        </video>
      ) : (
        <Typography
          component="span"
          className="like-comm"
          variant="body2"
          align="center"
          sx={{ color: "#fff" }}
          padding="50px"
        >
          {post?.description}
        </Typography>
      )}
      {!props?.isPage && (
        <>
          <Box
            sx={{ p: 2 }}
            className="d-flex align-items-center justify-content-between"
          >
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Box sx={{ display: "flex" }}>
                <IconButton
                  className="d-flex align-items-center justify-content-center"
                  onClick={handleLike}
                >
                  {!alreadyLike ? (
                    <FavoriteBorderRoundedIcon />
                  ) : (
                    <FaHeart color="red" />
                  )}
                </IconButton>
                <IconButton
                  onClick={() => setOpenPopUpTip(true)}
                  sx={{ fontSize: "12px" }}
                >
                  <MonetizationOnIcon />
                  SEND TIP
                </IconButton>
              </Box>
              {!alreadyBookmark ? (
                <IconButton
                  className="d-flex align-items-center justify-content-center"
                  onClick={sendBookmark}
                >
                  <BookmarkBorderIcon />
                </IconButton>
              ) : (
                <IconButton
                  className="d-flex align-items-center justify-content-center"
                  onClick={deleteBookmark}
                >
                  <BookmarkIcon />
                </IconButton>
              )}
            </Stack>
            {props?.canDeletePost && canHeDeletePost ? (
              <IconButton onClick={deletePost}>
                <MdDelete />
              </IconButton>
            ) : null}
          </Box>
          <Box sx={{ px: 2, color: toggle ? "#fff" : "#000" }}>
            <p className="like-comm">{countLike} Likes</p>
          </Box>
          <Box sx={{ px: 2 }}>
            <Typography
              component="span"
              className="like-comm"
              variant="body2"
              sx={{ color: toggle ? "#fff" : "#000" }}
            >
              {post.type !== "text" && post?.description}
            </Typography>
          </Box>
          <TipPopUp
            user={post?.user}
            onClose={handleCloseTip}
            setOpenPopUpTip={setOpenPopUpTip}
            onOpen={handleClickOpen}
            openPopUpTip={openPopUpTip}
          />
        </>
      )}
    </Dialog>
  );
};

export default ViewMediaModal;
