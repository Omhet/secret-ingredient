import { Modals } from '@components/Modals/Modals';
import { GamePage } from '@pages/GamePage/GamePage';
import { MainPage } from '@pages/MainPage/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { useLevels } from '@store/levels';
import { updateUserRankings } from '@store/rankings';
import { initUser, useUser } from '@store/user';
import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSearchParam } from 'react-use';
import s from './App.module.scss';

export const App: FC = () => {
  const { globalScore } = useLevels();
  const { isSignedIn } = useUser();
  const withRankingsUpdate = Boolean(useSearchParam('withUpdate'));

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    if (withRankingsUpdate && isSignedIn) {
      updateUserRankings(globalScore);
      window.history.pushState({}, '', window.location.origin); // Remove search params
    }
  }, [withRankingsUpdate, isSignedIn]);

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Router>
        <div className={s.main}>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/game">
              <GamePage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </div>
        <Modals />
      </Router>
    </>
  );
};
