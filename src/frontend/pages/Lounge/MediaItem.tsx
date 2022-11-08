import { Box, useTheme } from '@mui/material';

const PostItem = ({
  userName,
  description,
  image,
  createdAt,
  post
}: {
  image?: string;
  userName: string;
  description: string;
  createdAt: string;
  post: Object;
}) => {
  const theme = useTheme();
  const images = ['jpg', 'gif', 'png', 'svg', 'webp', 'ico', 'jpeg'];
  const videos = ['mp4', 'MP4', 'MOV', 'mov', '3gp', 'ogg', 'quicktime'];

  const url = new URL(image ?? 'https://google.com');
  const extension = url.pathname.split('.')[1];

  return (
    <>
      <Box
        className="mb-3"
        style={{
          borderBottom: `1px solid ${theme.palette.grey[700]}`
        }}
      >
        {image && images.includes(extension) && (
          <Box sx={{ textAlign: 'center' }}>
            <img src={image} alt="post" style={{ width: '100%' }} />
          </Box>
        )}

        {image && videos.includes(extension) && (
          <Box sx={{ textAlign: 'center' }}>
            {/* we haven't track */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video width="100%" controls>
              <source src={image} id="video_here" />
              Your browser does not support HTML5 video.
            </video>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PostItem;
