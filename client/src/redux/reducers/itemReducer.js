import {
  GET_ITEMS,
  GET_FILTERED_ITEMS,
  GET_ITEM_BY_ID,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from '../actions/constants';

const initialState = {
  items: [],
  item: {},
  loading: false,
};

export default function (state = initialState, action) {
  // When object comes in from itemActions, test the type
  switch (action.type) {
    case GET_ITEMS:
      return {
        // Return items state
        ...state,
        items: action.payload,
        loading: false,
      };

    case GET_FILTERED_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case GET_ITEM_BY_ID:
      return {
        ...state,
        // Load single object into item field
        item: action.payload,
        loading: false,
      };

    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              ...action.payload,
            };
          } else {
            return item;
          }
        }),
      };

    case DELETE_ITEM:
      return {
        // Return items state
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case ITEMS_LOADING:
      return {
        // Return items state
        ...state,
        loading: true,
      };

    default:
      // Return initialState from current items
      return state;
  }
}
