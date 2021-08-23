import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardActionArea } from '@material-ui/core';
import { CardMedia } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getStatus } from '../../../redux/userRedux.js';
import styles from './Homepage.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  announcmentBox: {
    padding: theme.spacing(1),
  },
  media: {
    height: '300px',
    paddingTop: '56.25%', // 16:9
  },
  addButton: {
    display: 'flex',
    margin: '25px 5px',
    fontSize: '18px',
    backgroundColor: 'green',
  },
  btn: {
    display: 'flex',
    margin: '5px 0px',
  },
}));

const Component = ({className, announcments, userStatus}) => {
  const classes = useStyles();
  // const [login, setLogin] = useState(false);
  return (
    <div className={clsx(className, styles.root)}>
      {!userStatus ? '' :
        <Button variant="contained" color="primary" className={classes.addButton} href="/post/add/">
          Add new announcment
        </Button>
      }
      <div className={classes.root}>
        <Grid container>
          {announcments.map((announcment) =>(
            <Grid container item xs={12} md={4} key={announcment.id} className={classes.announcmentBox}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.info} color="textSecondary" gutterBottom>
                    {announcment.name} / {announcment.addDate}
                  </Typography>
                  <Typography variant="h5" component="h2" className={classes.title}>
                    {announcment.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {announcment.email}, {announcment.phone}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {announcment.content}
                  </Typography>
                  <CardMedia 
                    className={classes.media}
                    image={announcment.img}
                    title={announcment.title} />
                  <Button href={`/post/${announcment.id}`} variant="contained" color="primary" className={classes.btn}>See Announcment</Button>
                </CardContent>
                
              </Card>
            </Grid>
          ) )
          }
        </Grid>
      </div>
    </div>
  );
  
};

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.node,
  announcments: PropTypes.arrayOf(
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
};


const mapStateToProps = state => ({
  announcments: getAll(state),
  userStatus: getStatus(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
