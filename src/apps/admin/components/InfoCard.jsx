import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {props.icon}
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {props.title}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          {props.count}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SimpleCard;
