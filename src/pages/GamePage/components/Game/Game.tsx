import { Markup } from '@app-types/music';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useKeyPress } from 'react-use';
import { Notes } from './components/Notes/Notes';
import { Zone } from './components/Zone/Zone';
import s from './Game.module.scss';
import { useAudio } from './useAudio';
import { checkHit, fetchMarkup } from './utils';

const TRACK_NAME = 'techno-120';

const halfBeatSize = innerHeight / 8;
const beatSize = halfBeatSize * 2;

export const Game: FC = () => {
  const [missCount, setMissCount] = useState(0);
  const [hitCount, setHitCount] = useState(0);
  const [touchedHeartCount, setTouchedHeartCountCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [markup, setMarkup] = useState<Markup | undefined>();
  const [notes, setNotes] = useState<Markup['notes']>([]);

  const zoneRef = useRef<HTMLDivElement>(null);
  const [zonePosition, setZonePos] = useState({ x: 0, y: 0 });

  const { isPlaying, toggle: toggleMusic } = useAudio(`/music/${TRACK_NAME}.mp3`);
  const [isPressed] = useKeyPress(' ');

  useEffect(() => {
    setTimeout(() => {
      if (zoneRef.current) {
        const { x, y } = zoneRef.current.getBoundingClientRect();
        setZonePos({ x, y });
      }
    }, 0);
  }, [zoneRef.current]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const markup = await fetchMarkup(TRACK_NAME);
      setMarkup(markup);
      setNotes(markup.notes);
      setIsLoading(false);
    })();
  }, []);

  // Key press
  useLayoutEffect(() => {
    if (isPressed) {
      const beat = checkHit(zonePosition);
      if (beat !== undefined) {
        removeNote(beat);
        setHitCount((prev) => prev + 1);
      } else {
        setMissCount((prev) => prev + 1);
      }
    }
  }, [isPressed, zonePosition]);

  const removeNote = (beat: number) => {
    setNotes((prev) => prev.filter((b) => b !== beat));
  };

  const handleAnimationComplete = (beat: number) => {
    setTouchedHeartCountCount((prev) => prev + 1);
    removeNote(beat);
  };

  return (
    <>
      <div className={s.scores}>
        <div>Touched heart: {touchedHeartCount}</div>
        <div>Miss: {missCount}</div>
        <div>Hit: {hitCount}</div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <button disabled={isPlaying} onClick={toggleMusic} className={s.playBtn}>
          {isPlaying ? 'Playing' : 'Play'}
        </button>
      )}
      {isPlaying && markup && (
        <Notes
          notes={notes}
          beatSize={beatSize}
          markup={markup}
          zonePosition={zonePosition}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
      {markup && <Zone ref={zoneRef} beatSize={beatSize} markup={markup} isPlaying={isPlaying} />}
    </>
  );
};
