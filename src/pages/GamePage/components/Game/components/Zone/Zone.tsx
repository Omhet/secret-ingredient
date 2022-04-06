import { useGameStore } from '@store/game';
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import { HALF_BEAT_SIZE } from '../../constants';
import s from './Zone.module.scss';

export interface ZoneProps {
  isPlaying: boolean;
}

export const Zone = forwardRef<HTMLDivElement, ZoneProps>(({ isPlaying }, ref) => {
  const markup = useGameStore(({ markup }) => markup);

  return (
    <div className={s.root}>
      <motion.div
        data-id="zone"
        ref={ref}
        initial={{ scale: 1 }}
        animate={isPlaying ? { scale: 1.1 } : undefined}
        transition={{
          type: 'spring',
          mass: 0.5,
          duration: markup.spb / 2,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{ width: HALF_BEAT_SIZE, height: HALF_BEAT_SIZE }}
        className={s.heart}
      />
      <div className={s.fence} style={{ width: HALF_BEAT_SIZE * 5, height: HALF_BEAT_SIZE * 5 }}>
        <div className={s.fenceInner} style={{ width: HALF_BEAT_SIZE * 3.2, height: HALF_BEAT_SIZE * 3.2 }} />
      </div>
    </div>
  );
});

Zone.displayName = 'Zone';
