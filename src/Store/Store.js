import {createStore, combineReducers} from 'redux';
import userReducer from './Reducers/userReducer';


const rootReducers = combineReducers({
    userReducer,
});
const store = createStore(rootReducers);

export default store;
