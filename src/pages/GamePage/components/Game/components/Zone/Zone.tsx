import { useGameStore } from '@store/game';
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import s from './Zone.module.scss';

export interface ZoneProps {
  beatSize: number;
  isPlaying: boolean;
}

export const Zone = forwardRef<HTMLDivElement, ZoneProps>(({ beatSize, isPlaying }, ref) => {
  const markup = useGameStore(({ markup }) => markup);

  const halfBeatSize = beatSize / 2;

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
        style={{ width: halfBeatSize, height: halfBeatSize }}
        className={s.heart}
      />
      <div className={s.fence} style={{ width: halfBeatSize * 5, height: halfBeatSize * 5 }}>
        <div className={s.fenceInner} style={{ width: halfBeatSize * 3.2, height: halfBeatSize * 3.2 }} />
      </div>
    </div>
  );
});

Zone.displayName = 'Zone';
