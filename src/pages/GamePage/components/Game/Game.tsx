import { startGame, useGame } from '@store/game';
import React, { FC } from 'react';
import { Header } from '../Header/Header';
import { Background } from './components/Background/Background';
import { Scene } from './components/Scene/Scene';
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
      <Background />
      {!isGameStarted && (
        <button onClick={start} className={s.playBtn}>
          Play
        </button>
      )}
      {isGameStarted && <Scene />}
      <Header />
    </>
  );
};
