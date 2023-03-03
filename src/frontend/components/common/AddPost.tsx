import React, { MouseEvent, useContext, useState } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { uploadMedia } from '../../redux/actions/commonActions'
import { postTypes } from 'frontend/data'
import { dispatch } from 'frontend/redux/store'
import { toast } from 'react-toastify'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ImageIcon from '@mui/icons-material/Image'
import { Box, Button, Divider, IconButton, Input, Stack } from '@mui/material'
import './post.scss'

interface Props {
  createPost: Function
  pageId?: number
}

interface DragEvent<T = Element> extends MouseEvent<T> {
  dataTransfer: DataTransfer
}

const AddPost = ({ createPost, pageId }: Props) => {
  const [file, setFile] = useState<any>('')
  const [image, setImage] = useState('')
  const [video, setVideo] = useState('')
  const [content, setContent] = useState('')
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const { toggle } = useContext(ThemeContext)

  const onCreatePost = async () => {
    if (!loading) {
      setLoading(true)
      const toastId = toast.loading('Uploading File...')
      const user = JSON.parse(localStorage.getItem('userData') ?? '{}')
      if (!user.id) {
        toast.update(toastId, {
          type: 'error',
          render: "Can't find User Id",
        })
        setTimeout(() => toast.dismiss(), 2000)
        return
      }

      if (pageId) {
        if (isFileUploaded && file) {
          try {
            dispatch(uploadMedia(file, 'photos',true)).then((res: any) => {
              if (res) {
                toast.update(toastId, {
                  render: 'File Uploaded Successful',
                  type: 'success',
                  isLoading: false,
                })
                dispatch(
                  createPost(toastId, {
                    type: image
                      ? postTypes.image.value
                      : video
                      ? postTypes.video.value
                      : postTypes.text.value,
                    user: user.id,
                    media: res || '',
                    content,
                    page: pageId,
                  })
                )
              }
            })
          } catch (exception: any) {
            toast.update('Error creating post...', {
              render: exception.toString(),
              type: 'error',
            })
            setTimeout(() => toast.dismiss(), 2000)
          }
        } else {
          await createPost(toastId, {
            type: postTypes.text.value,
            user: user.id,
            content,
            page: pageId,
          })
        }
      }

      setTimeout(() => {
        setContent('')
        setFile('')
        setIsFileUploaded(false)
        setImage('')
        setLoading(false)
        setVideo('')
      }, 2000)
    }
  }

  const handleFileChange = (file: File) => {
    setFile(file)
    setIsFileUploaded(true)

    if (getFileType(file) === 'image') {
      setImage((prevState: any) => URL.createObjectURL(file))
    } else if (getFileType(file) === 'video') {
      setVideo((prevState: any) => URL.createObjectURL(file))
    }
  }

  function getFileType(file: File) {
    if (file.type.match('image.*')) return 'image'

    if (file.type.match('video.*')) return 'video'

    if (file.type.match('audio.*')) return 'audio'

    // etc...

    return 'other'
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()

    if (e.dataTransfer.items) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
    e.preventDefault()
  }

  return (
    <Box
      id='drop-area'
      onDrop={onDrop}
      onDragOver={onDragOver}
      sx={{ borderRadius: 3 }}
      className={`shadow p-3 m-3 ${toggle ? 'bg-dark' : 'compose-background'}`}
    >
      <Input
        multiline
        rows={2}
        disableUnderline={true}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Compose new post...'
        style={{ color: toggle ? 'white' : '#161C24' }}
      />
      {image.length > 0 && (
        <div className='position-relative' style={{ width: 300 }}>
          <img src={image} style={{ width: 300 }} className='mb-3' alt='' />
        </div>
      )}
      {video.length > 0 && (
        <div
          className='post_video'
          style={{ minWidth: 100, width: 300, height: 'auto !important' }}
        >
          {/* we haven't track */}
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video width='300px' controls>
            <source src={video} id='video_here' />
            Your browser does not support HTML5 video.
          </video>
        </div>
      )}
      <Divider />
      <Stack className='d-flex justify-content-between align-items-center flex-row mt-2'>
        <Stack className='d-flex align-items-center justify-content-center flex-row'>
          <IconButton
            aria-label='upload picture'
            component='label'
            onClick={(event: any) => (event.target.value = null)}
          >
            <input
              hidden
              accept='video/*,image/*'
              multiple
              type='file'
              onChange={(e: any) => handleFileChange(e.target.files[0])}
            />
            <ImageIcon />
          </IconButton>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Stack>

        {video.length > 0 || image.length > 0 || content.length > 0 ? (
          <Stack justifyContent='flex-end' direction='row' spacing={2}>
            <Button
              onClick={() => {
                setVideo('')
                setFile('')
                setImage('')
                setContent('')
              }}
              variant='contained'
              color='secondary'
              className='ms-3'
            >
              Reset Post
            </Button>
            <Button variant='contained' onClick={onCreatePost}>
              Publish
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Box>
  )
}

export default AddPost
