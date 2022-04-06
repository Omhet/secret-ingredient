import { Game } from '@pages/GamePage/components/Game/Game';
import React, { FC } from 'react';
import { Header } from './components/Header/Header';
import s from './GamePage.module.scss';

export const GamePage: FC = ({}) => {
  return (
    <div className={s.main}>
      <Header />
      <Game />
    </div>
  );
};
