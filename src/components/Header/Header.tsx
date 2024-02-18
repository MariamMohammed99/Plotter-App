import React from 'react';
import './Header.css';
import HeaderProps from './HeaderProps';

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className='header'>
      <h1 className='header-title'>{title}</h1>
    </header>
  );
};

export default Header;
