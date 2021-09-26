import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { getAll, fetchPublished } from '../../../redux/postsRedux';
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
  postBox: {
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

const Component = ({className, posts, userStatus}) => {
  const classes = useStyles();
  // const [login, setLogin] = useState(false);

  

  return (
    <div className={clsx(className, styles.root)}>
      {!userStatus ? '' :
        <Button variant="contained" color="primary" className={classes.addButton} href="/posts/add/">
          Add new post
        </Button>
      }
      <div className={classes.root}>
        <Grid container>
          {posts.map((post) =>(
            <Grid container item xs={12} md={4} key={post.id} className={classes.postBox}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.info} color="textSecondary" gutterBottom>
                    {post.status} / {post.created}
                  </Typography>
                  <Typography variant="h5" component="h2" className={classes.title}>
                    {post.title}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {post.author}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {post.text}
                  </Typography>
                  {/* <CardMedia 
                    className={classes.media}
                    image={post.img}
                    title={post.title} /> */}
                  <Button href={`/posts/${post._id}`} variant="contained" color="primary" className={classes.btn}>See post</Button>
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
  fetchPublishedPosts: PropTypes.node,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.node,
      title: PropTypes.node,
      text: PropTypes.node,
      author: PropTypes.node,
      created: PropTypes.node,
      updated: PropTypes.node,
      status: PropTypes.node,
      photo: PropTypes.node,
      price: PropTypes.node,
      phone: PropTypes.node,
      location: PropTypes.node,
      __v: PropTypes.node,
    })
  ),
};


const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
