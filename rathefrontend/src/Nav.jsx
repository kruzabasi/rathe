import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import logo from "../src/assets/img/rathelogo.jpg";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  toolBar: { justifyContent: "space-between" },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1
    }
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    justifyContent: "space-evenly"
  }
}));

const Header = props => {
  const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = pageURL => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = pageURL => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
      id: 1
    },
    {
      menuTitle: "Sing Up",
      pageURL: "/signup",
      id: 2
    },
    {
      menuTitle: "About",
      pageURL: "/about",
      id: 3
    },
    {
      menuTitle: "Contact",
      pageURL: "/contact",
      id: 4
    }
  ];

  return (
    <AppBar
      className={classes.root}
      style={{ height: "8em", width: "104%" }}
      position="static"
    >
      <Toolbar className={classes.toolBar}>
        <Button
          //variant="contained"
          onClick={() => handleButtonClick("/")}
        >
          <img src={logo} width="60" height="60" alt="rathe logo" />
        </Button>

        {isMobile ? (
          <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              {menuItems.map(menuItem => {
                const { menuTitle, pageURL } = menuItem;
                return (
                  <MenuItem
                    key={menuItem.id}
                    onClick={() => handleMenuClick(pageURL)}
                  >
                    {menuTitle}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        ) : (
          <div className={classes.headerOptions}>
            <Button
              //variant="contained"
              onClick={() => handleButtonClick("/contact")}
            >
              CONTACT
            </Button>
            <Button
              //variant="contained"
              onClick={() => handleButtonClick("/about")}
            >
              ABOUT
            </Button>
            <Button
              //variant="contained"
              onClick={() => handleButtonClick("/signup")}
            >
              Sign Up
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
