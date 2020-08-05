// Making requests to back-end
import axios from 'axios';
import { GET_IMAGES, ADD_IMAGE, IMAGES_LOADING } from './constants';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const addImage = (image) => (dispatch, getState) => {
  axios
    .post('/api/images', image, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_IMAGE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Go to imageReducer and check type
export const getImages = () => (dispatch) => {
  dispatch(setImagesLoading());
  axios // Proxy giving ability to shorten endpoint
    .get('/api/images')
    .then((res) =>
      dispatch({
        type: GET_IMAGES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setImagesLoading = () => {
  return {
    // Set from false to true
    type: IMAGES_LOADING,
  };
};
