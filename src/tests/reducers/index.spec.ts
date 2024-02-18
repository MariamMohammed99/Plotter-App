import { SET_COLUMNS, SET_DATA } from '../../actions/type';
import appReducer from '../../reducers';
import initialState from '../../reducers/initialState';

describe('App Reducers', () => {
  it('should handle SET_COLUMNS', () => {
    const payload = [
      {
        name: 'Product',
        function: 'dimension',
      },
    ];
    const result = appReducer(undefined, {
      type: SET_COLUMNS,
      payload,
    });
    expect(result).toEqual({
      ...initialState,
      columns: payload,
    });
  });

  it('should handle SET_DATA', () => {
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
    const result = appReducer(undefined, {
      type: SET_DATA,
      payload,
    });
    expect(result).toEqual({
      ...initialState,
      data: payload,
    });
  });

  it('send other payload', () => {
    const result = appReducer(undefined, {
      type: 'Other',
      payload: 'test',
    });
    expect(result).toEqual(initialState);
  });
});
