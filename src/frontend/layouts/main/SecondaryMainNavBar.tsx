// import { createStyles, makeStyles } from '@material-ui/styles';
import { Box } from "@mui/material";
import { isIPhone } from "frontend/utils";
import { useContext } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import MainFooter from "./MainFooter";
import MainNavbar from "./MainNavBar";
import SecondaryFooter from "./SecondaryFooter";

export default function SecondaryMainNavBar() {
  const { pathname } = useLocation();
  const { toggle } = useContext(ThemeContext);

  // If the curent route is either  '/lounge', or  '/terms', or '/cookies', hide the main footer. 
  const getConditionsToNotShowMainFooter = () => {
    if (
      pathname.includes("/lounge") ||
      pathname.includes("/terms") ||
      pathname.includes("/cookies") ||
      pathname.includes("/privacy")
    )
      return false;

    return true;
  };

  // If the curent route is either '/terms', or '/cookies'. Show secondary footer instead of main footer.
  const shouldShowSecondaryFooter =
    pathname.includes("/terms") || pathname.includes("/cookies") || pathname.includes("/privacy");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: isIPhone() ? window.innerHeight : "100vh",
      }}
    >
      {!pathname.includes("/lounge") && <MainNavbar />}

      <div id="page-body" style={{ minHeight: "calc(100vh - 80px)" }}>
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
          className={toggle ? "" : "white-content"}
        >
          <Container style={{ margin: 0, padding: '0', minWidth:'100%', width:'100%' }}>
            <Outlet />
          </Container>
          {getConditionsToNotShowMainFooter() && <MainFooter />}
          {shouldShowSecondaryFooter && <SecondaryFooter />}
        </Box>
      </div>
    </div>
  );
}
