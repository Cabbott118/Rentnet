import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  EDIT_USER,
} from '../actions/constants';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({ first_name, last_name, email, password }) => (
  dispatch
) => {
  // Headers (REMEMBER POSTMAN?)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body (User Register Info)
  const body = JSON.stringify({ first_name, last_name, email, password });

  // Pass in User Info which was stored into body and config
  axios
    .post('/api/users', body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  // Headers (REMEMBER POSTMAN?)
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body (User Login Info)
  const body = JSON.stringify({ email, password });

  // Pass in User Info which was stored into body and config
  axios
    .post('/api/auth', body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// Edit User (Become Host)
export const editUser = (user) => (dispatch, getState) => {
  axios
    // Attaching token to request in header
    .put(`/api/auth/${user.id}`, user, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Edit User (Password Edit)
export const editUserDetails = (user) => (dispatch, getState) => {
  axios
    // Attaching token to request in header
    .put(`/api/auth/edit/${user.id}`, user, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_USER,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
