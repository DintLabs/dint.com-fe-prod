import {
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Submenu from 'frontend/components/submenu';
import { followerSubmenu } from 'frontend/data';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { IoIosOptions } from 'react-icons/io';

import AllFollowers from './AllFollowers';
import RequestedFollowers from './RequestedFollowers';

const Followers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerFlag, setDrawerFlag] = useState(false);

  const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerFlag(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {followerSubmenu.map((item, index) => (
          <ListItem key={index} disablePadding onClick={() => navigate(item.href)}>
            <ListItemButton>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Grid container>
        {isLargeScreen ? (
          <Submenu
            title="Followers"
            username={savedUser?.custom_username}
            routes={followerSubmenu}
          />
        ) : (
          <>
            {/* <Button onClick={toggleDrawer(true)}>Button</Button> */}
            <IconButton onClick={toggleDrawer(true)} style={{ paddingLeft: 16 }}>
              <IoIosOptions className="primary-text-color cursor-pointer" />
            </IconButton>
            <Drawer anchor="left" open={drawerFlag} onClose={toggleDrawer(false)}>
              {list()}
            </Drawer>
          </>
        )}
        <Grid item xs={12} md={8}>
          <Routes>
            <Route path="/requests" element={<RequestedFollowers />} />
            <Route path="/" element={<AllFollowers />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
};

export default Followers;
