import { ADD_IMAGE, GET_IMAGES, IMAGES_LOADING } from '../actions/constants';

const initialState = {
  images: [],
  loading: false,
};

export default function (state = initialState, action) {
  // When object comes in from itemActions, test the type
  switch (action.type) {
    case GET_IMAGES:
      return {
        // Return images state
        ...state,
        images: action.payload,
        loading: false,
      };

    case ADD_IMAGE:
      return {
        ...state,
        images: [action.payload, ...state.images],
      };

    case IMAGES_LOADING:
      return {
        // Return images state
        ...state,
        loading: true,
      };

    default:
      // Return initialState from current items
      return state;
  }
}
