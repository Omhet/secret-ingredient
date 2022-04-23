import { levelDataManager } from '@lib/levels/LevelDataManager';
import { useGame } from '@store/game';
import React, { FC, useState } from 'react';
import s from './Header.module.scss';

export const Header: FC = () => {
  const { hitCount, blastCount, noteCount } = useGame();
  const [initBlastCount] = useState(blastCount);
  const { markup, ingredientColors } = levelDataManager.getCurrentLevelData();
  const levelNoteCount = markup.notes.length;
  const ingredientColor = ingredientColors[0];

  const barScale = blastCount / initBlastCount;

  return (
    <>
      <div className={s.blastCountBar} style={{ backgroundColor: ingredientColor }}></div>
      <div
        className={s.blastCountBarInner}
        style={{ backgroundColor: ingredientColor, transform: `scaleX(${barScale})` }}
      ></div>
      <div className={s.root}>
        <div>
          Hits: {hitCount} / {levelNoteCount}
        </div>
        <div>Blasts: {blastCount}</div>
        <div>Notes: {noteCount}</div>
      </div>
    </>
  );
};
