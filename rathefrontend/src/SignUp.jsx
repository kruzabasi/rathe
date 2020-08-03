import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  // const [newUser, setNewUser] = useState({})
  const [fullName, setFullName] = useState("");
  // const [firstNameError, setFirstNameError] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleFullName = e => {
    setFullName(e.target.value);
  };
  const handleUserName = e => {
    setUserName(e.target.value);
  };
  const handleAddress = e => {
    setAddress(e.target.value);
  };

  const validateEmail = e => {
    const error = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e
    )
      ? ""
      : "Enter a valid email address";
    setEmailError(error);
    return error;
  };
  const handleEmail = e => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const validateEmailError = validateEmail(email);
    if (validateEmailError === "") {
      const newEventOrganizer = {
        fullName,
        userName,
        address,
        email,
        password
      };
      const orgDetail = {
        email,
        password
      };
      const SignedUp = () => {
        return Axios.post(
          "http://localhost:5000/organizer/signup",
          newEventOrganizer
        ).then(res => {
          if (res.status === 200) {
            Axios.post("http://localhost:5000/organizer/signin", orgDetail)
              .then(res => {
                localStorage.setItem("sessionToken", res.data.accessToken);
                localStorage.setItem("_id", res.data._id);
              })
              .catch(err => res.json(err));

            setIsSignedUp(true);
            console.log(res.status);
          }
        });
      };
      SignedUp();
    }
  };

  if (isSignedUp) {
    return <Redirect to={{ pathname: "/dashboard" }} />;
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fullName"
                value={fullName}
                onChange={handleFullName}
                variant="outlined"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                value={userName}
                onChange={handleUserName}
                label="User Name"
                name="userName"
                autoComplete="uname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={email}
                onChange={handleEmail}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <span style={{ color: "#ef0048" }} className="error">
                {emailError}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={password}
                onChange={handlePassword}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                value={address}
                onChange={handleAddress}
                required
                fullWidth
                id="address"
                label="Contact Address"
                autoFocus
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
