import { startLevel, useLevels } from '@store/levels';
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import s from './Levels.module.scss';

export interface LevelsProps {}

export const Levels: FC<LevelsProps> = ({}) => {
  const { levels } = useLevels();
  const history = useHistory();

  const handlePlayClick = (levelNumber: number) => {
    startLevel(levelNumber);
    history.push('/game');
  };

  return (
    <div className={s.main}>
      {levels.map(({ number, isOpen, score }) => (
        <div className={s.level} key={number}>
          <div>Level #{number}</div>
          <div>{score} / 3</div>
          <button disabled={!isOpen} onClick={() => handlePlayClick(number)}>
            Play
          </button>
        </div>
      ))}
    </div>
  );
};
