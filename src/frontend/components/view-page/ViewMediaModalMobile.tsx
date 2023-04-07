/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { Box, Typography } from '@mui/material';
import { PostInterface } from 'frontend/interfaces/postInterface';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PostItem from 'frontend/pages/Lounge/PostItem/PostItem';
import FullScreenModal from './FullScreenModal';


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
  dataList?: any[];
  selectedMedia: any;
  onPostUpdate: (post: PostInterface) => void;
};

const ViewMediaModalMobile = (props: ViewMediaModalProps) => {
  const { toggle } = React.useContext(ThemeContext);

  const [fullScreenModal, setFullScreenModal] = React.useState<boolean>(false);
  const [postData, setPostData] = React.useState(props.dataList ?? []);
  const [post, setPost] = React.useState();

  React.useEffect(() => {
    setPostData(props?.dataList || []);
  }, [props.dataList]);

  React.useEffect(() => {
    setTimeout(() => {
      const postEl = document.getElementById(`${props.selectedMedia.id}`);

      if (postEl) {
        window.scrollTo({
          top: postEl.getBoundingClientRect().top + window.scrollY - 60,
          behavior: 'smooth',
        });
      }
    },100)
  },[props.selectedMedia.id]);


  const handlePostLike = (likes: any[], postId: number) => {
    const getUpdatedPost = (prev: any) => ({
      ...prev,
      like_post: likes,
      total_likes: likes.length,
    })

    setPost(getUpdatedPost);
    const newMediaList = postData.map((item: any) =>
      item.id === postId ? getUpdatedPost(item) : item
    );

    setPostData(newMediaList);
    if (props.onLikePost) {
      props.onLikePost(likes, postId);
    }
  };

  const onBookMark = (isBookmark: Boolean, postId: number) => {
    setPost((prev: any) => ({ ...prev, is_bookmarked: isBookmark }));
    const newMediaList = postData.map((item: any) =>
      item.id === postId ? { ...item, is_bookmarked: isBookmark } :item
    );
    setPostData(newMediaList);
  }

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

  if (fullScreenModal) {
    return (
      <FullScreenModal
        post={post}
        open={fullScreenModal}
        handleClose={handleClose}
        userDetails={props?.userDetails}
        fetchNextPost={fetchNextPost}
        fetchPrevPost={fetchPrevPost}
        onLikePost={handlePostLike}
        onBookmark={onBookMark}
      />
    );
  }

  if (!props.open) {
    return null;
  }

  return (
    <div
      className="post-vertical"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        zIndex: 1200,
      }}
    >
      <div style={{height:"1.3%"}}>
        <Box
          sx={{
            position:"fixed" ,
            padding:"3%" ,
            background: toggle ? "black" :"white" ,
            width:"100%" ,
            zIndex:"10",
            color:toggle? "white": "black" ,
            display:"flex",
            alignItems:"center"
          }}
        >
          <ArrowBackIcon onClick={()=>props?.handleClose()} />
          <Typography mx={1} sx={{ fontWeight:"bold" }}>
            Posts
          </Typography>
        </Box>
      </div>

      <div
        className="dialogContent"
        style={{
          background: toggle ? "black" :"white",
          paddingTop: '50px',
          paddingBottom: '50px',
        }}
      >
        {postData.map((item: any, i: number) => (
          <PostItem
            key={`mobile_view-${item.id}-${i}`}
            post={item}
            onClickMedia={startFullScreenView}
            onPostDelete={(postId) => {
              if (props?.onDelete) {
                props?.onDelete(postId);
              }
              props.handleClose();
            }}
            onPostLike={handlePostLike}
            onPostUpdate={props.onPostUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default ViewMediaModalMobile;
