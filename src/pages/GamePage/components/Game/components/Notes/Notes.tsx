import { Position } from '@app-types/game';
import { Markup } from '@app-types/music';
import { AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';
import { Note } from './Note/Note';

const LATENCY_COMPENSATION = 0.05;

type NotesProps = {
  markup: Markup;
  zonePosition: Position;
  notes: Markup['notes'];
  beatSize: number;
  onAnimationComplete: (beat: number) => void;
};

export const Notes: FC<NotesProps> = ({ markup, notes, beatSize, zonePosition, onAnimationComplete }) => {
  const halfBeatSize = beatSize / 2;

  const targetX = zonePosition.x;
  const targetY = zonePosition.y - halfBeatSize;

  return (
    <AnimatePresence>
      {notes.map((beat) => {
        const initX = innerWidth / 2 - halfBeatSize / 2;
        const initY = zonePosition.y - beatSize * 5 - halfBeatSize;

        return (
          <Note
            key={beat}
            beat={beat}
            initPos={{ x: initX, y: initY }}
            targetPos={{ x: targetX, y: targetY }}
            translateDuration={markup.barDuration + LATENCY_COMPENSATION}
            translateDelay={markup.spb * beat}
            beatDuration={markup.spb / 2}
            size={halfBeatSize}
            onAnimationComplete={onAnimationComplete}
          />
        );
      })}
    </AnimatePresence>
  );
};
