import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Box sx={{ minHeight: '100vh', height: '100%' }}>
    <Typography variant="h4" color="white" sx={{ textAlign: 'center', padding: 4 }}>
      Sorry, this page isn't available.
    </Typography>
    <Typography variant="h6" color="white" sx={{ textAlign: 'center' }}>
      The link you followed may have been broken, or the page may have been removed. Go to{' '}
      <Link to="/lounge">Lounge</Link>
    </Typography>
  </Box>
);

export default NotFound;
