import { startGame, useGame } from '@store/game';
import React, { FC } from 'react';
import { Notes } from './components/Notes/Notes';
import { Zone } from './components/Zone/Zone';
import s from './Game.module.scss';
import { useAudio } from './useAudio';

const TRACK_NAME = 'techno-120';

export const Game: FC = () => {
  const { isGameStarted, isGameLost } = useGame();
  const { toggle: toggleMusic } = useAudio(`/music/${TRACK_NAME}.mp3`);

  const start = () => {
    startGame();
    toggleMusic();
  };

  if (isGameLost) {
    return <>GAME OVER</>;
  }

  return (
    <>
      {!isGameStarted && (
        <button onClick={start} className={s.playBtn}>
          Play
        </button>
      )}
      {isGameStarted && <Notes />}
      <Zone />
    </>
  );
};
