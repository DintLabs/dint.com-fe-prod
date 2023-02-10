import { useContext, useLayoutEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Box, Grid } from "@mui/material";

import { isIPhone, isMobile } from "frontend/utils";

import Sidebar from "frontend/pages/Lounge/Sidebar";
import SidebarMobile from "frontend/pages/Lounge/SidebarMobile";

import { RootState, useSelector } from "frontend/redux/store";
import MainNavBar from "../main/MainNavBar";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function LoungeLayout({ isSearchPage = false }) {
  const [widthScreen, setWidthScreen] = useState<number>(window.screen.width);
  const user = useSelector((store: RootState) => store.user.userData);

  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  useLayoutEffect(() => {
    function updateWidth() {
      setWidthScreen(window.screen.width);
    }
    window.addEventListener('resize', updateWidth);
    updateWidth();
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const styleSidebarMobile = {
    display: widthScreen >= 900 ? 'none' : '',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: '120'
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: isIPhone() ? window.innerHeight : '100vh'
      }}
    >
      {/* <div>
        <MainNavBar />
      </div> */}
      <div id="page-body" className="" style={{ minHeight: '100vh' }}>
        <Box
          sx={{
            width: '100%',
            minHeight: '100vh',
            bgcolor: 'background.default'
          }}
          className={ toggle ? '' : 'white-content' }
        >
          <Container style={{ margin: 'auto', padding: '0', minWidth:'100%', width:'100%' }}>
            <Helmet>
              <title>Lounge</title>
              <meta
                name="description"
                content="Dint Events, buy event tickets. Use your digital assets to create event tickets"
              />
            </Helmet>
            <Box>
              <Grid container>
                {isSearchPage ? (
                  <Grid item xs={0} md={3} />
                ) : (
                  <Grid
                    item
                    xs={0}
                    md={3}
                    sx={{ display: widthScreen >= 900 ? "" : "none" }}
                  >
                    {user && !!user.id && !isMobile() && <Sidebar />}
                  </Grid>
                )}
                <Grid item sx={styleSidebarMobile}>
                  {user && !!user.id && isMobile() && (
                    <SidebarMobile widthScreen={widthScreen} />
                  )}
                </Grid>
                <Grid item xs={12} md={isSearchPage ? 6 : 9}>
                  <Outlet />
                </Grid>
                {isSearchPage && <Grid item xs={0} md={3} />}
              </Grid>
            </Box>
          </Container>
        </Box>
      </div>
    </div>
  );
}
