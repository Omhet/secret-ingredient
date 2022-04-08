import { startNextLevel } from '@store/levels';
import React, { FC } from 'react';
import s from './GameEndModal.module.scss';

export interface GameEndModalProps {}

export const GameEndModal: FC<GameEndModalProps> = ({}) => {
  return (
    <div className={s.root}>
      <div> GAME END</div>
      <button onClick={() => startNextLevel()}>Next level</button>
    </div>
  );
};
