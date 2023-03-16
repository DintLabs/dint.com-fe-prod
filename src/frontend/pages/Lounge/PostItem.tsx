import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Favourite from "../../assets/img/web3/comment.svg";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";

import {
  Avatar,
  Box,
  colors,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import { toast } from "react-toastify";

import { MdDelete, MdSend } from "react-icons/md";
import React, { useContext, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import TipPopUp from "frontend/components/tip/TipPopUp";
import {
  LikePostInterface,
  PostCommentInterface,
  PostInterface,
  BookmarkPostInterface,
  UnlikePostInterface,
} from "frontend/interfaces/postInterface";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "frontend/redux/store";

import {
  addCommentForPost,
  addLikeForPost,
  addBookmarkForPost,
  deleteBookmarkForPost,
  postDelete,
  unlikeForPost,
} from "frontend/redux/actions/postActions";
import { ThemeContext } from "../../contexts/ThemeContext";
import Picker from "@emoji-mart/react";
const PostItem = ({
  userName,
  custom_username,
  description,
  image,
  createdAt,
  post: PropPost,
  canDeletePost,
  onDelete,
  isBookmarked,
  isBookmarksPage,
}: {
  image?: string | null;
  userName: string;
  custom_username?: string;
  description: string;
  createdAt: string | Date;
  post: PostInterface;
  canDeletePost?: Boolean;
  fetchPosts: Function;
  onDelete?: Function;
  isBookmarked?: Boolean;
  isBookmarksPage?: Boolean;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const [post, setPost] = React.useState(PropPost);
  const [canHeDeletePost, setCanHeDeletePost] = React.useState(false);
  const [openPopUpTip, setOpenPopUpTip] = React.useState<boolean>(false);
  const [showAllComments, setShowAllComments] = React.useState<boolean>(false);
  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const [emoji, setEmoji] = React.useState("");
  const [showSendTip, setShowSendTip] = React.useState(true)

  const images = ["jpg", "gif", "png", "svg", "webp", "ico", "jpeg"];
  const videos = ["MP4", "mp4", "MOV", "mov", "3gp", "ogg", "quicktime"];

  const url = new URL(image ?? "https://google.com");

  const splits = url.pathname.split(".");
  const extension = splits?.length ? splits[splits.length - 1] : "";
  const [alreadyLike, setAlreadyLike] = React.useState(false);
  const alreadyBookmarkVal = isBookmarked ?? post?.is_bookmarked ?? false;
  const [alreadyBookmark, setAlreadyBookmark] =
    React.useState(alreadyBookmarkVal);
  const [commentText, setCommentText] = React.useState("");
  const [comments, setComments] = React.useState<PostCommentInterface[]>([]);
  const [showComments, setShowComments] = React.useState(false);

  const user = useSelector((state: RootState) => state.user.userData);
  const { toggle } = useContext(ThemeContext);
  let inputRef = useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    setComments(post.post_comment.slice(0).reverse());
  }, [post]);

  const sendComment = async () => {
    if (commentText.length < 1) {
      toast.error("Comment is Required!");
      return;
    }

    if (!user) return;

    const commentResp: PostCommentInterface = await dispatch(
      addCommentForPost(user.id, post.id, commentText)
    );

    setPost((prevState) => ({
      ...prevState,
      post_comment: [
        ...(prevState.post_comment || []),
        { ...commentResp, user },
      ],
    }));

    setCommentText("");
    setShowEmoji(false);
  };

  React.useEffect(() => {
    if (user) {
      if (
        post?.like_post?.find((item) =>
          typeof item.user !== "number"
            ? item.user?.id === user.id
            : item.user === user.id
        )
      ) {
        setAlreadyLike(true);
      }
      // if(post.bookmark_post.find((item) =>
      // typeof item.user !== 'number' ? item.user?.id === user.id : item.user === user.id
      // )
      // ){
      //   setAlreadyBookmark(true)
      // }

      if (post.user.id === user.id) {
        setCanHeDeletePost(true);
        setShowSendTip(false);
      }
    }
  }, [post.like_post, post.user.id, user]);

  const deletePost = async () => {
    if (!canDeletePost) {
      toast.error("User can't delte post");
      return;
    }

    if (user && !user.id) {
      toast.error("Can't find User");
      return;
    }

    await dispatch(postDelete(post.id));

    if (onDelete) {
      onDelete(post.id);
    }
    toast.success("Post Deleted Successful!");
  };

  const handleLike = async () => {
    if (!user || !user.id) {
      toast.error("Can't find User");
      return;
    }

    if (alreadyLike) {
      setLoading(true)
      setAlreadyLike(false);
      const unlikeResp: UnlikePostInterface = await dispatch(
        unlikeForPost(user.id, post.id)
      );


      setPost((prevState) => ({
        ...prevState,
        unlike_post: [...(prevState?.unlike_post || []), unlikeResp],
      }));
      setLoading(false)
    } else {
      setLoading(true)
      setAlreadyLike(true);
      const likeResp: LikePostInterface = await dispatch(
        addLikeForPost(user.id, post.id)
      );
      setPost((prevState) => ({
        ...prevState,
        like_post: [...(prevState?.like_post || []), likeResp],
      }));
      setLoading(false)
    }
  };

  const sendBookmark = async () => {
    if (alreadyBookmark) {
      toast.warn("You have Already bookmarked this post");
      return;
    }

    if (!user || !user.id) {
      toast.error("Can't find User");
      return;
    }

    const bookmarkResp: BookmarkPostInterface = await dispatch(
      addBookmarkForPost(post.id)
    );
    if (bookmarkResp) setAlreadyBookmark(true);
  };

  const deleteBookmark = async () => {
    if (!user || !user.id) {
      toast.error("Can't find User");
      return;
    }

    await dispatch(deleteBookmarkForPost(post.id));

    if (isBookmarksPage) {
      if (onDelete) {
        onDelete(post.id);
      }
    }

    setAlreadyBookmark(false);
  };

  // for popup tip
  const handleClickOpen = () => {
    setOpenPopUpTip(true);
  };

  const handleClose = () => {
    setOpenPopUpTip(false);
  };

  const handleEmojiPickup = (emoji: any) => {
    if (inputRef) {
      const cursorPosition = inputRef.current?.selectionStart || 0;
      const text =
        commentText.slice(0, cursorPosition) +
        commentText.slice(cursorPosition) +
        emoji.native;
      setEmoji(emoji);
      setCommentText(text);
    }
  };

  const displayComment = (item: any, i: any) => {
    return (
      <div
        className=""
        style={{ background: "transparent" }}
        key={`comments_${item?.created_at}_${i}`}
      >
        <div className="d-flex flex-column">
          <div className="user d-flex flex-row justify-content-between w-100 align-items-center">
            <span
              className="like-comm mb-0"
              style={{ color: toggle ? "white" : "#161C24" }}
            >
              {item?.comment}
            </span>
            <IconButton sx={{ padding: 0, color: toggle ? "#fff" : "#000" }}>
              <FavoriteBorderRoundedIcon fontSize="small" />
            </IconButton>
          </div>

          <div className="view-comm">{moment(item?.created_at).fromNow()}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Box
        style={{
          border: `1px solid ${theme.palette.grey[400]}`,
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <List>
          <ListItem>
            <ListItemAvatar
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/${custom_username}`, { replace: true })}
            >
              <Avatar src={post.user.profile_image} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  onClick={() =>
                    navigate(`/${custom_username}`, { replace: true })
                  }
                  style={{ cursor: "pointer" }}
                  variant="subtitle1"
                  sx={{ color: toggle ? "text.primary" : "#161C24" }}
                >
                  {userName}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  variant="caption"
                  sx={{ color: "text.secondary" }}
                >
                  @{custom_username}
                </Typography>
              }
            />
            <Stack
              direction="column"
              alignItems="flex-end"
              justifyContent="center"
              gap={1}
            >
              <Typography
                component="span"
                variant="caption"
                sx={{ color: "text.secondary" }}
              >
                {moment(createdAt).fromNow()}
              </Typography>

              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Stack>
          </ListItem>
        </List>
        {image && images.includes(extension) && (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={image}
              alt="post"
              style={{ borderRadius: "18px", width: "100%" }}
            />
          </Box>
        )}

        {image && videos.includes(extension) && (
          <Box sx={{ textAlign: "center" }}>
            {/* we haven't track */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video width="100%" controls>
              <source src={image} id="video_here" />
              Your browser does not support HTML5 video.
            </video>
          </Box>
        )}
        {!image && !videos.includes(extension) && (
          <Box sx={{ px: 2 }}>
            <Typography
              component="span"
              className="like-comm"
              variant="body2"
              sx={{ color: toggle ? "#fff" : "#000" }}
            >
              {description}
            </Typography>
          </Box>
        )}
        <Box
          sx={{ p: 2 }}
          className="d-flex align-items-center justify-content-between"
        >
          <Stack width="100%" direction="row" justifyContent="space-between">
            <Box sx={{ display: "flex" }}>
              <IconButton
                // onClick={() => setShowComments(!showComments)}
                onClick={() => setShowAllComments(!showAllComments)}
                className="d-flex align-items-center justify-content-center"
              >
                <MessageRoundedIcon />
              </IconButton>
              <IconButton
                className="d-flex align-items-center justify-content-center"
                onClick={()=>{!loading && handleLike()}}
              >
                {!alreadyLike ? (
                  <FavoriteBorderRoundedIcon />
                ) : (
                  <FaHeart color="red" />
                )}
              </IconButton>
              {/* {loading && <IconButton
                className="d-flex align-items-center justify-content-center"

              >
                {!alreadyLike ? (
                  <FavoriteBorderRoundedIcon />
                ) : (
                  <FaHeart color="red" />
                )}
              </IconButton>} */}
              {showSendTip && <IconButton
                onClick={() => setOpenPopUpTip(true)}
                sx={{ fontSize: "12px" }}
              >
                <MonetizationOnIcon />
                SEND TIP
              </IconButton>}
            </Box>
            {!alreadyBookmark ? (
              <IconButton
                className="d-flex align-items-center justify-content-center"
                onClick={sendBookmark}
              >
                <BookmarkBorderIcon />
                {/* <p className="m-0 small ms-2">0</p> */}
              </IconButton>
            ) : (
              <IconButton
                className="d-flex align-items-center justify-content-center"
                onClick={deleteBookmark}
              >
                <BookmarkIcon />
                {/* <p className="m-0 small ms-2">0</p> */}
              </IconButton>
            )}
          </Stack>
          {canDeletePost && canHeDeletePost ? (
            <IconButton onClick={deletePost}>
              <MdDelete />
            </IconButton>
          ) : null}
        </Box>
        <Box sx={{ px: 2, color: toggle ? "#fff" : "#000" }}>
          <p className="like-comm">
            {/* {post?.like_post?.length ?? "0"} */}
            {+post?.like_post?.length -
              (+post?.unlike_post?.length ? post?.unlike_post?.length : 0) ??
              post?.like_post?.length}{" "}
            Likes
          </p>
        </Box>
        {image && (images.includes(extension) || videos.includes(extension)) && (
          <Box sx={{ px: 2 }}>
            <Typography
              component="span"
              className="like-comm"
              variant="body2"
              sx={{ color: toggle ? "#fff" : "#000" }}
            >
              {description}
            </Typography>
          </Box>
        )}

        <Box sx={{ px: 2 }}>
          {comments?.length > 0 ? (
            <div
              className="view-comm"
              style={{ cursor: "pointer" }}
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {
                !showAllComments
                  ? `View all ${post?.post_comment?.length} Comments`
                  : // <h6 style={{ color: toggle ? "white" : "#161C24" }}>
                  `Comments (${comments?.length})`
                // </h6>
              }
            </div>
          ) : null}
          <div className="custom-wrapper">
            {showAllComments
              ? comments?.map((item, i) => {
                return displayComment(item, i);
              })
              : comments?.slice(0, 1).map((item, i) => {
                return displayComment(item, i);
              })}
          </div>

          <div
            className="mt-3 border-color pt-2"
            style={{ color: toggle ? "#fff" : "#000" }}
          >
            <IconButton
              className="d-flex align-items-center justify-content-center"
              sx={{ color: toggle ? "#fff" : "#000" }}
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <SentimentSatisfiedOutlinedIcon />
            </IconButton>
            <div className="emoji-wrapper">
              {showEmoji && (
                <Picker
                  onEmojiSelect={(e: any) => handleEmojiPickup(e)}
                  emoji="point_up"
                  title="Pick your emoji"
                  theme={toggle ? "dark" : "light"}
                  style={{
                    position: "absolute",
                    top: "50px",
                    left: 0,
                    zIndex: 9999,
                  }}
                />
              )}
            </div>
            <input
              style={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                borderRadius: 0,
                background: "transparent",
                color: toggle ? "#fff" : "#000",
              }}
              className="form-control w-100"
              placeholder="Add a Comment"
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <IconButton
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: toggle ? "#fff" : "#000000",
              }}
              onClick={sendComment}
            >
              Post
              {/* <MdSend /> */}
            </IconButton>
          </div>
        </Box>
      </Box>

      <TipPopUp
        user={post.user}
        onClose={handleClose}
        setOpenPopUpTip={setOpenPopUpTip}
        onOpen={handleClickOpen}
        openPopUpTip={openPopUpTip}
      />
    </>
  );
};

export default PostItem;
