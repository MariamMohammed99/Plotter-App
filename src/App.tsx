import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchColumns, fetchData } from './actions';
import Header from './components/Header/Header';

function App() {
  const dispatch = useDispatch();
  dispatch(fetchColumns());
  dispatch(
    fetchData({
      measures: ['Cost'],
      dimension: 'Product',
    }),
  );
  return (
    <div className='App'>
      <Header />
    </div>
  );
}

export default App;
