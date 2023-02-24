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
  selectedMediaId: number;
  type: string | null;
  open: boolean;
  handleClose: () => void;
  source: any;
  post: any;
  isFirstPost: boolean;
  isLastPost: boolean;
  renderNextMedia: (mediaId: number) => void;
  renderPrevMedia: (mediaId: number) => void;
  loading: boolean;
  userDetails?: any;
  canDeletePost?: Boolean;
  getUserPostCounts?: (id: number) => void;
  onDelete?: (id: number) => void;
  postUser: number;
  is_bookmarked: Boolean;
  selectedMedia: any;
  like_post: [];
};

const ViewMediaModal = (props: ViewMediaModalProps) => {
  const user = useSelector((state: RootState) => state.user.userData);
  const [post, setPost] = useState(props.selectedMedia);
  const [alreadyLike, setAlreadyLike] = useState(false);
  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);
  const { toggle } = useContext(ThemeContext);
  const [canHeDeletePost, setCanHeDeletePost] = useState(false);
  const alreadyBookmarkVal = props?.is_bookmarked ?? false;
  const [alreadyBookmark, setAlreadyBookmark] = useState(alreadyBookmarkVal);

  useEffect(() => {
    if (props?.userDetails?.id) {
      console.log("hello");
      if (
        props?.like_post?.find((item: any) =>
          typeof item.user !== "number"
            ? item.user?.id === props?.userDetails?.id
            : item.user === props?.userDetails?.id
        )
      ) {
        setAlreadyLike(true);
      }
      if (props?.postUser === user?.id) {
        setCanHeDeletePost(true);
      }
    }
  }, [props?.like_post, props?.postUser, user, props.selectedMediaId, post]);

  const handleLike = async () => {
    if (!props?.userDetails || !props?.userDetails?.id) {
      toast.error("Can't find User");
      return;
    }

    if (alreadyLike) {
      const unlikeResp: UnlikePostInterface = await dispatch(
        unlikeForPost(props?.userDetails?.id, props?.selectedMediaId)
      );
      console.log("unlikeResp----", unlikeResp);
      setAlreadyLike(false);

      setPost((prevState: any) => ({
        ...prevState,
        unlike_post: [...(prevState?.unlike_post || []), unlikeResp],
      }));
    } else {
      const likeResp: LikePostInterface = await dispatch(
        addLikeForPost(props?.userDetails?.id, props?.selectedMediaId)
      );
      console.log("likeResp----",likeResp)
      setAlreadyLike(true);
      setPost((prevState: any) => ({
        ...prevState,
        like_post: [...(prevState?.like_post || []), likeResp],
      }));
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

    await dispatch(postDelete(props.selectedMediaId));

    if (props?.onDelete) {
      props?.onDelete(props.selectedMediaId);
    }
    toast.success("Post Deleted Successful!");
  };

  // for popup tip
  const handleClickOpen = () => {
    setOpenPopUpTip(true);
  };

  const handleClose = () => {
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
      addBookmarkForPost(props.selectedMediaId)
    );
    if (bookmarkResp) setAlreadyBookmark(true);
  };

  const deleteBookmark = async () => {
    if (!user || !user.id) {
      toast.error("Can't find User");
      return;
    }

    await dispatch(deleteBookmarkForPost(props.selectedMediaId));

    setAlreadyBookmark(false);
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
            if (props?.selectedMediaId)
              props?.renderPrevMedia(props?.selectedMediaId);
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
      ) : null}
      {!props?.isLastPost ? (
        <IconButton
          className="media-dialog-right-navigation-icon"
          onClick={() => {
            if (props?.selectedMediaId)
              props?.renderNextMedia(props?.selectedMediaId);
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
      ) : props?.type === "image" ? (
        <img src={props?.source} alt="Not Displayed" />
      ) : (
        <video
          key={props?.selectedMediaId}
          className="video-dialog"
          controls
          autoPlay
        >
          <source src={props?.source} id="video_here" />
          Your browser does not support HTML5 video.
        </video>
      )}
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
        <p className="like-comm">
          {+post?.like_post?.length -
            (+post?.unlike_post?.length ? post?.unlike_post?.length : 0) ??
            post?.like_post?.length}{" "}
          Likes
        </p>
      </Box>
      {/* {image && (images.includes(extension)  || videos.includes(extension)) && ( */}
      <Box sx={{ px: 2 }}>
        <Typography
          component="span"
          className="like-comm"
          variant="body2"
          sx={{ color: toggle ? "#fff" : "#000" }}
        >
          {/* {description} */}
        </Typography>
      </Box>
      {/* )} */}
      <TipPopUp
        user={post?.user}
        onClose={handleClose}
        setOpenPopUpTip={setOpenPopUpTip}
        onOpen={handleClickOpen}
        openPopUpTip={openPopUpTip}
      />
    </Dialog>
  );
};

export default ViewMediaModal;
