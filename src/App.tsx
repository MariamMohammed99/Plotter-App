import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { fetchColumns, fetchData } from './actions';

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
      <header className='App-header'>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
