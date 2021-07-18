import {combineReducers} from 'redux';
import branches from './branches.reducer';

const ezoneReducers = combineReducers({
    branches,
});

export default ezoneReducers;
