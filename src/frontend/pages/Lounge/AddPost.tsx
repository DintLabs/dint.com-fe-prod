import ImageIcon from '@mui/icons-material/Image';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, Button, IconButton, Input, Stack, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import './navbarTab.css';

import { uploadMedia } from 'frontend/services/mediaService';
import { toast } from 'react-toastify';
import { postTypes } from 'frontend/data';
import { ThemeContext } from '../../contexts/ThemeContext';

interface Props {
  widthScreen: number;
  createPost: Function;
}

const AddPost = ({ widthScreen, createPost }: Props) => {
  const theme = useTheme();

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
      <Box
        sx={{ height: widthScreen >= 900 ? '90vh' : 'full', overflowY: 'scroll' }}
      >
        <Box sx={{ borderRadius: 3 }} className={`shadow p-3 m-3 ${toggle ? 'bg-dark' : 'compose-background'}`}>
          <Input
            multiline
            rows={4}
            disableUnderline={true}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Compose new post..."
            style={{color: toggle ? 'white' : '#161C24'}}
          />
          {image && (
            <div className="position-relative" style={{ width: 300 }}>
              <img src={image} style={{ width: 300 }} className="mb-3" alt="imag" />
            </div>
          )}
          {video && (
            <div
              className="post_video"
              style={{ minWidth: 100, width: 300, height: 'auto !important' }}
            >
              {/* we haven't track */}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video width="300px" controls>
                <source src={video} id="video_here" />
                Your browser does not support HTML5 video.
              </video>
            </div>
          )}
          <div style={{ borderBottom: '1px solid grey' }} className="w-100" />
          <Stack className="d-flex justify-content-between align-items-center flex-row mt-2">
            <Stack className="d-flex align-items-center justify-content-center flex-row">
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

            <div>
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
                    className="ms-3"
                  >
                    Reset Post
                  </Button>
                  <Button onClick={onCreatePost} variant="contained">
                    Publish
                  </Button>
                </>
              ) : null}
            </div>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AddPost;
