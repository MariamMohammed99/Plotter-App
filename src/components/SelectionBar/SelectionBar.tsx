import uuid from 'react-uuid';
import SelectionProps from './SelectionBarProps';
import './SelectionBar.css';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

const SelectionBar: React.FC<SelectionProps> = ({ items, label, onClear }) => {
  return (
    <div className='selection'>
      <h3>{label}</h3>
      <div className='selection-field'>
        {items?.map(item => (
          <div key={uuid()}>{item}</div>
        ))}
      </div>
      <div className='selection-button'>
        <PrimaryButton text='Clear' onClick={onClear} />
      </div>
    </div>
  );
};

export default SelectionBar;
