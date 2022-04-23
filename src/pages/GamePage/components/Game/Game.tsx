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

  return (
    <>
      <Background />
      {!isGameStarted && !isGameEnd && (
        <button onClick={start} className={s.playBtn}>
          Play
        </button>
      )}
      {isGameStarted && <Scene />}
      {isGameStarted && <Header />}
    </>
  );
};
