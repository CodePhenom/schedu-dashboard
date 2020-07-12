import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  card: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
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
        <CardContent className={classes.cardContent}>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            {collection.name}
          </Typography>
          <IconButton
            aria-label='delete'
            className={classes.margin}
            onClick={() => props.onDelete(collection.id)}
          >
            <DeleteIcon fontSize='small' color='primary' />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  ));
};

export default ListOfCollections;
