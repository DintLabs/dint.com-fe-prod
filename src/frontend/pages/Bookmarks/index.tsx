import { Grid, IconButton, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Submenu from 'frontend/components/submenu';
import { bookmarkSubmenu } from 'frontend/data';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import AllBookmarks from './AllBookmarks';
import Audio from './Audio';
import Locked from './Locked';
import Other from './Other';
import Photos from './Photos';
import Videos from './Videos';

const Bookmarks = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  // const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  return (
    <Grid container>
      <>
        {isLargeScreen ? (
          <Submenu title="Bookmarks" username=" " routes={bookmarkSubmenu} noTag />
        ) : (
          <>
            {location.pathname !== `/settings` && (
              <IconButton onClick={() => navigate(-1)}>
                <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
              </IconButton>
            )}
          </>
        )}
      </>

      <Grid item xs={12} md={8}>
        <Routes>
          <Route
            path="/"
            element={
              isLargeScreen ? (
                <></>
              ) : (
                <Submenu title="Bookmarks" username=" " routes={bookmarkSubmenu} noTag />
              )
            }
          />

          {/* Main routers */}
          <Route path="/all-bookmarks" element={<AllBookmarks />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/other" element={<Other />} />
          <Route path="/locked" element={<Locked />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Bookmarks;
