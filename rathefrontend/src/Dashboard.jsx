import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
//import Avatar from "@material-ui/core/Avatar";
//import EventCard from "./EventCard";
import Axios from "axios";
//import CssBaseline from "@material-ui/core/CssBaseline";
//import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: localStorage.getItem("_id"),
      userName: "",
      eventsByMe: [],
      eventName: "",
      organizer: "",
      eventDate: "",
      eventTime: "",
      location: "",
      venue: "",
      description: ""
    };
  }
  classes = () => {
    useStyles();
  };
  handleEventName = e => {
    this.setState({ eventName: e.target.value });
  };
  handleOrganizer = e => {
    this.setState({ organizer: e.target.value });
  };
  handleEventDate = e => {
    this.setState({ eventDate: e.target.value });
  };
  handleEventTime = e => {
    this.setState({ eventTime: e.target.value });
  };
  handleLocation = e => {
    this.setState({ location: e.target.value });
  };
  handleVenue = e => {
    this.setState({ venue: e.target.value });
  };
  handleDescription = e => {
    this.setState({ description: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const newEvent = {
      eventName: this.state.eventName,
      organizer: this.state.organizer,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime,
      location: this.state.location,
      venue: this.state.venue,
      description: this.state.description
    };
    Axios.post("http://localhost:5000/organizer/addevent", newEvent, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
      }
    }).catch(err => console.log(err));
    alert("event added successfully");
  };

  componentDidMount() {
    Axios.get(`http://localhost:5000/organizer/${this.state.userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
      }
    }).then(response => {
      this.setState({
        userName: response.data.organizer.userName,
        organizer: response.data.organizer.fullName
      });
    });
  }

  render() {
    return (
      <Grid style={{ color: "grey" }} container spacing={10} height="100%">
        <Grid
          item
          height="20%"
          style={{ backgroundColor: "black", color: "white" }}
          xs={12}
        >
          <Typography>Hello, {this.state.userName}</Typography>
        </Grid>
        <Grid item height="40%" style={{ backgroundColor: "grey" }} xs={12}>
          <Container component="main" maxWidth="xs">
            <div className={this.classes.paper}>
              <Typography> Create New Event</Typography>
              <form
                className={this.classes.form}
                noValidate
                onSubmit={this.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="eventName"
                      name="eventName"
                      value={this.state.eventName}
                      onChange={this.handleEventName}
                      variant="outlined"
                      required
                      fullWidth
                      id="eventName"
                      label="Event Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="organizer"
                      name="organizer"
                      value={this.state.organizer}
                      onChange={this.handleOrganizer}
                      variant="outlined"
                      required
                      fullWidth
                      id="organizer"
                      label="Event Organizer"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="eventDate"
                      name="eventDate"
                      value={this.state.eventDate}
                      onChange={this.handleEventDate}
                      variant="outlined"
                      required
                      fullWidth
                      id="eventDate"
                      label="Event Date"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="eventTime"
                      name="eventTime"
                      value={this.state.eventTime}
                      onChange={this.handleEventTime}
                      variant="outlined"
                      required
                      fullWidth
                      id="eventTime"
                      label="Event Time"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="location"
                      name="location"
                      variant="outlined"
                      value={this.state.location}
                      onChange={this.handleLocation}
                      required
                      fullWidth
                      id="location"
                      label="Event Location"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="venue"
                      name="venue"
                      variant="outlined"
                      value={this.state.venue}
                      onChange={this.handleVenue}
                      required
                      fullWidth
                      id="venue"
                      label="Event Venue"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      value={this.state.description}
                      onChange={this.handleDescription}
                      required
                      fullWidth
                      id="description"
                      label="Event Description"
                      autoFocus
                    />
                  </Grid>
                </Grid>
                <br></br>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={this.classes.submit}
                >
                  Create Event
                </Button>
              </form>
            </div>
          </Container>
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
