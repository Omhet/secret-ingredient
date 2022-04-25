import { loadRankings, updateUserRankings, useRankings } from '@store/rankings';
import React, { FC, useEffect } from 'react';
import s from './RankingsTest.module.scss';

export interface RankingsTestProps {}

export const RankingsTest: FC<RankingsTestProps> = ({}) => {
  const { rankings, isRankingsLoading } = useRankings();

  useEffect(() => {
    loadRankings();
  }, []);

  if (isRankingsLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className={s.main}>
      <button onClick={() => updateUserRankings(100)}>Update</button>
      {rankings.map(({ name, score }) => (
        <div key={name}>
          User: {name} | Score: {score}
        </div>
      ))}
    </div>
  );
};
