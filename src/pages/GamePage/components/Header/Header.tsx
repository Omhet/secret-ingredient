import { levelDataManager } from '@lib/levels/LevelDataManager';
import { useGame } from '@store/game';
import React, { FC } from 'react';
import s from './Header.module.scss';

export const Header: FC = () => {
  const { hitCount, blastCount, noteCount } = useGame();
  const levelNoteCount = levelDataManager.getCurrentLevelData().markup.notes.length;

  return (
    <div className={s.root}>
      <div>
        Hits: {hitCount} / {levelNoteCount}
      </div>
      <div>Blasts: {blastCount}</div>
      <div>Notes: {noteCount}</div>
    </div>
  );
};
