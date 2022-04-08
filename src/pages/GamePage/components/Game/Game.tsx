import { startGame, useGame } from '@store/game';
import React, { FC } from 'react';
import { Notes } from './components/Notes/Notes';
import { Zone } from './components/Zone/Zone';
import s from './Game.module.scss';

export const Game: FC = () => {
  const { isGameStarted, isGameEnd } = useGame();

  const start = () => {
    startGame();
  };

  if (isGameEnd) {
    return null;
  }

  return (
    <>
      {!isGameStarted && (
        <button onClick={start} className={s.playBtn}>
          Play
        </button>
      )}
      {isGameStarted && <Notes />}
      <Zone />
    </>
  );
};
