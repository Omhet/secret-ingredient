import { levelDataManager } from '@lib/LevelDataManager';
import { startLevel } from '@store/levels';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import s from './Levels.module.scss';

export interface LevelsProps {}

const levels = levelDataManager.getAllLevels();

export const Levels: FC<LevelsProps> = ({}) => {
  const history = useHistory();

  const handlePlayClick = (levelNumber: number) => {
    startLevel(levelNumber);
    history.push('/game');
  };

  return (
    <div className={s.main}>
      {levels.map(({ number }) => (
        <div className={s.level} key={number}>
          <span>Level #{number}</span>
          <button onClick={() => handlePlayClick(number)}>Play</button>
        </div>
      ))}
    </div>
  );
};
