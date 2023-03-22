/* eslint-disable jsx-a11y/media-has-caption */
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { FaHeart } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { dispatch, RootState, useSelector } from "frontend/redux/store";
import { MdDelete } from "react-icons/md";
import { ThemeContext } from "../../contexts/ThemeContext";
import TipPopUp from "../tip/TipPopUp";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  LikePostInterface,
  BookmarkPostInterface,
  UnlikePostInterface,
  PostCommentInterface,
  PostInterface,
} from 'frontend/interfaces/postInterface';
import {
  addLikeForPost,
  addBookmarkForPost,
  deleteBookmarkForPost,
  postDelete,
  unlikeForPost,
} from 'frontend/redux/actions/postActions';
import { useTheme } from "@mui/material";
import { useNavigate } from 'react-router';
import Comment from '../../pages/Lounge/Comment';
import { UserDataInterface } from '../../interfaces/reduxInterfaces';
import AddCommentForm from '../../pages/Lounge/AddCommentForm';

type ViewMediaModalProps = {
  open: boolean;
  handleClose: () => void;
  isFirstPost: boolean;
  isLastPost: boolean;
  renderNextMedia: (mediaId: number) => void;
  renderPrevMedia: (mediaId: number) => void;
  loading: boolean;
  author: any;
  canDeletePost?: Boolean;
  getUserPostCounts?: (id: number) => void;
  onDelete?: (id: number) => void;
  selectedMedia: PostInterface;
  isPage?: Boolean;
  onLikePost?: (post: any[], id: number) => void;
  onBookmark?: (isBookmark: Boolean, id: number) => void;
  dataList?: any;
};

