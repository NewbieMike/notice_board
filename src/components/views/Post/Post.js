import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import clsx from 'clsx';
import { fetchPost, getPost } from '../../../redux/postsRedux';
import { connect } from 'react-redux';

import styles from './Post.module.scss';
import { Button } from '@material-ui/core';

class Component extends React.Component {
  componentDidMount() {
    const { fetchOnePost } = this.props;
    console.log('post',this.props);
    fetchOnePost();
  }

  render() {
    // jeżeli dane nie są załadowane zwróć pusty string jeżeli się załadują zwróć elementy
    const { className, post } = this.props;
    console.log('post:', this.props);
    if (!post) {
      return('');
    } else {
      return (
        <div className={clsx(className, styles.root)}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={styles.title}>{post.title}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={styles.content}>{post.text}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={styles.paper}>{post.author}</Paper>
              <Paper className={styles.paper}>{post.created}</Paper>
              <Paper className={styles.paper}><LocationOnIcon /> {post.location}</Paper>
              <Button className={styles.btn} variant="contained" color="primary" href='/'><EmailIcon /> {post.author}</Button>
              {/* eslint-disable-next-line no-template-curly-in-string */}
              {/* <Button className={styles.btn} variant="contained" color="primary" href={`tel:${post.phone}`}><PhoneIcon /> {post.phone}</Button> */}
            </Grid>
            <Grid item xs={12}>
              {/* {!userStatus ? 
            <Button variant="contained" color="primary" href={`/post/${post._id}/edit`}>Edit post</Button> 
            : 
            ''
          } */}
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

Component.propTypes = {
  params: PropTypes.node,
  post: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.string,
  fetchOnePost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  post: getPost(state),
});
const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchPost(props.match.params.id)),
});
const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export default Container;