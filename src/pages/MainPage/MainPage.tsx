import React, { FC } from 'react';
import { Hero } from './components/Hero/Hero';
import { Story } from './components/Story/Story';
import { Rules } from './components/Rules/Rules';
import { Levels } from './components/Levels/Levels';
import { Titles } from './components/Titles/Titles';
import s from './MainPage.module.scss';

export type MainPageProps = {};

export const MainPage: FC = () => {
  return (
    <main className={s.main}>
      <Hero />
      <Story />
      <Rules />
      <Levels />
      <Titles />
    </main>
  );
};
