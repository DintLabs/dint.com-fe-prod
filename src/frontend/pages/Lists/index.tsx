import { Avatar, Grid, IconButton, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Submenu from 'frontend/components/submenu';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol, FlexRow } from 'frontend/reusable/reusableStyled';
import SortIcon from '@mui/icons-material/Sort';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

const Lists = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const goToProfile = () => {
    // navigate(`/${data?.follower?.custom_username}`);
  };

  return (
    <Grid container>
      <>
        {isLargeScreen ? (
          <Submenu title="Lists" username="" routes={[]} md={12} isPlusIco />
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

      <Grid container sx={{ position: 'relative' }}>
        <GridWithBoxConteiner sx={{ borderBottom: 'none' }}>
          <FlexRow w="100%" jc="space-between" ai="center">
            <Typography
              className="primary-text-color"
              variant="caption"
              sx={{ fontWeight: 'bold', fontSize: '13px' }}
            >
              CUSTOM ORDER
            </Typography>

            <SortIcon />
          </FlexRow>
        </GridWithBoxConteiner>

        <GridWithBoxConteiner>
          <FlexCol>
            <Typography className="primary-text-color typo-label" variant="subtitle2">
              Close Friends
            </Typography>
            <Typography className="primary-text-color typo-label" variant="caption">
              1 person • 235 posts
            </Typography>
          </FlexCol>
          <Avatar
            onClick={goToProfile}
            src="/icons/img/example.jpg"
            sx={{ width: 50, height: 50, cursor: 'pointer' }}
          />
        </GridWithBoxConteiner>

        <GridWithBoxConteiner onClick={() => {
          // dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.SUBSCRIPTIONS }));
          navigate('/lounge/subscriptions');
        }}>
          <FlexCol>
            <Typography className="primary-text-color typo-label" variant="subtitle2">
            Subscriptions
            </Typography>
            <Typography className="primary-text-color typo-label" variant="caption">
              10 person • 4,0K posts
            </Typography>

          </FlexCol>
        </GridWithBoxConteiner>


        <GridWithBoxConteiner onClick={() => navigate('/lounge/subscriptions')}>
          <FlexCol>
            <Typography className="primary-text-color typo-label" variant="subtitle2">
              Following
            </Typography>
            <Typography className="primary-text-color typo-label" variant="caption">
              10 person • 4,0K posts
            </Typography>
          </FlexCol>
          <Avatar
            onClick={goToProfile}
            src="/icons/img/example.jpg"
            sx={{ width: 50, height: 50, cursor: 'pointer' }}
          />
        </GridWithBoxConteiner>



        <GridWithBoxConteiner onClick={() => {
          navigate('/followers');
        }}>
          <FlexCol>
            <Typography className="primary-text-color typo-label" variant="subtitle2">
              Followers
            </Typography>
            <Typography className="primary-text-color typo-label" variant="caption">
              10 person • 4,0K posts
            </Typography>
          </FlexCol>

        </GridWithBoxConteiner>

        <GridWithBoxConteiner onClick={() => navigate('/bookmarks')}>
          <FlexCol>
            <Typography className="primary-text-color typo-label" variant="subtitle2">
              Bookmarks
            </Typography>
            <Typography className="primary-text-color typo-label" variant="caption">
              empty
            </Typography>
          </FlexCol>
        </GridWithBoxConteiner>

        <GridWithBoxConteiner>
          <FlexCol>
            <Typography className="primary-text-color typo-label" variant="subtitle2">
              Restricted
            </Typography>
            <Typography className="primary-text-color typo-label" variant="caption">
              empty
            </Typography>
          </FlexCol>
        </GridWithBoxConteiner>

        <GridWithBoxConteiner>
          <FlexCol>
            <Typography className="primary-text-color typo-label" variant="subtitle2">
              Blocked
            </Typography>
            <Typography className="primary-text-color typo-label" variant="caption">
              empty
            </Typography>
          </FlexCol>
        </GridWithBoxConteiner>
        {/* <Routes>
          <Route
            path="/"
            element={isLargeScreen ? <></> : <Submenu title="Lists" username="" routes={[]} />}
          />
          Main routers
          <Route path="/bookmarks/all-bookmarks" element={<ProfileSettings />} />
        </Routes> */}
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Lists;