import { Spinner } from '@components/Spinner/Spinner';
import { useLevels } from '@store/levels';
import { updateUserRankings, useRankings } from '@store/rankings';
import { useUser } from '@store/user';
import classnames from 'classnames';
import { motion } from 'framer-motion';
import { buttonVariants } from 'motions/motions';
import React, { FC } from 'react';
import s from './UpdateBlockchainScore.module.scss';

export type UpdateBlockchainScoreProps = {
  className?: string;
};

export const UpdateBlockchainScore: FC<UpdateBlockchainScoreProps> = ({ className }) => {
  const user = useUser();
  const { updateStatus } = useRankings();
  const { globalScore } = useLevels();

  if (user.isError) {
    return null;
  }

  return updateStatus === 'Init' ? (
    <div className={classnames(s.updateRankingContainer, className)}>
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
