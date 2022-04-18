import { setZonePosition, useGame } from '@store/game';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useRef } from 'react';
import { HALF_BEAT_SIZE } from '../../constants';
import s from './Zone.module.scss';

export const Zone: FC = () => {
  const { markup, isGameStarted } = useGame();
  const ref = useRef<HTMLDivElement>(null);

  // Get zone target position
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        const { x, y } = ref.current.getBoundingClientRect();
        setZonePosition({ x, y });
      }
    }, 0);
  }, [ref.current]);

  return (
    <div className={s.root}>
      <div className={s.fence} style={{ width: HALF_BEAT_SIZE * 5, height: HALF_BEAT_SIZE * 5 }}>
        <div className={s.fenceInner} style={{ width: HALF_BEAT_SIZE * 3.2, height: HALF_BEAT_SIZE * 3.2 }} />
      </div>
      <motion.div
        data-id="zone"
        ref={ref}
        initial={{ scale: 1 }}
        animate={isGameStarted ? { scale: 1.1 } : undefined}
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
    </div>
  );
};

Zone.displayName = 'Zone';
