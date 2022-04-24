import { Exit } from '@icons/Exit';
import { Next } from '@icons/Next';
import { Restart } from '@icons/Restart';
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { useLevels, useNextLevel } from '@store/levels';
import { closeModal } from '@store/modals';
import classnames from 'classnames';
import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import s from './GameEndModal.module.scss';

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
  const { markup, imgUrls } = levelDataManager.getCurrentLevelData();
  const maxLevelScore = markup.notes.length;
  const history = useHistory();

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
        <img className={s.master} src={imgUrls.master} />
      </div>
      <div className={s.buttonsContainer}>
        <button className={classnames(s.button, s.restartBtn)} onClick={() => window.location.reload()}>
          <Restart className={s.icon} />
          Retry
        </button>
        {nextLevel && (
          <button
            className={classnames(s.button, s.nextBtn)}
            disabled={!nextLevel.isOpen}
            onClick={() => history.replace(`/game?level=${currentLevelNumber + 1}`)}
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
