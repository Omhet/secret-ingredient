import { Loader } from '@components/Loader/Loader';
import { Game } from '@pages/GamePage/components/Game/Game';
import { useLevels } from '@store/levels';
import { closeModal, openGameStartModal } from '@store/modals';
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSearchParam } from 'react-use';
import { loadGame, useGame } from '../../store/game/index';
import s from './GamePage.module.scss';

export const GamePage: FC = () => {
  const { isLoading } = useGame();
  const { levels } = useLevels();
  const levelNumberParam = useSearchParam('level');
  const history = useHistory();
  const levelNumber = Number(levelNumberParam);

  useEffect(() => {
    if (!levelNumber || levelNumber < 1) {
      history.replace(`/game?level=1`);
      return;
    }

    const level = levels[levelNumber - 1];

    if (!level || !level.isOpen) {
      history.replace(`/`);
      return;
    }

    closeModal();
    loadGame(levelNumber);
    openGameStartModal();
  }, [levelNumber]);

  return <div className={s.main}>{isLoading ? <Loader levelNumber={levelNumber} /> : <Game />}</div>;
};
