import { Markup } from '@app-types/music';
import { motion } from 'framer-motion';
import React, { forwardRef } from 'react';
import classes from './Zone.module.scss';

export interface ZoneProps {
  markup: Markup;
  beatSize: number;
  isPlaying: boolean;
}

export const Zone = forwardRef<HTMLDivElement, ZoneProps>(({ markup, beatSize, isPlaying }, ref) => {
  const halfBeatSize = beatSize / 2;

  return (
    <div className={classes.zone}>
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
        className={classes.zoneHeart}
      />
      <div className={classes.zoneFence} style={{ width: halfBeatSize * 5, height: halfBeatSize * 5 }}>
        <div className={classes.zoneFenceInner} style={{ width: halfBeatSize * 3.2, height: halfBeatSize * 3.2 }} />
      </div>
    </div>
  );
});

Zone.displayName = 'Zone';
