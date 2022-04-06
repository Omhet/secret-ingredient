import { useGameStore } from '@store/game';
import React, { FC } from 'react';
import s from './Header.module.scss';

export const Header: FC = () => {
  const missCount = useGameStore((state) => state.missCount);
  const hitCount = useGameStore((state) => state.hitCount);
  const touchedHeartCount = useGameStore((state) => state.touchedHeartCount);

  return (
    <div className={s.root}>
      <div>Touched heart: {touchedHeartCount}</div>
      <div>Miss: {missCount}</div>
      <div>Hit: {hitCount}</div>
    </div>
  );
};
