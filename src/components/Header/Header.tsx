import { useLevels } from '@store/levels';
import React, { FC } from 'react';
import s from './Header.module.scss';

export type HeaderProps = {};

export const Header: FC<HeaderProps> = ({}) => {
  const { globalScore } = useLevels();
  return (
    <header className={s.headerContainer}>
      <div className={s.logo}>Secret Ingredient</div>
      <div className={s.headerContent}>
        <button className={s.playBtn}>Play</button>
        <nav className={s.navContainer}>
          <a href="#story" className={s.navItem}>
            Story
          </a>
          <a href="#rules" className={s.navItem}>
            How to play
          </a>
          <a href="#levels" className={s.navItem}>
            Levels
          </a>
          <a href="#titles" className={s.navItem}>
            Titles
          </a>
        </nav>
        <div className={s.score}>
          <span> Score: {globalScore}</span>
          <img className={s.logoImg} src="/pics/cake.png" />
        </div>
      </div>
    </header>
  );
};
