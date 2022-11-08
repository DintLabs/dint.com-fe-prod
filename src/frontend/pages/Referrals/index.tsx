import { Grid, IconButton, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Submenu from 'frontend/components/submenu';
import { referralsSubmenu } from 'frontend/data';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import MainReferrals from './MainReferrals';

const Referrals = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  // const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  return (
    <Grid container>
      <>
        {isLargeScreen ? (
          <>
            <Submenu
              title="REFERRAL"
              username={' '}
              routes={referralsSubmenu}
              secondBlocks={[]}
              noTag
              isLink={false}
            />
          </>
        ) : (
          <>
            {location.pathname !== `/referrals` && (
              <IconButton onClick={() => navigate(-1)}>
                <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
              </IconButton>
            )}
          </>
        )}
      </>

      <Grid item xs={12} md={8}>
        <Routes>
          {/* Main routers */}
          <Route path="/" element={<MainReferrals />} />
        </Routes>
      </Grid>
    </Grid>
  );
};

export default Referrals;
