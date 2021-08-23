import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import clsx from 'clsx';
import { getAll, getOne } from '../../../redux/postsRedux';
import { connect } from 'react-redux';

import styles from './Post.module.scss';
import { Button } from '@material-ui/core';


const Component = ({className, announcment}) => {
  
  return (
    <div className={clsx(className, styles.root)}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={styles.title}>{announcment.title}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={styles.content}>{announcment.content}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={styles.paper}>{announcment.name}</Paper>
          <Paper className={styles.paper}>{announcment.addDate}</Paper>
          <Paper className={styles.paper}><LocationOnIcon /> {announcment.location}</Paper>
          <Button className={styles.btn} variant="contained" color="primary" href='/'><EmailIcon /> {announcment.email}</Button>
          {/* eslint-disable-next-line no-template-curly-in-string */}
          <Button className={styles.btn} variant="contained" color="primary" href={`tel:${announcment.phone}`}><PhoneIcon /> {announcment.phone}</Button>
        </Grid>
      </Grid>
    </div>
  );
};

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
});

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Post,
  Container as Post,
  Component as PostComponent,
};
