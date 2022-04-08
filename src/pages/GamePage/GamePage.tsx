import { Game } from '@pages/GamePage/components/Game/Game';
import { useLevels } from '@store/levels';
import { closeModal } from '@store/modals';
import React, { FC, useEffect } from 'react';
import { loadGame, useGame } from '../../store/game/index';
import { Header } from './components/Header/Header';
import s from './GamePage.module.scss';

export const GamePage: FC = () => {
  const { isLoading } = useGame();
  const { currentLevelNumber, restartCounter } = useLevels();

  useEffect(() => {
    closeModal();
    loadGame(currentLevelNumber);
  }, [currentLevelNumber, restartCounter]);

  return (
    <div className={s.main}>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Header />
          <Game />
        </>
      )}
    </div>
  );
};
