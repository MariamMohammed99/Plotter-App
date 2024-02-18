import React from 'react';
import PillProps from './PillProps';
import './Pill.css';

const Pill: React.FC<PillProps> = ({ text, color, textColor, borderColor }) => {
  const pillStyle = {
    backgroundColor: color,
    color: textColor,
    borderColor,
  };
  if (text.trim() === '') return null;
  return (
    <div className='pill' style={pillStyle}>
      {text}
    </div>
  );
};

export default Pill;
