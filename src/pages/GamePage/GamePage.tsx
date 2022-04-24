import { Game } from '@pages/GamePage/components/Game/Game';
import { closeModal, openGameStartModal } from '@store/modals';
import React, { FC, useEffect } from 'react';
import { useSearchParam } from 'react-use';
import { loadGame, useGame } from '../../store/game/index';
import s from './GamePage.module.scss';

export const GamePage: FC = () => {
  const { isLoading } = useGame();
  const levelNumberParam = useSearchParam('level');
  const levelNumber = Number(levelNumberParam) ?? 1;

  useEffect(() => {
    closeModal();
    loadGame(levelNumber);
    openGameStartModal();
  }, [levelNumber]);

  return <div className={s.main}>{isLoading ? 'Loading...' : <Game />}</div>;
};
