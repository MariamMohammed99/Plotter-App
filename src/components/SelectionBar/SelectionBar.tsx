import React from 'react';
import uuid from 'react-uuid';
import { Droppable } from 'react-beautiful-dnd';
import SelectionBarProps from './SelectionBarProps';
import './SelectionBar.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import Pill from './components/Pill/Pill';
import {
  dimensionPillBorderColor,
  dimensionPillColor,
  dimensionPillTextColor,
  measurePillBorderColor,
  measurePillColor,
  measurePillTextColor,
} from '../../constants/appConstants';

const SelectionBar: React.FC<SelectionBarProps> = ({
  items,
  label,
  onClear,
  onDeleteItem,
  type,
}) => {
  const onDeletePill = (text: string) => {
    onDeleteItem(text);
  };

  return (
    <div className='selection'>
      <h3>{label}</h3>
      <Droppable droppableId={type}>
        {provided => (
          <div
            className='selection-field-scroll'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <div className='selection-field'>
              {items?.map(item => (
                <Pill
                  key={uuid()}
                  text={item}
                  color={type === 'dimensionsList' ? dimensionPillColor : measurePillColor}
                  textColor={
                    type === 'dimensionsList' ? dimensionPillTextColor : measurePillTextColor
                  }
                  borderColor={
                    type === 'dimensionsList' ? dimensionPillBorderColor : measurePillBorderColor
                  }
                  onDelete={onDeletePill}
                />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className='selection-button'>
        <PrimaryButton text='Clear' onClick={onClear} />
      </div>
    </div>
  );
};

export default SelectionBar;
