/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, fetchData } from './actions';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/SideBar';
import { getColumns } from './selectors';
import SelectionBar from './components/SelectionBar/SelectionBar';

function App() {
  const dispatch = useDispatch();
  const [dimensionSelected, setDimensionSelected] = useState('hello');
  const [measuresSelected, setMeasuresSelected] = useState([
    'ayklam',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
    'habal',
  ]);

  const onClearDimensionHandler = () => {
    setDimensionSelected('');
  };

  const onClearMeasuresHandler = () => {
    setMeasuresSelected([]);
  };

  useEffect(() => {
    dispatch(fetchColumns());
    dispatch(
      fetchData({
        measures: ['Cost'],
        dimension: 'Product',
      }),
    );
  }, []);

  const columns = useSelector(getColumns);

  return (
    <div className='App'>
      <Header title='Plotter' />
      <div className='screen'>
        <Sidebar columns={columns} />
        <div className='content'>
          <SelectionBar
            onClear={onClearDimensionHandler}
            label='Dimension'
            items={[dimensionSelected]}
            type='dimension'
          />
          <SelectionBar
            onClear={onClearMeasuresHandler}
            label='Measures'
            items={measuresSelected}
            type='measure'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
