import { Spinner } from '@components/Spinner/Spinner';
import { useLevels } from '@store/levels';
import { updateUserRankings, useRankings } from '@store/rankings';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { buttonVariants } from 'motions/motions';
import React, { FC } from 'react';
import s from './UpdateBlockchainScore.module.scss';

export const UpdateBlockchainScore: FC = () => {
  const { updateStatus } = useRankings();
  const { globalScore } = useLevels();

  return updateStatus === 'Init' ? (
    <div className={s.updateRankingContainer}>
      <span>Update your ranking in blockchain tournament table</span>
      <motion.button
        className={classnames(s.button, s.updateBtn)}
        onClick={() => updateUserRankings(globalScore)}
        whileHover="hover"
        variants={buttonVariants}
      >
        Update
      </motion.button>
    </div>
  ) : updateStatus === 'InProgress' ? (
    <div className={s.loadingContainer}>
      <Spinner />
      Loading
    </div>
  ) : (
    <div>OK, good</div>
  );
};
