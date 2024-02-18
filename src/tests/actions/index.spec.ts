import { fetchColumns, setColumns, fetchData, setData } from '../../actions';
import { FETCH_DATA, FETCH_COLUMNS, SET_DATA, SET_COLUMNS } from '../../actions/type';

describe('App Actions', () => {
  it('should create an action to fetch columns', () => {
    const expectedAction = {
      type: FETCH_COLUMNS,
    };
    expect(fetchColumns()).toEqual(expectedAction);
  });

  it('should create an action to fetch data', () => {
    const payload = {
      measures: ['Cost'],
      dimension: 'Year',
    };
    const expectedAction = {
      type: FETCH_DATA,
      payload,
    };
    expect(fetchData(payload)).toEqual(expectedAction);
  });

  it('should create an action to set columns', () => {
    const payload = [
      {
        name: 'Product',
        function: 'dimension',
      },
    ];
    const expectedAction = {
      type: SET_COLUMNS,
      payload,
    };
    expect(setColumns(payload)).toEqual(expectedAction);
  });

  it('should create an action to set data', () => {
    const payload = [
      {
        name: 'Product',
        values: ['Diskette', 'Memory Card'],
      },
      {
        name: 'Cost',
        values: ['333.08', '7.07'],
      },
    ];
    const expectedAction = {
      type: SET_DATA,
      payload,
    };
    expect(setData(payload)).toEqual(expectedAction);
  });
});
