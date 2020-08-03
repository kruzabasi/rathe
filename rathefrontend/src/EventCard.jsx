import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import eventThumbnail from "./static/IMG_DEFAULT.PNG";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    alignSelf: "center"
  }
});

const EventCard = props => {
  const classes = useStyles();
  const { eventName, description, eventDate, location } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="event image"
          height="80%"
          defaultValue={eventThumbnail}
          image={eventThumbnail}
          title="Event image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {eventName}
          </Typography>
          <Typography
            style={{ color: "blue" }}
            gutterBottom
            variant="h6"
            component="p"
          >
            {eventDate}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {location}
        </Button>
        <Button href="" size="small" color="secondary">
          More Info...
        </Button>
      </CardActions>
    </Card>
  );
};
export default EventCard;
