import { Exit } from '@icons/Exit';
import { Next } from '@icons/Next';
import { Restart } from '@icons/Restart';
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { restartCurrentLevel, startNextLevel, useLevels, useNextLevel } from '@store/levels';
import { closeModal } from '@store/modals';
import classnames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './GameEndModal.module.scss';

const getMasterImg = (currentLevelNumber: number): string => {
  switch (currentLevelNumber) {
    case 1:
      return '/pics/JapanMaster.png';
    case 2:
      return '/pics/MexicaMaster.png';
    case 3:
      return '/pics/RussiaMaster.png';
    default:
      return '/pics/GrandmaMaster.png';
  }
};

const getMasterWords = (currentLevelNumber: number): string => {
  switch (currentLevelNumber) {
    case 1:
      return 'Subarashī. Now you know the secret of the best susi. Use it wisely.';
    case 2:
      return '¡Fabuloso! Remember, good chili is the head of everything. Find the right spiciness.';
    case 3:
      return 'Отлично! Nothing improves a dish like a sour cream with herbs. Now you know that.';
    default:
      return 'Meowtastic! Remember to cook with all your heart.';
  }
};

export const GameEndModal: FC = () => {
  const { currentLevelScore, currentLevelNumber } = useLevels();
  const nextLevel = useNextLevel();
  const maxLevelScore = levelDataManager.getCurrentLevelData().markup.notes.length;

  return (
    <div className={s.root}>
      <div className={s.scoreContainer}>
        <h2>
          Score: {currentLevelScore} / {maxLevelScore}
        </h2>
        <img className={s.scoreImg} src="/pics/cake.png" />
      </div>
      <div className={s.masterContainer}>
        <span className={s.masterWords}>{getMasterWords(currentLevelNumber)}</span>
        <img className={s.master} src={getMasterImg(currentLevelNumber)} />
      </div>
      <div className={s.buttonsContainer}>
        <button className={classnames(s.button, s.restartBtn)} onClick={() => restartCurrentLevel()}>
          <Restart className={s.icon} />
          Retry
        </button>
        {nextLevel && (
          <button
            className={classnames(s.button, s.nextBtn)}
            disabled={!nextLevel.isOpen}
            onClick={() => startNextLevel()}
          >
            <Next className={s.icon} />
            Next level
          </button>
        )}
        <Link className={classnames(s.button, s.exitBtn)} onClick={() => closeModal()} to="/#levels">
          <Exit className={s.icon} />
          Menu
        </Link>
      </div>
    </div>
  );
};
