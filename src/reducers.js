import { combineReducers } from "redux";
import loggedReducer from './logged-reducer';

const allReducers = combineReducers({
    isLogged : loggedReducer
})

export default allReducers;