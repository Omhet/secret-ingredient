import { getLevelsData } from '@data/levels';
import { startLevel } from '@store/levels';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import s from './Levels.module.scss';

export interface LevelsProps {}

const levelsData = getLevelsData();

export const Levels: FC<LevelsProps> = ({}) => {
  const history = useHistory();

  const handlePlayClick = (levelNumber: number) => {
    startLevel(levelNumber);
    history.push('/game');
  };

  return (
    <div className={s.main}>
      {levelsData.map(({ number }) => (
        <div className={s.level} key={number}>
          <span>Level #{number}</span>
          <button onClick={() => handlePlayClick(number)}>Play</button>
        </div>
      ))}
    </div>
  );
};
