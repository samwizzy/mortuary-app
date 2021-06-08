import * as Actions from '../actions';

const initialState = {
  loading: false,
  invoices: [],
  message: null,
};

const invoicesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_INVOICES: {
      return {
        ...state,
        invoices: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default invoicesReducer;
