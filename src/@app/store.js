import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import history from './history';
import subMasterReducer from './subMaster/subMasterSlice'
import masterReducer from './master/masterSlice'
import authSlice from './master/authSlice';
import entryReducer from './entry/entrySlice';
import serviceSlice from './service/serviceSlice';


const rootReducer = combineReducers( {
  router: connectRouter( history ),
  subMaster: subMasterReducer,
  master: masterReducer,
  entry: entryReducer,
  auth: authSlice,
  service: serviceSlice
} );

export const store = configureStore( {
  reducer: rootReducer,
  middleware: [routerMiddleware( history ), thunk],
} );

export default store;

