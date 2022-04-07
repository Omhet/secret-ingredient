import { Position } from '@app-types/game';
import { useGameStore } from '@store/game';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useState } from 'react';
import { BEAT_SIZE, HALF_BEAT_SIZE } from '../../constants';
import { getRandomAngle } from '../../utils';
import { Note } from './Note/Note';

const LATENCY_COMPENSATION = 0.05;

type NotesProps = {
  zonePosition: Position;
  onAnimationComplete: (beat: number) => void;
};

export const Notes: FC<NotesProps> = ({ zonePosition, onAnimationComplete }) => {
  const { notes, markup } = useGameStore(({ notes, markup }) => ({ notes, markup }));

  const [notesCoords] = useState(() => {
    const map: Record<number, any> = {};
    notes.forEach((note) => {
      const angle = getRandomAngle() * (Math.PI / 180);
      const targetX = HALF_BEAT_SIZE * Math.cos(angle) + zonePosition.x;
      const targetY = HALF_BEAT_SIZE * Math.sin(angle) + zonePosition.y;

      const dist = BEAT_SIZE * 5.5;
      const initX = dist * Math.cos(angle) + targetX;
      const initY = dist * Math.sin(angle) + targetY;

      map[note] = {
        initX,
        initY,
        targetX,
        targetY,
      };
    });

    return map;
  });

  return (
    <>
      <AnimatePresence>
        {notes.map((beat) => {
          const coords = notesCoords[beat];

          return (
            <Note
              key={beat}
              beat={beat}
              initPos={{ x: coords.initX, y: coords.initY }}
              targetPos={{ x: coords.targetX, y: coords.targetY }}
              translateDuration={markup.barDuration + LATENCY_COMPENSATION}
              translateDelay={markup.spb * beat}
              beatDuration={markup.spb / 2}
              size={HALF_BEAT_SIZE}
              onAnimationComplete={onAnimationComplete}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
};
