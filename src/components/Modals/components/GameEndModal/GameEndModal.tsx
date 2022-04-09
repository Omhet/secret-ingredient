import { restartCurrentLevel, startNextLevel, useLevels, useNextLevel } from '@store/levels';
import { closeModal } from '@store/modals';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './GameEndModal.module.scss';

export const GameEndModal: FC = () => {
  const { currentLevelScore } = useLevels();
  const nextLevel = useNextLevel();

  return (
    <div className={s.root}>
      <h2>Score: {currentLevelScore} / 3</h2>
      <div>GAME END</div>
      <button onClick={() => restartCurrentLevel()}>Restart level</button>
      {nextLevel && (
        <button disabled={!nextLevel.isOpen} onClick={() => startNextLevel()}>
          Next level
        </button>
      )}
      <Link onClick={() => closeModal()} to="/">
        Go home
      </Link>
    </div>
  );
};
