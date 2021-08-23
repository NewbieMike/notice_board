import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getAll, getOne } from '../../../redux/postsRedux';
import {getStatus} from '../../../redux/userRedux';
import { NotFound } from '../NotFound/NotFound.js';
import styles from './PostEdit.module.scss';


class Component extends React.Component {

  render(){
    const { className, announcment, userStatus } = this.props;
    console.log(announcment);
    return (
      <div className={clsx(className, styles.root)}>
        {userStatus === true ? 
          (
            <Grid container >
              <Grid item xs={12}>
                <h1>Edit announcment!</h1>
              </Grid>
              <form className={clsx(className, styles.root)} noValidate autoComplete="off">
                <Grid item xs={12}>
                  <TextField className={styles.input} id="standard-basic" label="Title"  defaultValue={announcment.title}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Location"  defaultValue={announcment.location}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Email"  defaultValue={announcment.email}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Phone"  defaultValue={announcment.phone}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Content"  defaultValue={announcment.content}/>
                </Grid>
                <Button variant='contained' type='submit' color='primary'>
                      Save changes
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
  params: PropTypes.object,
  userStatus: PropTypes.node,
  announcment: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      title: PropTypes.string,
      content: PropTypes.string,
      addDate: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      location: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  postsAll: getAll(state),
  announcment: getOne(state, props.match.params.id),
  userStatus: getStatus(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
