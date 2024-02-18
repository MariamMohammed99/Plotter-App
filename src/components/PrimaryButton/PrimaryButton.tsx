import React from 'react';
import { buttonBorderColor, buttonColor, buttonTextColor } from '../../constants/appConstants';
import PrimaryButtonProps from './PrimaryButtonProps';
import './PrimaryButton.css';

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  text,
  color = buttonColor,
  borderColor = buttonBorderColor,
  textColor = buttonTextColor,
  isDisabled = false,
}) => {
  const buttonStyle = {
    backgroundColor: color,
    color: textColor,
    borderColor,
  };

  return (
    <button
      className='primary-button'
      type='button'
      onClick={onClick}
      style={buttonStyle}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
