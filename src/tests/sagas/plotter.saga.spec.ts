import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { takeLatest } from 'redux-saga/effects';
import {
  fetchColumns,
  fetchData,
  watchFetchColumns,
  watchFetchData,
} from '../../sagas/plotter.saga';
import { setColumns, setData } from '../../actions';
import { FETCH_COLUMNS, FETCH_DATA } from '../../actions/type';
import { fetchColumnsApi, fetchDataApi } from '../../services';
import { baseUrl, columnsUrl } from '../../constants/appConstants';

afterEach(() => {
  jest.clearAllMocks();
});
describe('Sagas test', () => {
  it('should fetch columns successfuly', () => {
    const mockResponse = {
      columns: [
        { name: 'Product', function: 'dimension' },
        { name: 'Year', function: 'dimension' },
        { name: 'Country', function: 'dimension' },
        { name: 'Cost', function: 'measure' },
        { name: 'Revenue', function: 'measure' },
        { name: 'Units sold', function: 'measure' },
      ],
    };
    return expectSaga(fetchColumns as any)
      .provide([[matchers.call(fetchColumnsApi, `${baseUrl}${columnsUrl}`), mockResponse]])
      .put(setColumns(mockResponse.columns))
      .run();
  });

  it('should fail in fetching columns', () => {
    expectSaga(fetchColumns as any)
      .call(fetchColumnsApi, `${baseUrl + columnsUrl}mock`)
      .put(setColumns([]))
      .put(setData([]))
      .run();
  });

  it('should fail in fetching data', () => {
    expectSaga(fetchData as any)
      .call(fetchDataApi, `${baseUrl + columnsUrl}mock`)
      .put(setData([]))
      .run();
  });

  it('should watch for FETCH_COLUMNS action', () => {
    const generator = watchFetchColumns();
    expect(generator.next().value).toEqual(takeLatest(FETCH_COLUMNS, fetchColumns));
    expect(generator.next().done).toBe(true);
  });

  it('should watch for FETCH_DATA action', () => {
    const generator = watchFetchData();
    expect(generator.next().value).toEqual(takeLatest(FETCH_DATA, fetchData));
    expect(generator.next().done).toBe(true);
  });
});
