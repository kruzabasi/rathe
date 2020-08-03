import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  rights: {},
  footerGrid: {
    width: "100%",
    height: "90%",
    paddingLeft: "5em",
    paddingRight: "5em"
  },
  footerGridCol: {
    backgroundColor: "#7c3a5f"
  },

  appBar: {
    marginTop: "10em",
    height: "15em",
    top: "auto",
    bottom: 0
  }
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/kruzabasi">
        Rathe by Kruzabasi.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar
      style={{ width: "104%" }}
      position="static"
      color="primary"
      className={classes.appBar}
    >
      <Grid className={classes.footerGrid} container spacing={4}>
        <Grid className={classes.footerGridCol} item xs={12} sm={4}>
          <Link style={{ color: "white" }} href="/about">
            About Us
          </Link>
          <br></br>
          <br></br>
          <Link style={{ color: "white" }} href="/contact">
            Contact Us
          </Link>
          <br></br>
        </Grid>
        <Grid className={classes.footerGridCol} item xs={12} sm={4}>
          {" "}
          hello <br></br>
          hello <br></br>
        </Grid>
        <Grid className={classes.footerGridCol} item xs={12} sm={4}>
          {" "}
          hello <br></br>
          hello <br></br>
        </Grid>
      </Grid>
      <br></br>
      <Box className={classes.rights}>
        <Copyright style={{ paddingBottom: "3em" }} />
      </Box>
    </AppBar>
  );
}
