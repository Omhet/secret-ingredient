import { restartCurrentLevel, startNextLevel, useCurrentLevel } from '@store/levels';
import React, { FC } from 'react';
import s from './GameEndModal.module.scss';

export const GameEndModal: FC = () => {
  const { score } = useCurrentLevel();

  return (
    <div className={s.root}>
      <h2>Score: {score} / 3</h2>
      <div>GAME END</div>
      <button onClick={() => restartCurrentLevel()}>Restart level</button>
      <button onClick={() => startNextLevel()}>Next level</button>
    </div>
  );
};
