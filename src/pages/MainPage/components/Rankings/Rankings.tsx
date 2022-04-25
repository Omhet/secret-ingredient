import { UpdateBlockchainScore } from '@components/UpdateBlockchainScore/UpdateBlockchainScore';
import { useLevels } from '@store/levels';
import { loadRankings, useRankings } from '@store/rankings';
import { useUser } from '@store/user';
import classnames from 'classnames';
import React, { FC, Fragment, useEffect } from 'react';
import s from './Rankings.module.scss';

export const Rankings: FC = () => {
  const { rankings, isRankingsLoading, userRankingScore = 0 } = useRankings();
  const { isSignedIn } = useUser();
  const { globalScore } = useLevels();

  useEffect(() => {
    loadRankings();
  }, []);

  if (isRankingsLoading) {
    return <div>Loading</div>;
  }

  return (
    <section id="rankings" className={s.main}>
      <h2 className={s.sectionTitle}>Rankings</h2>
      {globalScore > userRankingScore && isSignedIn && <UpdateBlockchainScore />}
      <div className={s.table}>
        <span className={s.tableHeader}>Place</span>
        <span className={s.tableHeader}>User name</span>
        <span className={s.tableHeader}>Score</span>
        {rankings.map((item, index) => (
          <Fragment key={item.name}>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{index + 1}</span>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.name}</span>
            <span className={classnames(s.tableItem, { [s.isCurrentUser]: item.isCurrentUser })}>{item.score}</span>
          </Fragment>
        ))}
      </div>
    </section>
  );
};
