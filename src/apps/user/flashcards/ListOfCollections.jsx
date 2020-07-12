import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
  },
  title: {
    fontSize: 14,
  },
});

const ListOfCollections = (props) => {
  const { collections } = props;
  const classes = useStyles();

  if (collections.length === 0) return null;

  return collections.map((collection) => (
    <div key={collection.id}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            {collection.name}
          </Typography>
        </CardContent>
      </Card>
    </div>
  ));
};

export default ListOfCollections;
