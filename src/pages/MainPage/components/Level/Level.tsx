import classnames from 'classnames';
import React, { FC } from 'react';
import s from './Level.module.scss';

export type LevelProps = {
  isEmptyCard?: boolean;
  title?: string;
  imgSrc?: string;
  levelNumber?: number;
  score?: number;
  isOpen?: boolean;
  onClick?: (levelNumber: number) => void;
};

export const Level: FC<LevelProps> = ({ isEmptyCard, title, imgSrc, levelNumber, score, isOpen, onClick }) => {
  return isEmptyCard ||
    title === undefined ||
    imgSrc === undefined ||
    levelNumber === undefined ||
    score === undefined ||
    isOpen === undefined ||
    onClick === undefined ? (
    <div className={classnames(s.levelCard, s.emptyCard)}></div>
  ) : (
    <div className={classnames(s.levelCard, { [s.closedLevel]: !isOpen })}>
      <img className={s.levelImg} src={imgSrc} />
      <div className={s.levelTitle}>Level #{levelNumber}</div>
      <div className={s.levelScore}>{score} / 3</div>
      <button className={s.playBtn} disabled={!isOpen} onClick={() => onClick(levelNumber)}>
        Play
      </button>
    </div>
  );
};
