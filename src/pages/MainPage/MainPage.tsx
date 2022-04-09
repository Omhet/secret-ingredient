import { useStats } from '@store/stats';
import React, { FC } from 'react';
import { Levels } from './components/Levels/Levels';
import s from './MainPage.module.scss';

export interface MainPageProps {}

export const MainPage: FC = () => {
  const { globalScore } = useStats();

  return (
    <div className={s.main}>
      <h2>Global score: {globalScore}</h2>
      <Levels />
    </div>
  );
};
