/* eslint-disable jsx-a11y/media-has-caption */
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    IconButton,
    List,
    ListItemText,
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
  import React, { useContext, useEffect, useRef, useState } from "react";
  import { toast } from "react-toastify";
  // import { useDetectScroll } from "@smakss/react-scroll-direction";
  import { dispatch, RootState, useSelector } from "frontend/redux/store";
  import { MdDelete } from "react-icons/md";
  import { ThemeContext } from "../../contexts/ThemeContext";
  import TipPopUp from "../tip/TipPopUp";
  import useMediaQuery from "@mui/material/useMediaQuery";
  
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
  import { useTheme } from "@mui/material";
  import { MoreHoriz, PowerInputSharp } from "@mui/icons-material";
  import { ListItem } from "@mui/material";
  import { ListItemAvatar } from "@mui/material";
  import { Avatar } from "@mui/material";
  import moment from "moment";
  import { useNavigate } from "react-router";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
  import FullScreenModal from "./FullScreenModal";

  
  type ViewMediaModalProps = {
    open: boolean;
    handleClose: () => void;
    loading: boolean;
    userDetails?: any;
    getUserPostCounts?: (id: number) => void;
    onDelete?: (id: number) => void;
    isPage?: Boolean;
    onLikePost?: (post: any[], id: number) => void;
    onBookmark?: (isBookmark: Boolean, id: number) => void;
    dataList?: any;
    selectedMedia: any;
  };
  
  const ViewMediaModalMobile = (props: ViewMediaModalProps) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const user: any = useSelector((state: RootState) => state.user.userData);
    const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);
    const [fullScreenModal , setFullScreenModal] = useState<boolean>(false);
    const { toggle } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [Post , setPost] = useState();
    const [ postData , setPostData ] = useState(props.dataList);

    useEffect(()=>{
      goToViolation()
    },[])
    

    const onLikePost = (post: any[], postId: number) => {
      setPost((prev: any) => ({ ...prev, like_post: post }));    
      const newMediaList = postData.map((item: any) =>
        item.id === postId ? { ...item, like_post: post } :item
      )
      setPostData(newMediaList);
    };
  
    const onBookMark = (isBookmark: Boolean, postId: number) => {
      setPost((prev: any) => ({ ...prev, is_bookmarked: isBookmark }));    
      const newMediaList = postData.map((item: any) =>
        item.id === postId ? { ...item, is_bookmarked: isBookmark } :item
      );
      postData(newMediaList);
    }
  
    const handleLike = async (post:any) => {
      if (!props?.userDetails || !props?.userDetails?.id) {
        toast.error("Can't find User");
        return;
      }
      if ((post.like_post.filter((ele:any)=>ele?.user?.id === props?.userDetails?.id)[0])) {
        const unlikeResp: UnlikePostInterface = await dispatch(
          unlikeForPost(user?.id, post?.id)
        );
        const unlikePost = post.like_post?.filter((item: any) =>
          typeof item.user !== "number"
            ? item.user?.id !== user?.id
            : item.user !== user?.id
        );
        onLikePost(unlikePost, post?.id);
      } else {
        const likeResp: LikePostInterface = await dispatch(
        addLikeForPost(user?.id, post?.id)
        );
        const likeRespWithUser = {...likeResp , user:{id:props.userDetails.id}}
        const likePost = [...post.like_post, likeRespWithUser];
        onLikePost(likePost, post?.id);
      }
    };
  
    const deletePost = async (post:any) => {
      if (!post.can_delete) {
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
  
    const sendBookmark = async (post:any) => {
      if (post.is_bookmarked) {
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
        onBookMark(true, post.id);
      }
    };
  
    const deleteBookmark = async (post:any) => {
      if (!user || !user.id) {
        toast.error("Can't find User");
        return;
      }
  
      const deleteBookmark = await dispatch(deleteBookmarkForPost(post.id));
  
      if (deleteBookmark.code === 200) {
        onBookMark(false, post.id);
      }
    };
  
    const startFullScreenView = (Post:any) => {
      setPost(Post)
      setFullScreenModal(true)
    }
    const handleClose = () => {
      setFullScreenModal(false)
    }
    const fetchNextPost = (postId: number) => {
      const currentMediaIndex = postData?.findIndex((media:any) => media?.id === postId);
      if (currentMediaIndex >= 0) {
        const nextMedia = postData[currentMediaIndex + 1];
        nextMedia && setPost(nextMedia) 
      }
    };
  
    //   to display the prev media in the open modal
    const fetchPrevPost = (postId: number) => {
      const currentMediaIndex = postData?.findIndex((media:any) => media?.id === postId);
      if (currentMediaIndex >= 0) {
        const nextMedia = postData[currentMediaIndex - 1];
        nextMedia && setPost(nextMedia) 
      }
    };

    const goToViolation=()=>{
      setTimeout(()=>{
        document.getElementById(`${props.selectedMedia.id}`)?.scrollIntoView()
      },100)
    };

    return (
      <>
      {!fullScreenModal ? <Dialog
        open={props?.open}
        onClose={props?.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="view-media-modal"
        // onTouchStart={handleUserTouchStart}
        // onTouchEnd={handleUserTouchEnd}
        // onScroll={handleScroll}
        fullScreen={fullScreen}
        sx={{"& .css-1vjcrt4-MuiPaper-root-MuiDialog-paper": {background : toggle ?"black" : "white"}}}
      >
        <div className="post-vertical">
          <div style={{height:"1.3%"}}>
            <Box sx={{
              position:"fixed" ,
              padding:"3%" ,
              background: toggle ? "black" :"white" , 
              width:"100%" ,
              zIndex:"10",
              color:toggle? "white": "black" ,
              display:"flex",
              alignItems:"center"
            }}><ArrowBackIcon onClick={()=>props?.handleClose()}/><Typography mx={1} sx={{fontWeight:"bold"}}>Posts</Typography></Box>
          </div>
          <DialogContent className="dialogContent" sx={{background: toggle ? "black" :"white" , padding:"50px 24px" }}>
            {postData.map((post: any) => {
              return (
                <>
                <Box
                  id={post.id}
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
                        onClick={() => navigate(`/${post.user.custom_username}`, { replace: true })}
                      >
                        <Avatar src={post.user.profile_image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            style={{ cursor: "pointer" }}
                            variant="subtitle1"
                            sx={{ color: toggle ? "text.primary" : "#161C24" }}
                          >
                            {post?.user?.display_name}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            @{post.user.custom_username}
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
                          {moment(post?.createdAt).fromNow()}
                        </Typography>
          
                        <IconButton>
                          <MoreHoriz />
                        </IconButton>
                      </Stack>
                    </ListItem>
                  </List>
                  {post.type === 'image' ? (
                    <Box sx={{ textAlign: "center" }}>
                      <img
                        onClick={()=>startFullScreenView(post)}
                        src={post?.media}
                        alt="post"
                        style={{ borderRadius: "18px", width: "100%" }}
                      />
                    </Box>
                  ):
                    <Box  sx={{ textAlign: "center" }}>
                        <video onClick={()=>startFullScreenView(post)} width="100%" height="250px" controls>
                          <source src={post?.media} id="video_here" />
                            Your browser does not support HTML5 video.
                        </video>
                    </Box>
                    } 
                  
                  {post.type !== "text" && (
                    <Box sx={{ px: 2 }}>
                      <Typography
                        component="span"
                        className="like-comm"
                        variant="body2"
                        sx={{ color: toggle ? "#fff" : "#000" }}
                      >
                        {post?.description}
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
                          className="d-flex align-items-center justify-content-center"
                          onClick={()=>handleLike(post)}
                        >
                          { (post.like_post.filter((ele:any)=>ele?.user?.id === props?.userDetails?.id)[0]) ? (
                              <FaHeart color="red" />
                              ) : (
                              <FavoriteBorderRoundedIcon />
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
                      {!post.is_bookmarked ? (
                        <IconButton
                          className="d-flex align-items-center justify-content-center"
                          onClick={()=>sendBookmark(post)}
                        >
                          <BookmarkBorderIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          className="d-flex align-items-center justify-content-center"
                          onClick={()=>deleteBookmark(post)}
                        >
                          <BookmarkIcon />
                        </IconButton>
                      )}
                    </Stack>
                    {post.can_delete ? (
                      <IconButton onClick={()=>deletePost(post)}>
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
                  {post.type !== "text" && (
                    <Box sx={{ px: 2 }}>
                      <Typography
                        component="span"
                        className="like-comm"
                        variant="body2"
                        sx={{ color: toggle ? "#fff" : "#000" }}
                      >
                        {post?.description}
                      </Typography>
                    </Box>
                  )}
                </Box>
          
                <TipPopUp
                  user={post.user}
                  onClose={handleCloseTip}
                  setOpenPopUpTip={setOpenPopUpTip}
                  onOpen={handleClickOpen}
                  openPopUpTip={openPopUpTip}
                />
              </>
              );
            })}
          </DialogContent>
        </div>
      </Dialog> : 
      <FullScreenModal 
          post = {Post} 
          open = {fullScreenModal}
          handleClose = {handleClose}
          userDetails = {props?.userDetails}
          fetchNextPost = {fetchNextPost}
          fetchPrevPost = {fetchPrevPost}
          onLikePost = {onLikePost}
          onBookmark = {onBookMark}
      />} 
      </>
    );
  };
  
  export default ViewMediaModalMobile;
  