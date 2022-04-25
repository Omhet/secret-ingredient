import { loadRankings, useRankings } from '@store/rankings';
import React, { FC, useEffect } from 'react';
import s from './RankingsTest.module.scss';

export interface RankingsTestProps {}

export const RankingsTest: FC<RankingsTestProps> = ({}) => {
  const { rankings, isLoading } = useRankings();

  useEffect(() => {
    loadRankings();
  }, []);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={s.main}>
      {rankings.map(({ user, score }) => (
        <div key={user}>
          User: {user} | Score: {score}
        </div>
      ))}
    </div>
  );
};