import { Column, DataPayload } from '../types/rootState';
import { FETCH_COLUMNS, FETCH_DATA, SET_COLUMNS, SET_DATA } from './type';

export const fetchColumns = () => ({ type: FETCH_COLUMNS });
export const setColumns = (columns: Column[]) => ({ type: SET_COLUMNS, payload: columns });

export const fetchData = (dataPayload: DataPayload) => ({ type: FETCH_DATA, payload: dataPayload });
export const setData = (data: any) => ({ type: SET_DATA, payload: data });
