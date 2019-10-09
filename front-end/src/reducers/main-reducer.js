import {combineReducers} from 'redux';

import pets from './pet-reducer';

export default combineReducers({
  pets,
});