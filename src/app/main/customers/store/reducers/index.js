import { combineReducers } from 'redux';
import customer from './customer.reducer';
import services from './services.reducer';
import discounts from './discounts.reducer';
import relatives from './relatives.reducer';

const reducer = combineReducers({
  customer,
  services,
  discounts,
  relatives,
});

export default reducer;
