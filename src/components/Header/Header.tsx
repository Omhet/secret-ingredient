import { useLevels } from '@store/levels';
import React, { FC } from 'react';
import s from './Header.module.scss';

export type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
  const { globalScore } = useLevels();
  return (
    <header className={s.headerContainer}>
      <div className={s.logo}>Rythm Game</div>
      <div className={s.headerContent}>
        <button className={s.playBtn}>Play</button>
        <nav className={s.navContainer}>
          <a>Story</a>
          <a>How to play</a>
          <a>Levels</a>
          <a>Titles</a>
        </nav>
        <div className={s.score}>Score: {globalScore}</div>
      </div>
    </header>
  );
};
