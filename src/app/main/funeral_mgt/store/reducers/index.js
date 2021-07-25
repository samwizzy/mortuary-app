import { combineReducers } from 'redux';
import plots from './plots.reducer';
import vaults from './vaults.reducer';
import vouchers from './vouchers.reducer';
import branches from './branches.reducer';
import employees from './employees.reducer';

const reducer = combineReducers({
  plots,
  vaults,
  vouchers,
  branches,
  employees
});

export default reducer;
