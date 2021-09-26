import React from 'react';
import PropTypes from 'prop-types';
import { Homepage } from './Homepage';
import { getAll, fetchPublished } from '../../../redux/postsRedux';
import { getStatus } from '../../../redux/userRedux.js';
import { connect } from 'react-redux';

class Component extends React.Component {
  componentDidMount(){
    const { fetchPublishedPosts } = this.props;
    console.log(this.props);
    fetchPublishedPosts();
  }
  
  render() {
    
    return(
      <Homepage {...this.props}/>
    );
  }

}

Component.propTypes = {
  fetchPublishedPosts: PropTypes.node,
};

const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getStatus(state),
});
  
const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});
  
const HomepageWrapper = connect(mapStateToProps, mapDispatchToProps)(Component);

export default HomepageWrapper;