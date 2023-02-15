import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, IconButton, Input, Stack, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import './navbarTab.css';

import { uploadMedia } from 'frontend/services/mediaService';
import { toast } from 'react-toastify';
import { postTypes } from 'frontend/data';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router';

interface Props {
  widthScreen: number;
  createPost: Function;
}

const AddPost = ({ widthScreen, createPost }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [file, setFile] = useState<any>({});
  const [content, setContent] = React.useState('');
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [image, setImage] = React.useState('');
  const [video, setVideo] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { toggle } = useContext(ThemeContext);


  const onCreatePost = async () => {
    if (!loading) {
      setLoading(true);
      const toastId = toast.loading('Uploading File...');
      navigate('/lounge')

      const user = JSON.parse(localStorage.getItem('userData') ?? '{}');
      if (!user.id) {
        toast.update(toastId, {
          type: 'error',
          render: "Can't find User Id"
        });
        setTimeout(() => toast.dismiss(), 2000);
        return;
      }

      if (isFileUploaded && file) {
        try {
          const uploadResult = await uploadMedia(file, 'photos');
          toast.update(toastId, {
            render: 'File Uploaded Successful',
            type: 'success',
            isLoading: false
          });

          await createPost(toastId, {
            type: image
              ? postTypes.image.value
              : video
              ? postTypes.video.value
              : postTypes.text.value,
            user: user.id,
            media: uploadResult?.data?.data?.data[0]?.media_file_url || '',
            content
          });
        } catch (exception: any) {
          toast.update('Error adding...', {
            render: exception.toString(),
            type: 'error'
          });

          setTimeout(() => toast.dismiss(), 2000);
        }
      } else {
        await createPost(toastId, {
          type: postTypes.text.value,
          user: user.id,
          content
        });
      }

      setTimeout(() => {
        setContent('');
        setFile(null);
        setIsFileUploaded(false);
        setImage('');
        setLoading(false);
        setVideo('');
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? (event.target.files[0] as File) : null;

    if (!file) return;

    setFile(file);

    setIsFileUploaded(true);
    if (getFileType(file) === 'image') {
      setImage(URL.createObjectURL(file));
      setVideo('');
    } else if (getFileType(file) === 'video') {
      setVideo(URL.createObjectURL(file));
      setImage('');
    }
  };

  function getFileType(file: File) {
    if (file.type.match('image.*')) return 'image';

    if (file.type.match('video.*')) return 'video';

    if (file.type.match('audio.*')) return 'audio';

    // etc...

    return 'other';
  }

  return (
    <>
      <Box className='custom-modal'
        sx={{ height: widthScreen >= 900 ? '90vh' : 'full', overflowY: 'scroll', maxWidth: '720px', margin: '0 auto' }}
      >
        <Box sx={{ borderRadius: 3 }} className={`shadow compose-background p-3 m-3 ${toggle ? 'bg-dark' : 'bg-white'}`}>
          <Box className='d-flex justify-content-center align-items-center'>
              <h4>Create New Post</h4>
          </Box>
          <div style={{ borderBottom: '1px solid grey' }} className="w-100" />
          <Input
            multiline
            rows={1}
            disableUnderline={true}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Compose new post..."
            style={{color: toggle ? 'white' : '#161C24'}}
          />
          {image && (
            <div className="position-relative" style={{ width: '100%', flex: 1, height: '100%' }}>
              <img src={image} style={{ maxWidth: '100%', height: 'auto' }} className="mb-3" alt="imag" />
            </div>
          )}
          {video && (
            <div
              className="post_video"
              style={{ minWidth: '100%', width: '100%', height: 'auto !important', flex: 1   }}
            >
              {/* we haven't track */}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video width="100%" height="100%" controls>
                <source src={video} id="video_here" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}
          
          <Stack className="d-flex flex-column justify-content-between h-100 flex-1 align-items-center flex-row center-pos">
            {video.length > 0 || image.length > 0 ? null :
              <Stack className="d-flex align-items-center justify-content-center w-100 upload-img flex-row">
              <IconButton aria-label="upload picture" component="label">
                <input
                  hidden
                  accept="video/*,image/*"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
                <ImageIcon />
              </IconButton>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Stack>
            }
         </Stack>
            <div className='d-flex justify-content-between align-items-end mt-2 w-100'>
              {video.length > 0 || image.length > 0 || content.length > 0 ? (
                <>
                  <Button
                    onClick={() => {
                      setVideo('');
                      setFile({});
                      setImage('');
                      setContent('');
                    }}
                    variant="contained"
                    color="secondary"
                  
                  >
                    Reset Post
                  </Button>
                  <Button onClick={onCreatePost} variant="contained">
                    Publish
                  </Button>
                </>
              ) : null}
            </div>
          
        </Box>
      </Box>
    </>
  );
};

export default AddPost;
