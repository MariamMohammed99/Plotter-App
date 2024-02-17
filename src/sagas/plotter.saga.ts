import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_COLUMNS, FETCH_DATA } from '../actions/type';
import { DataPayload } from '../types/rootState';
import { fetchColumnsApi, fetchDataApi } from '../services';
import { baseUrl, columnsUrl, dataUrl } from '../constants/appConstants';
import { setColumns, setData } from '../actions';

function* fetchColumns(): unknown {
  try {
    const responseData: any = yield call(fetchColumnsApi, baseUrl + columnsUrl);
    yield put(setColumns(responseData.columns));
  } catch (error: any) {
    yield put(setColumns([]));
    yield put(setData([]));
  }
}

function* fetchData(dataPayload: { type: string; payload: DataPayload }): unknown {
  try {
    const responseData: any = yield call(fetchDataApi, {
      url: baseUrl + dataUrl,
      dataPayload: dataPayload.payload,
    });
    yield put(setData(responseData.data));
  } catch (error: any) {
    yield put(setData([]));
  }
}

export function* watchFetchColumns() {
  yield takeLatest(FETCH_COLUMNS, fetchColumns);
}

export function* watchFetchData() {
  yield takeLatest(FETCH_DATA, fetchData);
}
