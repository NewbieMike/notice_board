import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getStatus } from '../../../redux/userRedux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { Button } from '@material-ui/core';
import styles from './Header.module.scss';
import { makeStyles } from '@material-ui/core';
import AssignmentLateSharpIcon from '@material-ui/icons/AssignmentLateSharp';
import SpeakerNotesSharpIcon from '@material-ui/icons/SpeakerNotesSharp';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    textTransform: 'uppercase',
  },
}));

const Component = ({className, children, userStatus}) => {
  const classes = useStyles();
  // const [login, setLogin] = useState();
  // const handleChange = (event) => {
  //   setLogin(event.target.checked);
  // };
  return (
    <div className={clsx(className, styles.root)}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title} href='/'>
            notice board <SpeakerNotesSharpIcon />
          </Typography>
          {/* <FormControlLabel
            control={
              <Switch
                checked={userStatus}
                onChange={handleChange}
                aria-label='login switch'
              />
            }
            label={userStatus ? 'Logout' : 'Login'}
          /> */}
          {!userStatus ? '' : 
            <Button edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href='/'>
             My Announcements <AssignmentLateSharpIcon/>
            </Button>
          }

          {!userStatus ? 
            <Button color="inherit" href='https://google.com'>Login <MeetingRoomIcon /></Button> : <Button color="inherit" href='/'>Logout <MeetingRoomIcon /></Button>
          }
          
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
  
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.node,
};

const mapStateToProps = state => ({
  userStatus: getStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
