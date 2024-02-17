import { PayloadAction } from '@reduxjs/toolkit';
import initialState from './initialState';
import RootState from '../types/rootState';
import { SET_COLUMNS, SET_DATA } from '../actions/type';

// eslint-disable-next-line @typescript-eslint/default-param-last
const appReducer = (state: RootState = initialState, action: PayloadAction<any>): RootState => {
  switch (action.type) {
    case SET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
      };

    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
