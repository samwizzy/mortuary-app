import { combineReducers } from 'redux';
import invoices from './invoices.reducer';
import user from './user.reducer';

const reducer = combineReducers({
  invoices,
  user,
});

export default reducer;
