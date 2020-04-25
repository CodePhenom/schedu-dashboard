import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  infoCards: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  infoCard: {
    marginRight: 5,
  },
});

const Home = (props) => {
  const classes = useStyle();

  return <div className={classes.infoCards}>Admin Home</div>;
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
