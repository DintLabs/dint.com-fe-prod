import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import {
  Avatar,
  Box,
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
import React, { useContext } from "react";
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
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const [post, setPost] = React.useState(PropPost);
  const [canHeDeletePost, setCanHeDeletePost] = React.useState(false);
  const [openPopUpTip, setOpenPopUpTip] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    setComments(post.post_comment);
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
      const unlikeResp: UnlikePostInterface = await dispatch(
        unlikeForPost(user.id, post.id)
      );

      setAlreadyLike(false);

      setPost((prevState) => ({
        ...prevState,
        unlike_post: [...(prevState?.unlike_post || []), unlikeResp],
      }));
    } else {
      const likeResp: LikePostInterface = await dispatch(
        addLikeForPost(user.id, post.id)
      );
      setAlreadyLike(true);
      setPost((prevState) => ({
        ...prevState,
        like_post: [...(prevState?.like_post || []), likeResp],
      }));
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

  return (
    <>
      <Box
        style={{
          border: `1px solid ${theme.palette.grey[400]}`,
          borderRadius: '10px',
          marginBottom: '30px'
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
            <Stack direction="row" alignItems="center" gap={1}>
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
        <Box sx={{ p: 2 }}>
          <Typography
            component="span"
            variant="body2"
            sx={{ color: toggle ? "text.primary" : "#161C24" }}
          >
            {description}
          </Typography>
        </Box>
        {image && images.includes(extension) && (
          <Box sx={{ textAlign: "center" }}>
            <img src={image} alt="post" style={{ width: "100%" }} />
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
        <Box
          sx={{ p: 2 }}
          className="d-flex align-items-center justify-content-between"
        >
          <Stack direction="row">
            {!alreadyLike ? (
              <IconButton
                className="d-flex align-items-center justify-content-center"
                onClick={handleLike}
              >
                <FavoriteBorderRoundedIcon />
                <p className="m-0 small ms-2">
                  {/* {post?.like_post?.length ?? "0"} */}
                  {+post?.like_post?.length -
                    (+post?.unlike_post?.length
                      ? post?.unlike_post?.length
                      : 0) ?? post?.like_post?.length}
                </p>
              </IconButton>
            ) : (
              <IconButton
                className="d-flex align-items-center justify-content-center"
                onClick={handleLike}
              >
                <FaHeart color="red" />
                <p className="m-0 small ms-2">
                  {+post?.like_post?.length -
                    (+post?.unlike_post?.length
                      ? post?.unlike_post?.length
                      : 0) ?? post?.like_post?.length}
                </p>
              </IconButton>
            )}
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
            <IconButton
              onClick={() => setShowComments(!showComments)}
              className="d-flex align-items-center justify-content-center"
            >
              <MessageRoundedIcon />
              <p className="m-0 small ms-2">
                {post?.post_comment?.length ?? "0"}
              </p>
            </IconButton>
            <IconButton
              onClick={() => setOpenPopUpTip(true)}
              sx={{ fontSize: "12px" }}
            >
              <MonetizationOnIcon />
              SEND TIP
            </IconButton>
          </Stack>
          {canDeletePost && canHeDeletePost ? (
            <IconButton onClick={deletePost}>
              <MdDelete />
            </IconButton>
          ) : null}
        </Box>

        {showComments && (
          <Box sx={{ p: 3 }}>
            <h4 style={{ color: toggle ? "white" : "#161C24" }}>
              Comments ({comments?.length ?? 0})
            </h4>
            {comments?.map((item, i) => {
              return (
                <div
                  className=" my-3"
                  style={{ background: "transparent" }}
                  key={`comments_${item?.created_at}_${i}`}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="user d-flex flex-row align-items-center">
                      <ListItemAvatar>
                        {typeof item?.user !== "number" && (
                          <Avatar src={item?.user?.profile_image} />
                        )}
                      </ListItemAvatar>

                      <span>
                        <small style={{ color: toggle ? "white" : "#161C24" }}>
                          {item?.comment}
                        </small>
                      </span>
                    </div>

                    <small className="text-muted">
                      {moment(item?.created_at).fromNow()}
                    </small>
                  </div>
                </div>
              );
            })}

            <div className="d-flex align-items-center justify-content-center flex-row mt-3">
              <input
                style={{}}
                className="form-control w-100"
                placeholder="Enter Comment"
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <IconButton onClick={sendComment}>
                <MdSend />
              </IconButton>
            </div>
          </Box>
        )}
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
