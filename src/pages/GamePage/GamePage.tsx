import { Loader } from '@components/Loader/Loader';
import { Game } from '@pages/GamePage/components/Game/Game';
import { useLevels } from '@store/levels';
import { closeModal, openGameStartModal } from '@store/modals';
import React, { FC, useEffect } from 'react';
import { loadGame, useGame } from '../../store/game/index';
import s from './GamePage.module.scss';

export const GamePage: FC = () => {
  const { isLoading } = useGame();
  const { currentLevelNumber, restartCounter } = useLevels();

  useEffect(() => {
    closeModal();
    loadGame(currentLevelNumber);
    openGameStartModal();
  }, [currentLevelNumber, restartCounter]);

  return (
    <div className={s.main}>
      <Loader />
    </div>
  );
};
