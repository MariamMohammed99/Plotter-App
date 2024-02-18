import uuid from 'react-uuid';
import SelectionProps from './SelectionBarProps';
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

const SelectionBar: React.FC<SelectionProps> = ({ items, label, onClear, type }) => {
  return (
    <div className='selection'>
      <h3>{label}</h3>
      <div className='selection-field-scroll'>
        <div className='selection-field'>
          {items?.map(item => (
            <Pill
              key={uuid()}
              text={item}
              color={type === 'dimension' ? dimensionPillColor : measurePillColor}
              textColor={type === 'dimension' ? dimensionPillTextColor : measurePillTextColor}
              borderColor={type === 'dimension' ? dimensionPillBorderColor : measurePillBorderColor}
            />
          ))}
        </div>
      </div>
      <div className='selection-button'>
        <PrimaryButton text='Clear' onClick={onClear} />
      </div>
    </div>
  );
};

export default SelectionBar;
