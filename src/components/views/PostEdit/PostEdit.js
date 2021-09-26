import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getAll, getPost } from '../../../redux/postsRedux';
import {getStatus} from '../../../redux/userRedux';
import { NotFound } from '../NotFound/NotFound.js';
import styles from './PostEdit.module.scss';


class Component extends React.Component {

  render(){
    const { className, post, userStatus } = this.props;
    console.log(post);
    return (
      <div className={clsx(className, styles.root)}>
        {userStatus === true ? 
          (
            <Grid container >
              <Grid item xs={12}>
                <h1>Edit post!</h1>
              </Grid>
              <form className={clsx(className, styles.root)} noValidate autoComplete="off">
                <Grid item xs={12}>
                  <TextField className={styles.input} id="standard-basic" label="Title"  defaultValue={post.title}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Location"  defaultValue={post.location}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Email"  defaultValue={post.email}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Phone"  defaultValue={post.phone}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField id="standard-basic" label="Content"  defaultValue={post.content}/>
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
  post: PropTypes.arrayOf(
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
  post: getPost(state, props.match.params.id),
  userStatus: getStatus(state),
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