const ViewMediaModal = (props: ViewMediaModalProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // const [scrollDir] = useDetectScroll({});
  const user: any = useSelector((state: RootState) => state.user.userData);
  const [post, setPost] = useState(props.selectedMedia);
  const [countLike, setCountLike] = useState(0);
  const [alreadyLike, setAlreadyLike] = useState(false);
  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);
  const { toggle } = useContext(ThemeContext);
  const [canHeDeletePost, setCanHeDeletePost] = useState(false);
  const [alreadyBookmark, setAlreadyBookmark] = useState(false);
  const [showSendTip, setShowSendTip] = useState(true);
  const postCreator = React.useMemo(() => props.author ?? post.user, [props.author, post]);

  useEffect(() => {
    setPost(props?.selectedMedia);
    setAlreadyBookmark(props?.selectedMedia.is_bookmarked ?? false);
  }, [props?.selectedMedia]);

  useEffect(() => {
    if (postCreator?.id) {
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
      if (postCreator.id === user?.id) {
        setCanHeDeletePost(true);
        setShowSendTip(false);
      }
    }
  }, [post, user, alreadyLike, countLike, postCreator?.id]);

  useEffect(() => {
    if (postCreator?.id) {
      if (post?.is_bookmarked) {
        setAlreadyBookmark(true);
      } else {
        setAlreadyBookmark(false);
      }
    }
  }, [post, user, alreadyBookmark, postCreator?.id]);

  const handleLike = async () => {
    if (!postCreator || !postCreator?.id) {
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

    if (!postCreator || !postCreator?.id) {
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
      fullScreen={fullScreen}
      maxWidth={false}
    >
      <div
        className={`post-horizontal ${toggle ? '' : 'white-content'}`}
        style={{ maxWidth: '80vw', height: '90vh' }}
      >
        <DialogContent
          style={{
            display: 'flex',
            height: 'inherit',
            minHeight: 'inherit',
            padding: 0,
        }}
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

          {props.loading && (
            <Stack
              justifyContent="center"
              alignItems="center"
              style={{ width: "100%", height: "70%", minHeight: "70%" }}
            >
              <CircularProgress />
            </Stack>
          )}

          {!props.loading && (
            <>
              <div
                className="mediaContainer"
                style={{
                  maxWidth: '60%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {post?.type === 'image' && (
                  <div
                    style={{
                      backgroundColor: '#000',
                      height: '-webkit-fill-available',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={post?.media as string}
                      alt="Not Displayed"
                      className="responsiveimg"
                      style={{
                        width: '100%',
                        height: 'inherit',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                )}

                {post?.type === 'video' && (
                  <video
                    key={post?.id}
                    style={{ width: "100%", height: "100%", minHeight: "100%" }}
                    controls
                    autoPlay
                  >
                    <source src={post?.media as string} id="video_here" />
                    Your browser does not support HTML5 video.
                  </video>
                )}

                {post?.type === 'text' && (
                  <Box sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    minHeight: 500,
                    width: '30vw',
                    backgroundColor: toggle
                      ? theme.palette.grey['800']
                      : (theme.palette.primary as any).lighter,
                  }}>
                    <Typography
                      component="span"
                      className="like-comm"
                      variant="body2"
                      align="center"
                      sx={{
                        color: toggle ? '#fff' : '#000',
                      }}
                    >
                      {post?.content}
                    </Typography>
                  </Box>
                )}
              </div>

              <Stack
                className="postDetailsContainer"
                direction="column"
                width="400px"
                maxHeight="90vh"
                flexGrow={1}
              >
                <Stack direction="row" gap="8px" margin="8px">
                  <Avatar
                    src={postCreator.profile_image}
                    sx={{ width: 35, height: 35, cursor: 'pointer' }}
                    onClick={() => navigate(`/${postCreator.custom_username}`)}
                  />
                  <div>
                    <Typography
                      variant="h5"
                      sx={{ color: toggle ? "text.primary" : "#161C24" }}
                    >
                      {postCreator.display_name}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: 'text.secondary', cursor: 'pointer' }}
                      onClick={() => navigate(`/${postCreator.custom_username}`)}
                    >
                      @{postCreator.custom_username}
                    </Typography>
                  </div>
                </Stack>

                <Divider />

                <Box
                  flexGrow={1}
                  flexShrink={1}
                  sx={{ overflowY: 'auto', minHeight: '325px', padding: '8px' }}
                >
                  {post.content && post.type !== 'text' && (
                    <Comment
                      text={post.content}
                      createdAt={post.created_at}
                      author={postCreator}
                      hideActions
                    />
                  )}
                  {post.post_comment?.length > 0 && [...post.post_comment]
                    .reverse()
                    .map((item: PostCommentInterface, i: number) => (
                      <Comment
                        key={`comments_${item?.created_at}_${i}`}
                        text={item.comment}
                        author={item.user as UserDataInterface}
                        createdAt={item.created_at}
                      />
                    ))
                  }
                  {(!post.content || post.type === 'text') && !post.post_comment?.length && (
                    <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                      Not commented yet
                    </Typography>
                  )}
                </Box>

                <Divider />

                <Box>
                  {!props?.isPage && (
                    <>
                      <Box
                        className="d-flex align-items-center justify-content-between"
                      >
                        <Stack
                          width="100%"
                          direction="row"
                          justifyContent="space-between"
                        >
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
                            {showSendTip && (
                              <IconButton
                                onClick={() => setOpenPopUpTip(true)}
                                sx={{ fontSize: "12px" }}
                              >
                                <MonetizationOnIcon />
                                SEND TIP
                              </IconButton>
                            )}
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

                      <Divider />

                      <Box paddingY="8px">
                        <AddCommentForm
                          postId={post.id}
                          emojiPickerPlacement="top"
                          onAfterSaveComment={({ comment }) => {
                            setPost((prevState) => ({
                              ...prevState,
                              post_comment: [
                                ...(prevState.post_comment || []),
                                { ...comment, user },
                              ],
                            }));
                          }}
                        />
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
                </Box>
              </Stack>
            </>
          )}
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default ViewMediaModal;
