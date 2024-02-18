/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { fetchColumns, fetchData } from './actions';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/SideBar';
import { getColumns } from './selectors';
import SelectionBar from './components/SelectionBar/SelectionBar';

function App() {
  const dispatch = useDispatch();
  const [dimensionSelected, setDimensionSelected] = useState('hello');
  const [measuresSelected, setMeasuresSelected] = useState<string[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const listItemName = result.draggableId;
    const listItemType = source.droppableId;
    if (!destination) return;
    const typeOFList = destination.droppableId;

    if (typeOFList === 'dimensionsList') {
      if (listItemType === 'measure') {
        return;
      }
      setDimensionSelected(listItemName);
    } else {
      if (listItemType === 'dimension') {
        return;
      }

      setMeasuresSelected((previous: string[]) =>
        previous.includes(listItemName) ? [...previous] : [...previous, listItemName],
      );
    }
  };

  const onClearDimensionHandler = () => {
    setDimensionSelected('');
  };

  const onClearMeasuresHandler = () => {
    setMeasuresSelected([]);
  };

  const onDeleteMeasureItem = (text: string) => {
    setMeasuresSelected(prevItems => prevItems.filter(item => item !== text));
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Sidebar columns={columns} />
          <div className='content'>
            <SelectionBar
              onClear={onClearDimensionHandler}
              label='Dimension'
              items={[dimensionSelected]}
              type='dimensionsList'
              onDeleteItem={onClearDimensionHandler}
            />
            <SelectionBar
              onClear={onClearMeasuresHandler}
              label='Measures'
              items={measuresSelected}
              type='measuresList'
              onDeleteItem={onDeleteMeasureItem}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
