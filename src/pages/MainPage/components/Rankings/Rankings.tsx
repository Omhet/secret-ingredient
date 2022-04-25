import { loadRankings, useRankings } from '@store/rankings';
import classnames from 'classnames';
import React, { FC, useEffect } from 'react';
import s from './Rankings.module.scss';

export const Rankings: FC = () => {
  const { rankings, isRankingsLoading } = useRankings();

  useEffect(() => {
    loadRankings();
  }, []);

  if (isRankingsLoading) {
    return <div>Loading</div>;
  }

  return (
    <section id="rankings" className={s.main}>
      <h2 className={s.sectionTitle}>Rankings</h2>
      <div className={s.table}>
        <span className={s.tableHeader}>Place</span>
        <span className={s.tableHeader}>User name</span>
        <span className={s.tableHeader}>Score</span>
        {rankings.map((item, index) => (
          <>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{index + 1}</span>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.name}</span>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.score}</span>
          </>
        ))}
      </div>
    </section>
  );
};
