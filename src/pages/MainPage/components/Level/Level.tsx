import classnames from 'classnames';
import React, { FC } from 'react';
import s from './Level.module.scss';

export type LevelProps = {
  title: string;
  imgSrc: string;
  levelNumber: number;
  score: number;
  isOpen: boolean;
  onClick: () => void;
};

export const Level: FC<LevelProps> = ({ title, imgSrc, levelNumber, score, isOpen, onClick }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
      className={classnames(s.levelCard, { [s.closedLevel]: !isOpen })}
    >
      <div className={s.infoContainer}>
        <div className={s.levelTitle}>{title}</div>
        {isOpen && (
          <div className={s.levelScore}>
            {score} / 3 <img className={s.cakeIcon} src="/pics/cake.png" />
          </div>
        )}
        {isOpen && (
          <button className={s.playBtn} disabled={!isOpen} onClick={() => onClick()}>
            Play
          </button>
        )}
      </div>
    </div>
  );
};
