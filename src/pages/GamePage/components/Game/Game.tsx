import { startGame, useGame } from '@store/game';
import React, { FC } from 'react';
import { Background } from './components/Background/Background';
import { Scene } from './components/Scene/Scene';

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
      <Scene />
    </>
  );
};
