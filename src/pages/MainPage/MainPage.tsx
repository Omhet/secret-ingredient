import { useLevels } from '@store/levels';
import React, { FC } from 'react';
import { Rules } from './components/Rules/Rules';
import { Levels } from './components/Levels/Levels';
import { Story } from './components/Story/Story';
import s from './MainPage.module.scss';
import { Hero } from './components/Hero/Hero';

export type MainPageProps = {};

export const MainPage: FC = () => {
  return (
    <main className={s.main}>
      <Hero />
      <Story />
      <Rules />
      <Levels />
      {/* <Titles/> */}
    </main>
  );
};
