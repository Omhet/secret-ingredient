import classnames from 'classnames';
import React, { FC } from 'react';
import s from './Rankings.module.scss';

export type RankingItem = {
  user: string;
  score: number;
  isCurrentUser: boolean;
};

export const Rankings: FC = () => {
  const rankings: RankingItem[] = [
    {
      user: 'omhetehmo',
      score: 1234,
      isCurrentUser: false,
    },
    {
      user: 'a;a;alalalalalalalla',
      score: 124,
      isCurrentUser: false,
    },
    {
      user: 'lex',
      score: 500,
      isCurrentUser: true,
    },
    {
      user: 'airadavometra',
      score: 0,
      isCurrentUser: false,
    },
  ];
  return (
    <section id="rankings" className={s.main}>
      <h2 className={s.sectionTitle}>Rankings</h2>
      <div className={s.table}>
        <span className={s.tableHeader}>Place</span>
        <span className={s.tableHeader}>User name</span>
        <span className={s.tableHeader}>Score</span>
        {rankings
          .sort((a, b) => b.score - a.score)
          .map((item, index) => (
            <>
              <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{index + 1}</span>
              <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.user}</span>
              <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.score}</span>
            </>
          ))}
      </div>
    </section>
  );
};
