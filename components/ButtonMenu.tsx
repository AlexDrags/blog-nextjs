'use client';
import { useState } from 'react';
import clas from '../styles/buttonMenu.module.scss';

export default function ButtonMenu() {
  const [open, setOpen] = useState(false);
  function openHandler() {
    setOpen((prev) => !prev);
    document.querySelector('nav')?.classList.toggle('show');
    document.querySelector('body')?.classList.toggle('overlay');
  }
  return (
    <button className={clas.buttonMenu} type='button' onClick={openHandler}>
      {!open ? '☰' : '⨯'} <span className='visuallyHidden'>Menu</span>
    </button>
  );
}
