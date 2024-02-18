/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { fetchColumns, fetchData, setData } from './actions';
import Header from './components/Header/Header';
import Sidebar from './components/SideBar/SideBar';
import { getColumns, getData } from './selectors';
import SelectionBar from './components/SelectionBar/SelectionBar';
import { DatasetType, ChartDataType } from './types/chartTypes';

function App() {
  const dispatch = useDispatch();
  const [dimensionSelected, setDimensionSelected] = useState('');
  const [measuresSelected, setMeasuresSelected] = useState<string[]>([]);
  const [chartData, setChartData] = useState({} as ChartDataType);
  const [chartOptions, setChartOptions] = useState({});

  const columns = useSelector(getColumns);
  const data = useSelector(getData);

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},${0.5})`;
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    const listItemName = result.draggableId;
    const listItemType = source.droppableId;
    if (!destination) return;
    const typeOFList = destination.droppableId;

    if (typeOFList === 'dimensionsList') {
      if (listItemType === 'measure' || listItemName === dimensionSelected) {
        return;
      }
      setDimensionSelected(listItemName);
    } else {
      if (listItemType === 'dimension' || measuresSelected.includes(listItemName)) {
        return;
      }
      setMeasuresSelected((previous: string[]) => [...previous, listItemName]);
    }
  };

  const onClearDimensionHandler = () => {
    setDimensionSelected('');
    setChartData({} as ChartDataType);
    dispatch(setData([]));
  };

  const onClearMeasuresHandler = () => {
    setMeasuresSelected([]);
    setChartData({} as ChartDataType);
    dispatch(setData([]));
  };

  const onDeleteMeasureItem = (text: string) => {
    setMeasuresSelected(prevItems => {
      if (prevItems.includes(text) && prevItems.length === 1) {
        dispatch(setData([]));
        setChartData({} as ChartDataType);
      }
      return prevItems.filter(item => item !== text);
    });
  };

  useEffect(() => {
    dispatch(fetchColumns());
  }, []);

  useEffect(() => {
    if (dimensionSelected.trim() !== '' && measuresSelected.length > 0)
      dispatch(
        fetchData({
          measures: measuresSelected,
          dimension: dimensionSelected,
        }),
      );
  }, [measuresSelected, dimensionSelected]);

  useEffect(() => {
    if (data.length > 0) {
      let chartLabels: string[] = [];
      const datasets: DatasetType[] = [];
      const measuresLabel: string[] = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const item of data) {
        if (item.name.toLowerCase() === dimensionSelected.toLowerCase()) {
          chartLabels = [...item.values];
        } else {
          const colorGenerated = generateRandomColor();
          measuresLabel.push(item.name);
          datasets.push({
            data: [...item.values],
            label: item.name,
            borderColor: colorGenerated,
            backgroundColor: colorGenerated,
          });
        }
      }
      setChartData({ labels: chartLabels, datasets });
      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: dimensionSelected,
              font: {
                size: 16,
                weight: 'bold' as const,
              },
            },
          },
          y: {
            title: {
              display: true,
              text: measuresLabel.join(', '),
              font: {
                size: 16,
                weight: 'bold' as const,
              },
            },
          },
        },
      });
    }
  }, [data]);

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
            {Object.keys(chartData).length > 0 && (
              <div className='chart-wrapper'>
                <div className='chart'>
                  <Line options={chartOptions} data={chartData} />
                </div>
              </div>
            )}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
