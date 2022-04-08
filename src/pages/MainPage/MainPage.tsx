import React, { FC } from 'react';
import { Levels } from './components/Levels/Levels';
import s from './MainPage.module.scss';

export interface MainPageProps {}

export const MainPage: FC = () => {
  return (
    <div className={s.main}>
      <Levels />
    </div>
  );
};
