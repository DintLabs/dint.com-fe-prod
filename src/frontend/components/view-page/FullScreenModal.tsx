import { Dialog, DialogContent, IconButton, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import {
  BookmarkPostInterface,
  LikePostInterface,
  UnlikePostInterface,
} from 'frontend/interfaces/postInterface'
import {
  addBookmarkForPost,
  addLikeForPost,
  deleteBookmarkForPost,
  unlikeForPost,
} from 'frontend/redux/actions/postActions'
import { RootState, dispatch } from 'frontend/redux/store'
import { FaHeart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import TipPopUp from '../tip/TipPopUp'
import { useContext, useState } from 'react'
import { ThemeContext } from 'frontend/contexts/ThemeContext'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom';

type fullScreenModalProps = {
  post: any
  open: boolean
  handleClose: Function
  userDetails: any
  fetchNextPost?: (id: number) => void
  fetchPrevPost?: (id: number) => void
  onLikePost?: (post: any[], id: number) => void
  onBookmark?: (isBookmark: Boolean, id: number) => void
}
const FullScreenModal = (props: fullScreenModalProps) => {
  const navigate = useNavigate();
  const user: any = useSelector((state: RootState) => state.user.userData)
  const [openPopUpTip, setOpenPopUpTip] = useState<boolean>(false)
  const { toggle } = useContext(ThemeContext)
  const [id, setId] = useState(props.post?.id)

  const handleClickOpen = () => {
    setOpenPopUpTip(true)
  }

  const handleCloseTip = () => {
    setOpenPopUpTip(false)
  }

  let touchstartY: number, touchendY: number

  const handleUserTouchStart = (event: any) => {
    if (props.open) {
      touchstartY = event.changedTouches[0].screenY
      handleGesture()
    }
  }

  const handleUserTouchEnd = (event: any) => {
    if (props.open) {
      touchendY = event.changedTouches[0].screenY
      handleGesture()
    }
  }

  const handleGesture = () => {
    if (touchendY > touchstartY) {
      if (props?.post) {
        if (props?.post?.id) props?.fetchPrevPost && props.fetchPrevPost(id)
      }
    }
    if (touchendY < touchstartY) {
      if (props?.post) {
        if (props?.post?.id) props?.fetchNextPost && props.fetchNextPost(id)
      }
    }
  }

  const handleLike = async (post: any) => {
    if (!props?.userDetails || !props?.userDetails?.id) {
      toast.error("Can't find User")
      return
    }
    if (props.post.like_post.filter((ele: any) => ele?.user?.id === props?.userDetails?.id)[0]) {
      const unlikeResp: UnlikePostInterface = await dispatch(unlikeForPost(user?.id, post?.id))
      const unlikePost = post.like_post?.filter((item: any) =>
        typeof item.user !== 'number' ? item.user?.id !== user?.id : item.user !== user?.id
      )
      props?.onLikePost && props.onLikePost(unlikePost, post?.id)
    } else {
      const likeResp: LikePostInterface = await dispatch(addLikeForPost(user?.id, post?.id))
      const likePost = [...post.like_post, likeResp]
      props?.onLikePost && props.onLikePost(likePost, post?.id)
    }
  }

  const sendBookmark = async (post: any) => {
    if (post.is_bookmarked) {
      toast.warn('You have Already bookmarked this post')
      return
    }

    if (!props?.userDetails || !props?.userDetails?.id) {
      toast.error("Can't find User")
      return
    }
    const bookmarkResp: BookmarkPostInterface = await dispatch(addBookmarkForPost(post.id))
    if (bookmarkResp) {
      props?.onBookmark && props.onBookmark(true, post.id)
    }
  }

  const deleteBookmark = async (post: any) => {
    if (!user || !user.id) {
      toast.error("Can't find User")
      return
    }

    const deleteBookmark = await dispatch(deleteBookmarkForPost(post.id))
    if (deleteBookmark.code === 200) {
      props?.onBookmark && props.onBookmark(false, post.id)
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      sx={{
        '& .css-14yzeum-MuiPaper-root-MuiDialog-paper': {
          margin: '0',
          minHeight: '100vh',
        },
        '& .css-hz1bth-MuiDialog-container': {
          display: 'block',
        },
      }}
    >
      <DialogContent sx={{ minHeight: '100vh', background: 'white', padding: '0' }}>
        <div style={{ height: '1.3%' }}>
          <Box
            sx={{
              position: 'fixed',
              padding: '3%',
              width: '100%',
              zIndex: '10',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: 'large',
              '& .css-14yzeum-MuiPaper-root-MuiDialog-paper': { minHeight: '100vh', margin: '0' },
            }}
          >
            <ArrowBackIcon onClick={() => props?.handleClose()} />
            <Typography mx={1} sx={{ fontWeight: 'bold' }}>
              Posts
            </Typography>
          </Box>
        </div>
        <Box
          sx={{
            '& .css-14yzeum-MuiPaper-root-MuiDialog-paper': { minHeight: '100vh', margin: '0' },
          }}
        >
          {props.post.type === 'image' ? (
            <Box sx={{ textAlign: 'center' }}>
              <img
                onTouchStart={handleUserTouchStart}
                onTouchEnd={handleUserTouchEnd}
                src={props.post?.media}
                alt='post'
                style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
              />
            </Box>
          ) : (
            <video
              onTouchStart={handleUserTouchStart}
              onTouchEnd={handleUserTouchEnd}
              style={{
                width: '100%',
                height: 'auto'
              }}
              controls
              autoPlay
            >
              <source src={props.post?.media} id='video_here' />
              Your browser does not support HTML5 video.
            </video>
          )}
          <Stack sx={{ position: 'absolute', bottom: '5%', width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '2%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='subtitle1'
                  color='white'
                  fontWeight='bold'
                  onClick={() => navigate(`/${props.post.user.custom_username}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  {props.post.user.display_name}
                </Typography>
                <Typography
                  variant='body1'
                  color='white'
                  fontWeight='bold'
                  onClick={() => navigate(`/${props.post.user.custom_username}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  @{props.post.user.custom_username}
                </Typography>
                <Typography color='black'>.......</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton
                  className='d-flex flex-column align-items-center justify-content-center'
                  onClick={() => handleLike(props.post)}
                >
                  {props.post.like_post.some((ele: any) => {
                    if (!ele?.user) return false;
                    return ele?.user === props?.userDetails?.id || ele?.user?.id === props?.userDetails?.id;
                  }) ? (
                    <FaHeart color='red' />
                  ) : (
                    <FavoriteBorderRoundedIcon sx={{ color: '#fff' }} />
                  )}
                  <Box sx={{ px: 2, color: toggle ? '#fff' : '#000' }}>
                    <p className='like-comm' style={{ color: 'white', fontWeight: 'bold' }}>
                      {+props.post?.like_post?.length -
                        (+props.post?.unlike_post?.length ? props.post?.unlike_post?.length : 0) ??
                        props.post?.like_post?.length}{' '}
                    </p>
                  </Box>
                </IconButton>
                {user?.id !== props?.post?.user?.id && (
                  <IconButton
                    onClick={() => setOpenPopUpTip(true)}
                    sx={{ fontSize: '12px', color: '#fff' }}>
                    <MonetizationOnIcon />
                  </IconButton>
                )}
                {!props.post.is_bookmarked ? (
                  <IconButton
                    className='d-flex align-items-center justify-content-center'
                    onClick={() => sendBookmark(props.post)}
                  >
                    <BookmarkBorderIcon sx={{ color: '#fff' }} />
                  </IconButton>
                ) : (
                  <IconButton
                    className='d-flex align-items-center justify-content-center'
                    onClick={() => deleteBookmark(props.post)}
                  >
                    <BookmarkIcon sx={{ color: '#fff' }} />
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

export default FullScreenModal
