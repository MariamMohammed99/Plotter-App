import React from 'react';
import PillProps from './PillProps';
import './Pill.css';

const Pill: React.FC<PillProps> = ({ text, color, textColor, borderColor, onDelete }) => {
  const pillStyle = {
    backgroundColor: color,
    color: textColor,
    borderColor,
  };

  const onDeleteHandler = () => onDelete(text); // Pass the text as an argument to onDelete

  if (text.trim() === '') return null;
  return (
    <button
      type='button'
      className='pill-button'
      onClick={onDeleteHandler}
      style={{ border: 'none', padding: 0, background: 'none', cursor: 'pointer' }}
    >
      <div className='pill' style={pillStyle} id={text}>
        {text}
      </div>
    </button>
  );
};

export default Pill;
