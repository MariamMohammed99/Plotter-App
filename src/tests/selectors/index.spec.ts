import { getData, getColumns } from '../../selectors';

describe('App Selectors', () => {
  const mockState = {
    columns: [
      {
        name: 'Product',
        function: 'dimension',
      },
    ],
    data: [
      {
        name: 'Product',
        values: ['Diskette', 'Memory Card'],
      },
      {
        name: 'Cost',
        values: ['333.08', '7.07'],
      },
    ],
  };
  it('should handle getData function', () => {
    const returnedState = getData(mockState);
    expect(returnedState).toBe(mockState.data);
  });

  it('should handle getColumns function', () => {
    const returnedState = getColumns(mockState);
    expect(returnedState).toBe(mockState.columns);
  });
});
