// import { createStyles, makeStyles } from '@material-ui/styles';
import { Box } from "@mui/material";
import { isIPhone } from "frontend/utils";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import MainFooter from "./MainFooter";
import MainNavbar from "./MainNavBar";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function SecondaryMainNavBar() {
  const { pathname } = useLocation();
  const { toggle } = useContext(ThemeContext);

  const shouldHideFooter = !pathname.includes("/lounge");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: isIPhone() ? window.innerHeight : "100vh",
      }}
    >
      <MainNavbar />

      <div id="page-body" style={{ minHeight: "calc(100vh - 80px)" }}>
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
          className={toggle ? "" : "white-content"}
        >
          <Container>
            <Outlet />
          </Container>
          {shouldHideFooter && <MainFooter />}
        </Box>
      </div>
    </div>
  );
}
