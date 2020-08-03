import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import EventCard from "./EventCard";
import Axios from "axios";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {
      eventList: []
    };
  }

  componentDidMount() {
    Axios.get("http://localhost:5000/events/").then(res => {
      this.setState({ eventList: res.data });
    });
  }

  render() {
    const getEventCard = eventObj => {
      return (
        <Grid key={eventObj._id} item xs={12} sm={4}>
          <EventCard {...eventObj} />
        </Grid>
      );
    };

    return (
      <Grid
        container
        spacing={2}
        style={{
          height: "100%",
          paddingTop: "2em"
        }}
      >
        {this.state.eventList.map(eventObj => getEventCard(eventObj))}
      </Grid>
    );
  }
}
