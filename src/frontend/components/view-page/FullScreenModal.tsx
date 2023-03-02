import { Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { BookmarkPostInterface, LikePostInterface, UnlikePostInterface } from "frontend/interfaces/postInterface";
import { addBookmarkForPost, addLikeForPost, deleteBookmarkForPost, unlikeForPost } from "frontend/redux/actions/postActions";
import { RootState, dispatch } from "frontend/redux/store";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import TipPopUp from "../tip/TipPopUp";
import { useContext, useState } from "react";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type fullScreenModalProps = {
    post : any , 
    open : boolean ,
    handleClose : Function , 
    userDetails : any
}
const FullScreenModal = (props:fullScreenModalProps) => {
    const user: any = useSelector((state: RootState) => state.user.userData);
    const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false);
    const { toggle } = useContext(ThemeContext);


    const handleClickOpen = () => {
        setOpenPopUpTip(true);
    };
    
    const handleCloseTip = () => {
      setOpenPopUpTip(false);
    };

    const handleLike = async (post:any) => {
        if (!props?.userDetails || !props?.userDetails?.id) {
          toast.error("Can't find User");
          return;
        }
        if (post.like_post.map((ele:any)=>ele.user.id === props?.userDetails?.id )[0]) {
          const unlikeResp: UnlikePostInterface = await dispatch(
            unlikeForPost(user?.id, post?.id)
          );
          const unlikePost = post.like_post?.filter((item: any) =>
            typeof item.user !== "number"
              ? item.user?.id !== user?.id
              : item.user !== user?.id
          );
        } else {
          const likeResp: LikePostInterface = await dispatch(
            addLikeForPost(user?.id, post?.id)
          );
          const likePost = [...post.like_post, likeResp];
        }
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
        // if (bookmarkResp) {
        //   props?.onBookmark && props.onBookmark(true, post.id);
        // }
      };
    
      const deleteBookmark = async (post:any) => {
        if (!user || !user.id) {
          toast.error("Can't find User");
          return;
        }
    
        const deleteBookmark = await dispatch(deleteBookmarkForPost(post.id));
      };
    return (
        <Dialog 
        open={props.open}
        onClose={()=>props.handleClose()}
        sx={{
            '& .css-14yzeum-MuiPaper-root-MuiDialog-paper' : {
                margin:"0" , 
                minHeight:"100vh"
            } ,
            '& .css-hz1bth-MuiDialog-container' :{ 
                display:"block" , 
            } ,
        }}
        >
            <DialogContent sx={{minHeight:"100vh" , background:"white" , padding:"0"}}>
            <div style={{height:"1.3%"}}>
            <Box sx={{
              position:"fixed" ,
              padding:"3%" ,
              width:"100%" ,
              zIndex:"10",
              color:toggle? "white": "black" ,
              display:"flex",
              alignItems:"center"
            }}><ArrowBackIcon onClick={()=>props?.handleClose()}/><Typography mx={1} sx={{fontWeight:"bold"}}>Posts</Typography></Box>
          </div>
            <Box>
            <video
              style={{ width: "100%" , height:"100vh" }}
              controls
              autoPlay
            >
              <source src={props.post?.media} id="video_here" />
              Your browser does not support HTML5 video.
            </video>
                <Stack sx={{position:"absolute" , bottom:"5%" , width:"100%" }}  >
                    <Box sx={{display:"flex" , justifyContent:"space-between" , padding:"2%"}}>
                        <Box sx={{display:"flex" , flexDirection:"column" , alignItems:"left" , justifyContent:"center"}}>
                            <Typography variant='subtitle1' color='black'>User name</Typography>
                            <Typography variant='body1'color='black'>@username</Typography>
                            <Typography color='black'>.......</Typography>
                        </Box>
                        <Box sx={{ display: "flex" , flexDirection:"column" }}>
                            <IconButton
                              className="d-flex flex-column align-items-center justify-content-center"
                              onClick={()=>handleLike(props.post)}
                            >
                      { props.post.like_post.map((ele:any)=>ele.user.id === props?.userDetails?.id )[0] ? (
                          <FaHeart color="red" />
                          ) : (
                          <FavoriteBorderRoundedIcon />
                      )}
                      <Box sx={{ px: 2, color: toggle ? "#fff" : "#000" }}>
                        <p className="like-comm">
                            {+props.post?.like_post?.length -
                            (+props.post?.unlike_post?.length ? props.post?.unlike_post?.length : 0) ??
                            props.post?.like_post?.length}{" "} 
                        </p>
                      </Box>
                            </IconButton>
                    <IconButton
                      onClick={() => setOpenPopUpTip(true)}
                      sx={{ fontSize: "12px" }}
                    >
                      <MonetizationOnIcon />
                    </IconButton>
                  {!props.post.is_bookmarked ? (
                      <IconButton
                      className="d-flex align-items-center justify-content-center"
                      onClick={()=>sendBookmark(props.post)}
                      >
                      <BookmarkBorderIcon />
                    </IconButton>
                  ) : (
                      <IconButton
                      className="d-flex align-items-center justify-content-center"
                      onClick={()=>deleteBookmark(props.post)}
                      >
                      <BookmarkIcon />
                    </IconButton>
                  )}
                        </Box>
                    </Box>
                </Stack>
            </Box>
                
            <TipPopUp
                  user={props.post.user}
                  onClose={handleCloseTip}
                  setOpenPopUpTip={setOpenPopUpTip}
                  onOpen={handleClickOpen}
                  openPopUpTip={openPopUpTip}
                />
            </DialogContent>

        </Dialog>
    )
}

export default FullScreenModal;