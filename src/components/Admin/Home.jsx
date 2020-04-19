import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchUsersCount,
  fetchAdminsCount,
} from '../../store/actions/admin-actions';
import InfoCard from './Components/InfoCard';
import PeopleIcon from '@material-ui/icons/People';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
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

  useEffect(() => {
    props.fetchUsersCount();
    props.fetchAdminsCount();
  }, []);

  return (
    <div className={classes.infoCards}>
      <InfoCard
        className={classes.infoCard}
        icon={<PeopleIcon />}
        title='User Count'
        count={props.admin.usersCount}
      />
      <InfoCard
        className={classes.infoCard}
        icon={<SupervisedUserCircleIcon />}
        title='Admin Count'
        count={props.admin.adminsCount}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsersCount: () => dispatch(fetchUsersCount()),
    fetchAdminsCount: () => dispatch(fetchAdminsCount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
