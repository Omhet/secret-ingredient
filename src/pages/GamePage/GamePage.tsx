import { Game } from '@pages/GamePage/components/Game/Game';
import React, { FC } from 'react';
import classes from './GamePage.module.scss';

export const GamePage: FC = ({}) => {
  return (
    <div className={classes.main}>
      <Game />
    </div>
  );
};
