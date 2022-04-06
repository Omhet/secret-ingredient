import { useGameStore } from '@store/game';
import React, { FC } from 'react';
import s from './Header.module.scss';

export const Header: FC = () => {
  const { missCount, hitCount, touchedHeartCount, blastCount } = useGameStore(
    ({ missCount, hitCount, touchedHeartCount, blastCount }) => ({
      missCount,
      hitCount,
      touchedHeartCount,
      blastCount,
    })
  );

  return (
    <div className={s.root}>
      <div>Touched heart: {touchedHeartCount}</div>
      <div>Miss: {missCount}</div>
      <div>Hit: {hitCount}</div>
      <div>Blasts: {blastCount}</div>
    </div>
  );
};
