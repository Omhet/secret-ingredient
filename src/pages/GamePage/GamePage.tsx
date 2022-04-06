import { Game } from '@pages/GamePage/components/Game/Game';
import React, { FC } from 'react';
import s from './GamePage.module.scss';

export const GamePage: FC = ({}) => {
  return (
    <div className={s.main}>
      <Game />
    </div>
  );
};
