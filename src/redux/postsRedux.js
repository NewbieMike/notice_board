/* eslint-disable linebreak-style */

import Axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getPost = ({ posts }) => posts.onePost;


export const getLoading = ({ posts }) => posts.loading;

/* action name creator */
const reducerName = 'posts';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');
const FETCH_ONE_POST = createActionName('FETCH_ONE_POST');
const FETCH_ADD_POST = createActionName('FETCH_ADD_POST');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });
export const addPost = (payload) => ({ payload, type: ADD_POST });
export const editPost = (payload) => ({ payload, type: EDIT_POST });
export const fetchOnePost = (payload) => ({ payload, type: FETCH_ONE_POST });
export const fetchAddPost = (payload) => ({ payload, type: FETCH_ADD_POST });

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const { posts } = getState();
    console.log('posts:', posts);
    Axios
      .get('http://localhost:8000/api/posts')
      .then((res) => {
        dispatch(fetchSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchPost = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then((res) => {
        dispatch(fetchOnePost(res.data));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};
export const fetchAdd = (post) => {
  console.log('Added post:', post);

  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios.post('http://localhost:8000/api/posts/add', post, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        dispatch(addPost(post));
      })
      .catch((err) => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        onePost: action.payload,
      };
    }
    case FETCH_ADD_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: [...statePart.data, action.payload],
      };
    }
    default:
      return statePart;
  }
};