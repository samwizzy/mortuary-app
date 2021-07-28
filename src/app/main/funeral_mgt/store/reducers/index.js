import { combineReducers } from 'redux';
import plots from './plots.reducer';
import vaults from './vaults.reducer';
import vouchers from './vouchers.reducer';
import employees from './employees.reducer';

const reducer = combineReducers({
  plots,
  vaults,
  vouchers,
  employees
});

export default reducer;
