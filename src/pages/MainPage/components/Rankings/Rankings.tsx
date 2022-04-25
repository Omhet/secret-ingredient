import classnames from 'classnames';
import React, { FC } from 'react';
import s from './Rankings.module.scss';

export type RankingItem = {
  user: string;
  score: number;
  isCurrentUser: boolean;
};

export const Rankings: FC = () => {
  const rankings: RankingItem[] = [];
  return (
    <section id="rankings" className={s.main}>
      <h2 className={s.sectionTitle}>Rankings</h2>
      <div className={s.table}>
        <span className={s.tableHeader}>User name</span>
        <span className={s.tableHeader}>Score</span>
        {rankings.map((item) => (
          <>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.user}</span>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.score}</span>
          </>
        ))}
      </div>
    </section>
  );
};
