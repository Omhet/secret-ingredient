import { GameStatus } from '@app-types/game';
import { useGame } from '@store/game';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useKeyPress } from 'react-use';
import { Notes } from './components/Notes/Notes';
import { Zone } from './components/Zone/Zone';
import s from './Game.module.scss';
import { useAudio } from './useAudio';
import { checkHit } from './utils';

const TRACK_NAME = 'techno-120';

export const Game: FC = () => {
  const {
    isGameStarted,
    hasBlasts,
    increaseMissCount,
    increaseHitCount,
    decreaseBlastCount,
    removeNote,
    setGameStatus,
  } = useGame();

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
    if (isPressed && isPlaying && hasBlasts) {
      decreaseBlastCount();

      const beat = checkHit(zonePosition);
      if (beat !== undefined) {
        removeNote(beat);
        increaseHitCount();
      } else {
        increaseMissCount();
      }
    }
  }, [isPressed, zonePosition, isPlaying, hasBlasts]);

  const startGame = () => {
    setGameStatus(GameStatus.InProgress);
    toggleMusic();
  };

  return (
    <>
      {!isGameStarted && (
        <button onClick={startGame} className={s.playBtn}>
          Play
        </button>
      )}
      {isGameStarted && <Notes zonePosition={zonePosition} />}
      <Zone ref={zoneRef} />
    </>
  );
};
