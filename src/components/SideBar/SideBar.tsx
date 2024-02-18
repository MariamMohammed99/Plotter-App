/* eslint-disable no-console */
import React from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import { FaCube, FaChartBar } from 'react-icons/fa';
import { Column } from '../../types/rootState';
import SidebarProps from './SideBarProps';
import './SideBar.css';

const Sidebar: React.FC<SidebarProps> = ({ columns }) => {
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    console.log('destination', destination);
    console.log('source', source);

    // if (!destination) {
    //   console.log('source', source);
    //   // Item was dropped outside of a drop zone
    //   // Perform action here
    //   console.log('destination', destination);
    // }
  };

  const renderSection = (columnsList: Column[], type: string) => {
    return (
      <>
        {columnsList.length > 0 && (
          <div className='sidebar-header'>
            {type === 'dimension' ? <FaCube size='20px' /> : <FaChartBar size='20px' />}
            <h2>{type === 'dimension' ? 'Dimensional Columns' : 'Measurement Columns'}</h2>
          </div>
        )}
        <Droppable droppableId={type} isDropDisabled={type === 'measure' || type === 'dimension'}>
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {columnsList
                .filter(column => column.function === type)
                .map((column, index) => (
                  <Draggable key={column.name} draggableId={column.name} index={index}>
                    {providedDraggable => (
                      <li
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                      >
                        {column.name}
                      </li>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </>
    );
  };

  return (
    <div className='sidebar-container'>
      <DragDropContext onDragEnd={onDragEnd}>
        {renderSection(columns, 'dimension')}
        {renderSection(columns, 'measure')}
      </DragDropContext>
    </div>
  );
};

export default Sidebar;
