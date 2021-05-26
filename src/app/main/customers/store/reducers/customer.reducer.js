import * as Actions from '../actions';

const initialState = {
  loading: false,
  customers: [],
  customer: null,
  message: null,
};

const customerReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CUSTOMERS: {
      return {
        ...state,
        customers: action.payload,
      };
    }
    case Actions.GET_CUSTOMER_BY_ID: {
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };
    }
    case Actions.CREATE_CUSTOMER: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    case Actions.UPDATE_CUSTOMER: {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default customerReducer;
