import { GamePage } from '@pages/GamePage/GamePage';
import { MainPage } from '@pages/MainPage/MainPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classes from './App.module.scss';

export const App: FunctionComponent = () => {
  return (
    <Router>
      <div className={classes.main}>
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
    </Router>
  );
};
