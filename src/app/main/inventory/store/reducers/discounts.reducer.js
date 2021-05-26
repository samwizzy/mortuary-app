import * as Actions from '../actions';

const initialState = {
  loading: false,
  discounts: [],
  discount: null,
  message: null,
  discountDialog: {
    open: false,
    type: "edit", // new
    data: null
  }
};

const discountsReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_DISCOUNTS: {
      return {
        ...state,
        discounts: action.payload,
      };
    }
    case Actions.GET_DISCOUNT_BY_ID: {
      return {
        ...state,
        loading: false,
        discount: action.payload,
      };
    }
    case Actions.CREATE_DISCOUNT: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_DISCOUNT: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.DELETE_ITEM: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.OPEN_DISCOUNT_DIALOG: {
      return {
        ...state,
        discountDialog: {
          ...state.discountDialog,
          open: true,
          data: action.payload
        }
      };
    }
    case Actions.CLOSE_DISCOUNT_DIALOG: {
      return {
        ...state,
        discountDialog: {
          ...state.discountDialog,
          open: false,
          data: null
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default discountsReducer;
