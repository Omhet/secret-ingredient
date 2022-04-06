import { useGameStore } from '@store/game';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useKeyPress } from 'react-use';
import { Notes } from './components/Notes/Notes';
import { Zone } from './components/Zone/Zone';
import s from './Game.module.scss';
import { useAudio } from './useAudio';
import { checkHit } from './utils';

const TRACK_NAME = 'techno-120';

const halfBeatSize = innerHeight / 8;
const beatSize = halfBeatSize * 2;

export const Game: FC = () => {
  const { increaseMissCount, increaseHitCount, increaseTouchedHeartCount, removeNote } = useGameStore();

  const zoneRef = useRef<HTMLDivElement>(null);
  const [zonePosition, setZonePos] = useState({ x: 0, y: 0 });

  const { isPlaying, toggle: toggleMusic } = useAudio(`/music/${TRACK_NAME}.mp3`);
  const [isPressed] = useKeyPress(' ');

  // Get zone target position
  useEffect(() => {
    setTimeout(() => {
      if (zoneRef.current) {
        const { x, y } = zoneRef.current.getBoundingClientRect();
        setZonePos({ x, y });
      }
    }, 0);
  }, [zoneRef.current]);

  // Key press
  useLayoutEffect(() => {
    if (isPressed) {
      const beat = checkHit(zonePosition);
      if (beat !== undefined) {
        removeNote(beat);
        increaseHitCount();
      } else {
        increaseMissCount();
      }
    }
  }, [isPressed, zonePosition]);

  const handleAnimationComplete = (beat: number) => {
    increaseTouchedHeartCount();
    removeNote(beat);
  };

  return (
    <>
      {!isPlaying && (
        <button onClick={toggleMusic} className={s.playBtn}>
          Play
        </button>
      )}
      {isPlaying && (
        <Notes beatSize={beatSize} zonePosition={zonePosition} onAnimationComplete={handleAnimationComplete} />
      )}
      <Zone ref={zoneRef} beatSize={beatSize} isPlaying={isPlaying} />
    </>
  );
};
