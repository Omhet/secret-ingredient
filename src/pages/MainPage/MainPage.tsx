import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './MainPage.module.scss';

export interface MainPageProps {}

export const MainPage: FC = () => {
  return (
    <div className={s.main}>
      <Link to="/game">Start</Link>
    </div>
  );
};
