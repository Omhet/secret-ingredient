import { Loader } from '@components/Loader/Loader';
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { Game } from '@pages/GamePage/components/Game/Game';
import { useLevels } from '@store/levels';
import { closeModal } from '@store/modals';
import React, { FC, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { loadGame, useGame } from '../../store/game/index';
import s from './GamePage.module.scss';

export const GamePage: FC = () => {
  const { isLoading } = useGame();
  const history = useHistory();
  const { currentLevelNumber } = useLevels();
  const location = useLocation();
  const hash = location.hash;

  const shouldRestart = hash === '#restart';

  useEffect(() => {
    closeModal();
    loadGame(currentLevelNumber);

    return () => {
      closeModal();
      levelDataManager.stopLevelMusic();
    };
  }, [currentLevelNumber]);

  useEffect(() => {
    if (shouldRestart) {
      closeModal();
      loadGame(currentLevelNumber);
      history.push('/game');
    }
  }, [shouldRestart]);

  return <div className={s.main}>{isLoading ? <Loader /> : <Game />}</div>;
};
