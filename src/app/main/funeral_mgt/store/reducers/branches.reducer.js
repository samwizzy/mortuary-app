import * as Actions from '../actions';

const initialState = {
  loading: false,
  branches: [],
  message: null,
};

const branchesReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BRANCHES: {
      return {
        ...state,
        branches: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default branchesReducer;
