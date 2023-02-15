import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logos/logo.png"
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Avatar } from "@mui/material";
import storyImage from "frontend/assets/img/web3/story-1.png";
import { ThemeContext } from "frontend/contexts/ThemeContext";
import { useContext } from "react";
import { HOME_SIDE_MENU } from "frontend/redux/slices/newHome";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const navigate = useNavigate()

  const { toggle } = useContext(ThemeContext);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="mobile-menu"
        sx={{ background: toggle ? "#151c24" : "#fff" }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Link to="/lounge">
              <h1>
                <img
                  src={logo}
                  alt="logo"
                  id="logo_homepage"
                  style={{ maxHeight: "30px" }}
                />{" "}
              </h1>
            </Link>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: toggle ? "#fff" : "#6E747A" }}
              onClick={() => navigate(`/lounge/${HOME_SIDE_MENU.ADD_POST}`)}
            >
              <ControlPointOutlinedIcon />
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: toggle ? "#fff" : "#6E747A" }}
            >
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{ color: toggle ? "#fff" : "#6E747A" }}
              onClick={() => navigate(`/lounge/${HOME_SIDE_MENU.MESSAGES}`)}
            >
              <Badge color="error">
                <MailOutlinedIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: toggle ? "#fff" : "#6E747A" }}
            >
              <Avatar
                className="story-avatar avtar-mobile-dev"
                src={storyImage}
                sx={{
                  width: 92,
                  height: 92,
                  borderWidth: "3px",
                  borderStyle: "solid",
                  borderColor: toggle ? "#4AA081" : "#4AA081",
                }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
