import { useGameStore } from '@store/game';
import React, { FC } from 'react';
import s from './Header.module.scss';

export const Header: FC = () => {
  const { hitCount, blastCount, notesInitialCount } = useGameStore(({ hitCount, blastCount, markup }) => ({
    hitCount,
    blastCount,
    notesInitialCount: markup.notes.length,
  }));

  return (
    <div className={s.root}>
      <div>
        Hits: {hitCount} / {notesInitialCount}
      </div>
      <div>Blasts: {blastCount}</div>
    </div>
  );
};
