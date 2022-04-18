import { levelDataManager } from '@lib/levels/LevelDataManager';
import { noteTouchedHeart, useGame } from '@store/game';
import { AnimatePresence } from 'framer-motion';
import React, { FC, useCallback, useState } from 'react';
import { BEAT_SIZE, HALF_BEAT_SIZE } from '../../constants';
import { getRandomAngle, getRandomArrayItem } from '../../utils';
import { Note } from './Note/Note';

const LATENCY_COMPENSATION = 0.05;

export const Notes: FC = () => {
  const { notes, markup, zone } = useGame();
  const { food: noteImages } = levelDataManager.getCurrentLevelData().images;

  const [notesData] = useState(() => {
    const map: Record<number, any> = {};
    notes.forEach((note) => {
      const angle = getRandomAngle() * (Math.PI / 180);
      const targetX = HALF_BEAT_SIZE * Math.cos(angle) + zone.position.x;
      const targetY = HALF_BEAT_SIZE * Math.sin(angle) + zone.position.y;

      const dist = BEAT_SIZE * 5.5;
      const initX = dist * Math.cos(angle) + targetX;
      const initY = dist * Math.sin(angle) + targetY;

      const img = getRandomArrayItem(noteImages);

      map[note] = {
        initX,
        initY,
        targetX,
        targetY,
        image: img.src,
      };
    });

    return map;
  });

  const handleAnimationComplete = useCallback((beat: number) => {
    noteTouchedHeart(beat);
  }, []);

  return (
    <>
      <AnimatePresence>
        {notes.map((beat) => {
          const { initX, initY, targetX, targetY, image } = notesData[beat];

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
              image={image}
              onAnimationComplete={handleAnimationComplete}
            />
          );
        })}
      </AnimatePresence>
    </>
  );
};
