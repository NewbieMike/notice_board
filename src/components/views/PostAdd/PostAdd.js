import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatus } from '../../../redux/userRedux.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import styles from './PostAdd.module.scss';
import { NotFound } from '../NotFound/NotFound';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

class Component extends React.Component {
  state = {
    announcment: {
      id: '',
      name: '',
      title: '',
      content: '',
      addDate: '',
      email: '',
      phone: '',
      location: '',
      img: '',
    },
    className: '',
  };
  handleChange = (event) => {
    const { announcment } = this.state;

    this.setState({
      announcment: { ...announcment, [event.target.name]: event.target.value },
    });
  };
  submitForm = (event) => {
    const {announcment} = this.state;
    event.preventDefault();

    const announcmentDate = new Date().toISOString();
    console.log(announcmentDate);

    this.setState({
      announcment: {
        id: '',
        name: '',
        title: '',
        content: '',
        addDate: '',
        email: '',
        phone: '',
        location: '',
        img: '',
      },
    });
    alert ('Announcment added!');
  };

  render() {

    const { className, userStatus } = this.props;
    const { announcments } = this.state;
    return (
      <div className={clsx(className, styles.root)}> 
        {userStatus === true ? 
          (
            <Grid container >
              <Grid item xs={12}>
                <h1>Add new announcment!</h1>
              </Grid>
              <form className={clsx(className, styles.root)} noValidate autoComplete="off">
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Title" onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Location" onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Email" onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Phone" onChange={this.handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Content" onChange={this.handleChange}/>
                </Grid>
                <Button variant='contained' type='submit' color='primary'>
                      Submit Ammouncment
                </Button>
              </form>
            </Grid>
          ) 
          : 
          (
            <NotFound />
          )
        }
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.node,
};

const mapStateToProps = (state, props) => ({
  userStatus: getStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
