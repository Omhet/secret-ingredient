import { Exit } from '@icons/Exit';
import { Play } from '@icons/Play';
import { levelDataManager } from '@lib/levels/LevelDataManager';
import { startGame } from '@store/game';
import { useLevels } from '@store/levels';
import { closeModal } from '@store/modals';
import classnames from 'classnames';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './GameStartModal.module.scss';

const getMasterWords = (currentLevelNumber: number): string => {
  switch (currentLevelNumber) {
    case 1:
      return 'Konnichiwa.';
    case 2:
      return '¡Hola! ';
    case 3:
      return 'Доброго дня!';
    default:
      return 'Hello, my dear!';
  }
};

export const GameStartModal: FC = () => {
  const { currentLevelNumber } = useLevels();
  const start = () => {
    startGame();
    closeModal();
  };

  return (
    <div className={s.root}>
      <div className={s.masterContainer}>
        <span className={s.masterWords}>{getMasterWords(currentLevelNumber)}</span>
        <img className={s.master} src={levelDataManager.getCurrentLevelData().imgUrls.master} />
      </div>
      <div className={s.buttonsContainer}>
        <button className={classnames(s.button, s.playBtn)} onClick={() => start()}>
          <Play className={s.icon} />
          Let&apos;s try
        </button>
        <Link className={classnames(s.button, s.exitBtn)} onClick={() => closeModal()} to="/#levels">
          <Exit className={s.icon} />
          Menu
        </Link>
      </div>
    </div>
  );
};
