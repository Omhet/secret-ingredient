import { Position } from '@app-types/game';
import { useGameStore } from '@store/game';
import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';
import { BEAT_SIZE, HALF_BEAT_SIZE } from '../../constants';
import { Note } from './Note/Note';

const LATENCY_COMPENSATION = 0.05;

type NotesProps = {
  zonePosition: Position;
  onAnimationComplete: (beat: number) => void;
};

export const Notes: FC<NotesProps> = ({ zonePosition, onAnimationComplete }) => {
  const { notes, markup } = useGameStore(({ notes, markup }) => ({ notes, markup }));

  const targetX = zonePosition.x;
  const targetY = zonePosition.y - HALF_BEAT_SIZE;

  return (
    <AnimatePresence>
      {notes.map((beat) => {
        const initX = innerWidth / 2 - HALF_BEAT_SIZE / 2;
        const initY = zonePosition.y - BEAT_SIZE * 5 - HALF_BEAT_SIZE;

        return (
          <Note
            key={beat}
            beat={beat}
            initPos={{ x: initX, y: initY }}
            targetPos={{ x: targetX, y: targetY }}
            translateDuration={markup.barDuration + LATENCY_COMPENSATION}
            translateDelay={markup.spb * beat}
            beatDuration={markup.spb / 2}
            size={HALF_BEAT_SIZE}
            onAnimationComplete={onAnimationComplete}
          />
        );
      })}
    </AnimatePresence>
  );
};
