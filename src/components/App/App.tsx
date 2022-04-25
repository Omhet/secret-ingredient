import { Modals } from '@components/Modals/Modals';
import { GamePage } from '@pages/GamePage/GamePage';
import { MainPage } from '@pages/MainPage/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { initUser } from '@store/user';
import React, { FC, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import s from './App.module.scss';

export const App: FC = () => {
  useEffect(() => {
    initUser();
  }, []);

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
