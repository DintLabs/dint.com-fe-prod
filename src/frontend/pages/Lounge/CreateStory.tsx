import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

import './navbarTab.css'
import { Box, Button, Divider, Stack, useMediaQuery } from '@mui/material'
import MultimediaIcon from '../../assets/img/icons/picture.png'
import { uploadMedia } from 'frontend/services/mediaService'

interface Props {
  widthScreen: number
  createStory: Function
}

const CreateStory = ({ widthScreen, createStory }: Props) => {
  const mobileView = useMediaQuery('(max-width:899px)')
  const navigate = useNavigate()

  const [file, setFile] = useState<any>({})
  const [content, setContent] = React.useState('')
  const [image, setImage] = React.useState('')
  const [video, setVideo] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const { toggle } = useContext(ThemeContext)

  const onCreateStory = async () => {
    if (!loading) {
      setLoading(true)
      const toastId = toast.loading('Uploading File...')
      navigate('/lounge')

      const user = JSON.parse(localStorage.getItem('userData') ?? '{}')
      if (!user.id) {
        toast.update(toastId, {
          type: 'error',
          render: "Can't find User Id",
        })
        setTimeout(() => toast.dismiss(), 2000)
        return
      }
      if (file) {
        try {
          const uploadResult = await uploadMedia(file, 'photos', false, 'story')
          toast.update(toastId, {
            render: 'Story Uploaded Successful',
            type: 'success',
            isLoading: false,
          })
          
          const storyUrl = uploadResult.data.data.data[0].media_file_url;
          const fileType = uploadResult.data.data.data[0].file_type.split("/")[0];

          let userId = user.id
          // let fileData = file
          const result = await createStory(toastId, userId, storyUrl, fileType)

        } catch (exception: any) {
          toast.update('Error adding...', {
            render: exception.toString(),
            type: 'error',
          })

          setTimeout(() => toast.dismiss(), 2000)
        }
      }

      setTimeout(() => {
        setContent('')
        setFile(null)
        setImage('')
        setLoading(false)
        setVideo('')
      }, 2000)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? (event.target.files[0] as File) : null
    if (!file) return
    setFile(file)
    if (getFileType(file) === 'image') {
      setImage(URL.createObjectURL(file))
      setVideo('')
    } else if (getFileType(file) === 'video') {
      setVideo(URL.createObjectURL(file))
      setImage('')
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    setFile(file)
    if (getFileType(file) === 'image') {
      setImage(URL.createObjectURL(file))
      setVideo('')
    } else if (getFileType(file) === 'video') {
      setVideo(URL.createObjectURL(file))
      setImage('')
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  function getFileType(file: File) {
    if (file.type.match('image.*')) return 'image'
    if (file.type.match('video.*')) return 'video'
    if (file.type.match('audio.*')) return 'audio'
    // etc...
    return 'other'
  }

  return (
    <>
      <Box
        className={mobileView ? 'custom-modal-mobile' : 'custom-modal'}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Box
          sx={{ borderRadius: 3 }}
          className={`shadow compose-background ${toggle ? 'bg-dark' : 'bg-white'}`}
        >
          <Box className='d-flex justify-content-center align-items-center'>
            <h4>Create New Story</h4>
          </Box>
          <Divider />
          {image && (
            <div className='position-relative d-flex media-file-preview-container'>
              <img src={image} className='mb-3 media-file-preview' alt='imag' />
            </div>
          )}
          {video && (
            <div className='post_video media-file-preview-container'>
              <video width='100%' height='100%' controls className='media-file-preview'>
                <source src={video} id='video_here' />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}

          <Stack className='d-flex flex-column justify-content-between h-100 flex-1 overflow-auto align-items-center flex-row center-pos'>
            {video.length > 0 || image.length > 0 ? null : (
              <Stack className='d-flex align-items-center justify-content-center w-100 upload-img flex-column'>
                <img
                  src={MultimediaIcon}
                  style={{ width: '20%', height: 'auto', marginTop: '3%' }}
                />
                <Button
                  aria-label='upload story'
                  component='label'
                  variant='contained'
                  style={{ marginTop: '2%', width: '20%' }}
                >
                  <input
                    hidden
                    accept='video/*,image/*'
                    multiple
                    type='file'
                    onChange={handleFileChange}
                  />
                  Select
                </Button>
              </Stack>
            )}
          </Stack>
          <div className='d-flex justify-content-between align-items-end mt-2 w-100'>
            <Button
              onClick={() => {
                setVideo('')
                setFile({})
                setImage('')
                setContent('')
              }}
              variant='contained'
              color='secondary'
              disabled={video.length > 0 || image.length > 0 || content.length > 0 ? false : true}
            >
              Remove
            </Button>
            <Button onClick={onCreateStory} variant='contained'
              disabled={video.length > 0 || image.length > 0 || content.length > 0 ? false : true}
            >
              Publish
            </Button>
          </div>
        </Box>
      </Box>
    </>
  )
}

export default CreateStory
