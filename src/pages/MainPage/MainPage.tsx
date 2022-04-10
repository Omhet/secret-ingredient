import { useLevels } from '@store/levels';
import React, { FC } from 'react';
import { Hero } from './components/Hero/Hero';
import { Levels } from './components/Levels/Levels';
import { Story } from './components/Story/Story';
import s from './MainPage.module.scss';

export type MainPageProps = {};

export const MainPage: FC = () => {
  return (
    <main className={s.main}>
      <Hero />
      <Story />
    </main>
  );
};
