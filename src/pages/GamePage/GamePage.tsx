import { Game } from '@pages/GamePage/components/Game/Game';
import { useGameStore } from '@store/game';
import React, { FC, useEffect } from 'react';
import { fetchMarkup } from './components/Game/utils';
import { Header } from './components/Header/Header';
import s from './GamePage.module.scss';

const TRACK_NAME = 'techno-120';

export const GamePage: FC = () => {
  const { isLoading, setIsLoading, setMarkup, setNotes, setBlastCount } = useGameStore();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const markup = await fetchMarkup(TRACK_NAME);
      setMarkup(markup);
      setNotes(markup.notes);
      setBlastCount(markup.notes.length);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className={s.main}>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <Header />
          <Game />
        </>
      )}
    </div>
  );
};
