import { combineReducers, createStore } from "redux";
import { AuthReducer } from "./AuthState";

const reducers = combineReducers({ AuthState: AuthReducer });
const store = createStore(reducers);

export default store;
