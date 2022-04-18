import { Position } from '@app-types/game';
import { motion, TargetAndTransition } from 'framer-motion';
import React, { FC } from 'react';
import s from './Note.module.scss';

export interface NoteProps {
  initPos: Position;
  targetPos: Position;
  translateDuration: number;
  translateDelay: number;
  beatDuration: number;
  beat: number;
  size: number;
  image: string;
  onAnimationComplete: (beat: number) => void;
}

export const Note: FC<NoteProps> = ({
  beat,
  size,
  initPos,
  targetPos,
  translateDuration,
  translateDelay,
  beatDuration,
  image,
  onAnimationComplete,
}) => {
  return (
    <motion.div
      className={s.root}
      data-id="note"
      data-beat={beat}
      initial={{ x: initPos.x, y: initPos.y }}
      animate={{ x: targetPos.x, y: targetPos.y }}
      exit={{
        opacity: 0,
        transition: {
          type: 'tween',
          ease: 'linear',
          duration: 0.1,
        },
      }}
      transition={{
        type: 'tween',
        ease: 'linear',
        duration: translateDuration,
        delay: translateDelay,
      }}
      onAnimationComplete={(target: TargetAndTransition) => {
        if (target.x && target.y) {
          onAnimationComplete(beat);
        }
      }}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{
          type: 'spring',
          mass: 0.5,
          duration: beatDuration,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
        style={{ height: size, width: size, backgroundImage: `url("${image}")` }}
        className={s.body}
      />
    </motion.div>
  );
};
