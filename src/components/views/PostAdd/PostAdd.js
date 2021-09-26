import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStatus } from '../../../redux/userRedux.js';
import { fetchAdd } from '../../../redux/postsRedux';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

import styles from './PostAdd.module.scss';
import { NotFound } from '../NotFound/NotFound';



class Component extends React.Component {
  state = {
    post: {
      title: '',
      author: '',
      created: '',
      updated: '',
      status: '',
      text: '',
      photo: '',
      price: '',
      phone: '',
      location: '',
    },
    className: '',
  };
  handleChange = ({target}) => {
    const { post } = this.state;
    const { name, value } = target;
    // console.log([name], value);
    this.setState({
      post: { ...post, [name]: value },
    });
  };
  submitForm = (event) => {
    event.preventDefault();
    const { post } = this.state;
    const { addPost } = this.props;
    const postDate = new Date().toISOString();

    this.setState({ post: { ...post,  created: postDate } });
    addPost(this.state.post);
    alert ('post added!');
  };

  render() {
    const { handleChange, submitForm } = this;
    const { className, userStatus } = this.props;
    return (
      <div className={clsx(className, styles.root)}> 
        {userStatus === true ? 
          (
            <Grid container >
              <Grid item xs={12}>
                <h1>Add new post!</h1>
              </Grid>
              <form className={clsx(className, styles.root)} noValidate autoComplete="off" onSubmit={submitForm}>
                <Grid item xs={12}>
                  <TextField name='title' id="standard-basic" label="Title" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField name='location' id="standard-basic" label="Location" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField name='author' id="standard-basic" label="Email" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField name='phone' id="standard-basic" label="Phone" onChange={handleChange}/>
                </Grid>
                <Grid item xs={12}>
                  <TextField name='text' id="standard-basic" label="Content" onChange={handleChange}/>
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
  addPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  userStatus: getStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(fetchAdd(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
