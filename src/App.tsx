/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, fetchData } from './actions';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/SideBar';
import { getColumns } from './selectors';

function App() {
  const dispatch = useDispatch();

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
      <Header />
      <div className='content'>
        <Sidebar columns={columns} />
        <div className='ayklam'>Hellooo</div>
      </div>
    </div>
  );
}

export default App;
